import { IWorkflowEngineService } from "@medusajs/workflows-sdk"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { medusaIntegrationTestRunner } from "medusa-test-utils"
import { createProjectWorkflowId } from "../src/workflows/project/create-project"
import { createAccountAndUser } from "./utils/create-account-and-user"

jest.setTimeout(50000)

jest.mock("../dist/modules/pulumi/service", () => {
  return jest.fn().mockImplementation(() => {
    return {
      ensureCodeBuildEvents: async () => "mocked stack",
      setupCiCdPipeline: async () => "setupCiCdPipeline",
      appStackUp: async () => "appStackUp",
    }
  })
})

jest.mock("../dist/modules/github/service", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getInstallation: async (owner: string, repo: string) => {
        if (owner === "not" && repo === "intalled") {
          const error = new Error("Not found") as any
          error.status = 404
          throw error
        }
        return {
          id: 1,
        }
      },
      getRepository: async () => {
        return {
          default_branch: "main",
        }
      },
    }
  })
})

const env = { MEDUSA_FF_MEDUSA_V2: "true" }

medusaIntegrationTestRunner({
  env,
  // @ts-ignore
  testSuite: ({ getContainer, api }) => {
    afterAll(() => {
      jest.clearAllMocks()
    })

    describe("create user", () => {
      it("should create user and associate with auth user", async () => {
        const { data: authData } = await api.post("/auth/euser/emailpass", {
          email: "test@testson.com",
          password: "password",
        })

        const userRes = await api.post(
          "/v1/users",
          { email: "test@testson.com" },
          { headers: { authorization: `bearer ${authData.token}` } }
        )
        const user = userRes.data.user
        const token = userRes.data.token

        const { data } = await api.get("/v1/users/me", {
          headers: { authorization: `bearer ${token}` },
        })

        expect(data.user.id).toBe(user.id)
      })

      it("should create a project", async () => {
        const container = getContainer()
        const { headers, user, account } = await createAccountAndUser(container)

        const response = await api
          .post(
            "/v1/projects",
            {
              name: "test project",
              github_data: {
                owner: "medusajs",
                repo: "platform",
              },
            },
            { headers }
          )
          .catch((err: any) => err.response)

        const { project, transaction_id } = response.data
        expect(project).toEqual({
          id: expect.any(String),
          name: "test project",
          alias: "test-project",
          external_source_id: "1",
          source_data: {
            owner: "medusajs",
            repo: "platform",
          },
          environments: [
            expect.objectContaining({
              id: expect.any(String),
              alias: "production",
              type: "prod",
              region: "eu-central-1",
              rules: { branch: "main" },
              created_by: user.id,
              infra_ready_at: null,
              first_build_completed_at: null,
            }),
          ],
          account_id: account.id,
          created_by: user.id,
          created_at: expect.any(String),
          deleted_at: null,
        })

        expect(transaction_id).toBeDefined()

        const wfe = container.resolve<IWorkflowEngineService>(
          ModuleRegistrationName.WORKFLOW_ENGINE
        )

        let resolve: (value: unknown) => void
        let reject: (value: any) => void

        const promise = new Promise((res, rej) => {
          resolve = res
          reject = rej
        })

        await wfe.subscribe({
          workflowId: createProjectWorkflowId,
          transactionId: transaction_id,
          subscriberId: "sub",
          subscriber: (data: any) => {
            // if (
            //   data.eventType === "onStepSuccess" &&
            //   data.step?.definition.name === "deploy-app-stack-step"
            // ) {
            //   console.log(data.step.response);
            //   expect(data.step.response).toEqual({
            //     skipped: true,
            //   });
            // }
            if (data.eventType === "onStepFailure") {
              console.log(data.errors?.[0].error)
              reject(data)
            }
            if (data.eventType === "onFinish") {
              resolve(data)
            }
          },
        })

        await expect(promise).resolves.toBeDefined()

        wfe.unsubscribe({
          workflowId: createProjectWorkflowId,
          transactionId: transaction_id,
          subscriberOrId: "sub",
        })
      })

      it("should let user know that GH app not installed", async () => {
        const container = getContainer()
        const { headers, user, account } = await createAccountAndUser(container)

        const response = await api
          .post(
            "/v1/projects",
            {
              name: "test project",
              github_data: {
                owner: "not",
                repo: "intalled",
              },
            },
            { headers }
          )
          .catch((err: any) => err.response)

        expect(response.status).toBe(400)
        expect(response.data.message).toBe(
          "Could not find repository. Verify that your repository details are correct and that it has the Medusa GitHub app installed."
        )
      })
    })
  },
})

import path from "path"
import { moduleIntegrationTestRunner, SuiteOptions } from "medusa-test-utils"
import AccountModuleService from "../service"
import * as moduleModels from "../models"

jest.setTimeout(100000)

moduleIntegrationTestRunner({
  moduleName: "account",
  schema: "platform",
  resolve: path.resolve(path.join(__dirname, "..", "index.ts")),
  moduleModels,
  testSuite: ({ service }: SuiteOptions<AccountModuleService>) => {
    describe("service", () => {
      it("creates an account", async function () {
        const result = await service.create({
          name: "test",
          billing_email: "test@test.com",
        })

        expect(result).toEqual({
          id: expect.any(String),
          name: "test",
          billing_email: "test@test.com",
          created_by: null,
          users: [],
          deleted_at: null,
        })
      })

      it("creates a user", async function () {
        const user = await service.createUser({
          first_name: "test",
          last_name: "testson",
          email: "test@test.com",
        })

        expect(user).toEqual({
          id: expect.any(String),
          accounts: [],
          first_name: "test",
          last_name: "testson",
          email: "test@test.com",
          deleted_at: null,
          last_used_account_id: null,
        })
      })

      it("creates an account user", async function () {
        const user = await service.createUser({
          first_name: "test",
          last_name: "testson",
          email: "test@test.com",
        })

        const account = await service.create({
          name: "test",
          billing_email: "test@test.com",
        })

        const accountUser = await service.createAccountUser({
          account_id: account.id,
          user_id: user.id,
        })

        expect(accountUser).toEqual({
          id: expect.any(String),
          user_id: user.id,
          account_id: account.id,
          role: null,
          metadata: null,
          deleted_at: null,
          created_by: null,
        })

        const [accountWUser] = await service.list(
          {
            id: account.id,
          },
          { relations: ["users"] }
        )

        expect(accountWUser.users.length).toEqual(1)
        expect(accountWUser.users[0].id).toEqual(user.id)
      })

      it("creates and and accepts an invite", async function () {
        const account = await service.create({
          name: "test",
          billing_email: "test@test.com",
        })
        const invite = await service.createInvite({
          account_id: account.id,
        })

        expect(invite.token).toEqual(expect.any(String))

        const user = await service.createUser({ email: "test1@test.com" })
        await service.acceptInvite(invite.token, user.id)

        const [accountWUser] = await service.list(
          {
            id: account.id,
          },
          { relations: ["users"] }
        )

        expect(accountWUser.users.length).toEqual(1)
        expect(accountWUser.users[0].id).toEqual(user.id)

        const user2 = await service.createUser({ email: "test2@test.com" })
        await expect(
          service.acceptInvite(invite.token, user2.id)
        ).rejects.toThrow()
      })
    })
  },
})

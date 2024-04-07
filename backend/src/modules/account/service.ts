import { randomUUID } from "crypto"
import jwt, { JwtPayload } from "jsonwebtoken"

import {
  Context,
  DAL,
  InternalModuleDeclaration,
  InviteDTO,
  ModulesSdkTypes,
} from "@medusajs/types"
import { Account, Invite } from "./models"
import {
  InjectTransactionManager,
  MedusaContext,
  MedusaError,
  ModulesSdkUtils,
} from "@medusajs/utils"
import { AccountDTO, AccountUserDTO, UserDTO } from "../../types/account/common"
import {
  CreateAccountDTO,
  CreateAccountInviteDTO,
  CreateAccountUserDTO,
  CreateUserDTO,
} from "../../types/account/mutations"
import AccountUser from "./models/account-user"
import User from "./models/user"

const DEFAULT_VALID_INVITE_DURATION = 3 * 60 * 60 * 24 // 3 days
const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

const generateMethodForModels = [User, Account, AccountUser, Invite]

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService
  accountService: ModulesSdkTypes.InternalModuleService<any>
  inviteService: ModulesSdkTypes.InternalModuleService<any>
  accountUserService: ModulesSdkTypes.InternalModuleService<any>
  userService: ModulesSdkTypes.InternalModuleService<any>
}

export default class AccountModuleService<
  TEntity extends Account = Account,
  TInvite extends Invite = Invite,
  TAccountUser extends AccountUser = AccountUser,
  TUser extends User = User,
> extends ModulesSdkUtils.abstractModuleServiceFactory<
  InjectedDependencies,
  AccountDTO,
  {
    Account: { dto: AccountDTO }
    Invite: { dto: InviteDTO }
    AccountUser: { dto: AccountUserDTO }
    User: { dto: UserDTO }
  }
>(Account, generateMethodForModels, {}) {
  protected baseRepository_: DAL.RepositoryService
  protected readonly accountService_: ModulesSdkTypes.InternalModuleService<TEntity>
  protected readonly inviteService_: ModulesSdkTypes.InternalModuleService<TInvite>
  protected readonly accountUserService_: ModulesSdkTypes.InternalModuleService<TAccountUser>
  protected readonly userService_: ModulesSdkTypes.InternalModuleService<TUser>

  constructor(
    {
      baseRepository,
      accountService,
      inviteService,
      accountUserService,
      userService,
    }: InjectedDependencies,
    protected readonly moduleDeclaration: InternalModuleDeclaration
  ) {
    // @ts-ignore
    super(...arguments)
    this.baseRepository_ = baseRepository
    this.accountService_ = accountService
    this.inviteService_ = inviteService
    this.accountUserService_ = accountUserService
    this.userService_ = userService
  }

  @InjectTransactionManager("baseRepository_")
  async create(
    data: CreateAccountDTO,
    @MedusaContext() context: Context = {}
  ): Promise<AccountDTO> {
    const account = await this.accountService_.create(data, context)
    return this.baseRepository_.serialize<AccountDTO>(account, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async createInvite(
    data: CreateAccountInviteDTO,
    @MedusaContext() context: Context = {}
  ): Promise<InviteDTO> {
    const invite = await this.inviteService_.create(
      {
        ...data,
        expires_at: new Date(Date.now() + DEFAULT_VALID_INVITE_DURATION * 1000),
      },
      context
    )

    const serialized = await this.baseRepository_.serialize<InviteDTO>(invite, {
      populate: true,
    })

    return {
      ...serialized,
      token: this.generateToken({ id: invite.id }),
    }
  }

  @InjectTransactionManager("baseRepository_")
  async createUser(
    data: CreateUserDTO,
    @MedusaContext() context: Context = {}
  ) {
    const user = await this.userService_.create(data, context)
    return this.baseRepository_.serialize<UserDTO>(user, { populate: true })
  }

  @InjectTransactionManager("baseRepository_")
  async createAccountUser(
    data: CreateAccountUserDTO,
    @MedusaContext() context: Context = {}
  ) {
    const accountUser = await this.accountUserService_.create(data, context)
    return this.baseRepository_.serialize<AccountUserDTO>(accountUser, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async acceptInvite(
    token: string,
    userId: string,
    @MedusaContext() context: Context = {}
  ) {
    const { payload } = this.validateToken(token)

    const invite = await this.inviteService_.retrieve(payload.id, {
      select: ["id", "accepted_at", "account_id", "expires_at", "role"],
    })

    if (invite.expires_at < new Date()) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Invite has expired"
      )
    }

    if (invite.accepted_at) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Invite has already been accepted"
      )
    }

    const accountUser = await this.accountUserService_.create(
      {
        user_id: userId,
        account_id: invite.account_id,
        role: invite.role,
      },
      context
    )

    await this.inviteService_.update(
      {
        id: invite.id,
        accepted_at: new Date(),
      },
      context
    )

    return accountUser
  }

  async getTokenForInvite(id: string) {
    const invite = await this.inviteService_.retrieve(id, { select: ["id"] })
    return this.generateToken({ id: invite.id })
  }

  private generateToken(data: any): string {
    const jwtSecret = JWT_SECRET
    const expiresIn: number = DEFAULT_VALID_INVITE_DURATION

    if (!jwtSecret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No jwt_secret configured. Please add one."
      )
    }

    return jwt.sign(data, jwtSecret, {
      expiresIn,
      jwtid: randomUUID(),
    })
  }

  private validateToken(data: any): JwtPayload {
    const jwtSecret = JWT_SECRET

    if (!jwtSecret) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No jwt_secret configured. Please add one."
      )
    }

    return jwt.verify(data, jwtSecret, { complete: true })
  }
}

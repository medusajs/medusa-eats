# Medusa Platform

## Authentication

Cloud uses the Medusa Auth module for authentication. The Auth module is
configured with the custom scope "euser" which is used to authenticate external
users.

```
# Authentication flow
POST /auth/euser/emailpass
{ email: "seb@medusajs.com", password: "test1234" }
```

^ returns a token that can be used for subsequent requests.

## Custom Modules

### Account

An Account is an organization or individual who can create projects on the
platform. The Account module manages accounts as and users.

#### Creating a user

```
POST /v1/users
{ email: "seb@medusajs.com" }
```

This is an authenticated endpoint that requires the "euser" scope. When a user
is created, the user's id is added to the auth users app metadata.

#### Creating an account

```
POST /v1/accounts
{ name: "My Account" }
```

This is an authenticated endpoint currently we use the "admin" scope to create
an account.

#### Adding a user to an account

```
POST /v1/accounts/:id/invite
```

This is an authenticated endpoint with the "euser" or "admin" scope. When you
create an invite it generates a token that a user can use to join the account.

```
POST /v1/invite/accept
{ token: "[jwttoken]"
```

This is an authenticated endpoint with the "euser". The authenticated user is
added to the account represented by the token.

### Project

A project represents a Medusa store. A project is associated with an account and
can have multiple environments. Each project has a set of credentials to a git
repository (done), and credentials to an AWS account (not done yet).

#### Creating a project

```
POST /v1/account/:id/projects
{ name: "My Store", github_data: { owner: "medusajs", repo: "medusa-starter-default" } }
```

You must be authenticated as an "euser" and be a member of the account to create
a project. The `github_data` must be repository with the Medusa app installed.

The endpoint will automatically create a production environment.

#### Triggering a build

```
POST /v1/account/:id/projects/:proj_id/build
{ environment_id: "projenv_1234" }
```

Requires "euser" scope and the user must be a member of the account.

### Github module

The Github module is used to manage the integration with Github. The integration
is powered by a GitHub app that needs to be installed in a repository that is
used to create a project. When installed the app has the necessary access to
generate an access token that can be used by the application to check out the
repository for building.

The GitHub module requires the app's associated private key to be available as
an env var `MEDUSA_GH_APP_PRIVATE_KEY`.

### Pulumi module

The Pulumi module is responsible for provisioning and managing infrastructure
for projects and environments.

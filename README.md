<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Medusa Eats - Food Delivery Platform Demo
</h1>

<p align="center">
An Uber Eats style delivery platform running on Medusa 2.0 and Next.js 14.</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

# Overview

Medusa Eats is built with:

- [Medusa](https://medusajs.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)


Features include:

- Restaurant storefront
- Realtime order status dashboards
- Driver and restaurant dashboards
- User roles
- Authentication
- Medusa Workflows
- Realtime Server Sent Event

# Quickstart

### Install dependencies

The project contains two main directories: `/backend` (containing the Medusa project) and `/frontend` (containing the Next.js project). 
Use Yarn to install dependencies in both directories.

In `/frontend` run:
```shell
yarn
```

In `/backend` run: 
```shell
yarn
```

### Set up the database

// TBD

### Start developing

You are now ready to start up your project.

**Start Medusa dev server**
In `/backend` run: 
```shell
medusa develop
```

Make sure that Redis and Postgres servers are running locally.

The Medusa server is now running on http://localhost:9000.

**Start Next,js dev server**
In a separate terminal, cd to `/frontend` and run:
```shell
yarn dev
```

The Next.js frontend is now running on http://localhost:3000.

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [2.0 Documentation](https://docs.medusajs.com/v2)

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)

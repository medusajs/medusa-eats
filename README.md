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

# Project structure

The project consists of two main directories:

- `/backend` contains the Medusa 2.0 project with all the customizations.
- `/frontend` contains the Next.js project.

# Quickstart

### Install dependencies

Use Yarn to install dependencies in both directories.

In `/frontend` run:

```shell
yarn
```

In `/backend` run:

```shell
yarn
```

### Set up environment variables

The project comes with `.env.template` files to quickly set up your environment variables. Copy them to a `.env` file by running the following commands:

In `/frontend` run:

```shell
cp .env.template .env
```

In `/backend` run:

```shell
cp .env.template .env
```

### Set up and seed the database

Create a Postgres database called `medusa-eats`.

The repo contains a setup script to build the project, run migrations and seed dummy data.

> Make sure your local Postgres server is running.

In `/backend` run:

```shell
yarn setup-db
```

This will also create an admin user with the following credentials:

```
email: admin@test.com
pasword: supersecret
```

### Start developing

You are now ready to start up your project.

**Start Medusa dev server**

Make sure that Redis and Postgres servers are running locally on their default ports.

In `/backend` run:

```shell
yarn dev
```

The Medusa server is now running on http://localhost:9000.

**Start Next.js dev server**

In a separate terminal, cd to `/frontend` and run:

```shell
yarn dev
```

The Next.js frontend is now running on http://localhost:3000.

### Create user accounts

We're gonna create a restaurant admin and driver account so we'll have access to both sides of the platform.

**Create restaurant admin account**

1. Go to http://localhost:3000/signup.
2. Select 'I'm a restaurant'.
3. Select the restaurant you want to create an admin for.
4. Fill out the remaining form fields and click 'Create account'.
5. You can now log in as a restaurant admin and access the restaurant dashboard at http://localhost:3000/dashboard/restaurant.

**Create driver account**

1. Repeat above steps, but this time select 'I'm a driver'.
2. You can now log in as a driver and access the driver dashboard at http://localhost:3000/dashboard/driver.

### Place an order and handle a delivery

> To go through the entire delivery workflow in realtime, you'll need to log into both a restaurant and a driver account. To do so, use an icognito window or second browser.

1. Go to the storefront at http://localhost:3000/.
2. Select a restaurant from the list.
3. Add menu items to you delivery by clicking the + buttons.
4. Click the shopping bag button on the top right.
5. Click 'Go to checkout'.
6. Complete the form and place you order. A live order status dashboard will show up.
7. In a new tab, go to http://localhost:3000/dashboard/restaurant and log in as an admin for the restaurant you just placed an order at.
8. Your order should be visible in the "Incoming orders" column. Click the button to accept the incoming order.
9. In an incognito window, go to http://localhost:3000/dashboard/driver and log in as a driver.
10. The accepted order will show up on your dashboard. Click the button to claim it.
11. The order will go through the different stages on all dashboards in realtime. You can progress the order by marking each stage as complete on the relevant dashboard.

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [2.0 Documentation](https://docs.medusajs.com/v2)

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)

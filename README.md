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
Medusa Eats is a fullstack food delivery platform, inspired by Uber Eats, running on Medusa 2.0 and Next.js 14.</p>

<p align="center">
<strong>⚠️ This repo was built as an example demo to showcase Medusa 2.0's capabilities. It is not actively maintained by the core team and is intended as an architectural reference, not a starter project.</strong>
</p>

<p align="center">
<a href="https://medusajs.com/blog/announcing-medusa-eats/">📖 Read the announcement blog post</a>
</p>

<p align="center">
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

# Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Key Features & Architecture](#key-features--architecture)
4. [Resources](#resources)
   - [Learn more about Medusa](#learn-more-about-medusa)
   - [Learn more about Next.js](#learn-more-about-nextjs)

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
  - This handles core functionalities, including user authentication, order management, and more.
- `/frontend` contains the Next.js project.
  - This handles the user interface, restaurant storefronts, dashboards, and more.

# Key Features & Architecture

This demo showcases Medusa 2.0's capabilities as a three-sided food delivery platform built during Paris hackathon:

## Three-Sided Platform Architecture
- **Customers**: Browse restaurant menus and place orders
- **Restaurants**: Receive order notifications, track food preparation, and update menus
- **Drivers**: Get job notifications and claim delivery routes

## Real-time Order Workflow
- **Long-running Medusa Workflow**: Handles the complete order lifecycle from customer selection through delivery
- **Automatic notifications**: Restaurants get notified of new orders
- **Driver matching**: System finds available drivers for delivery assignments
- **Live order tracking**: Customers receive real-time status updates throughout the process

## Custom Module Implementation
- **Restaurant module**: Custom entities and business logic for restaurant management
- **Driver module**: Driver profiles and delivery assignment handling
- **Delivery module**: Order fulfillment and tracking capabilities

## Development Speed Demonstration
Built by one developer in just a few days, showcasing:
- Medusa 2.0's flexibility for rapid prototyping
- The framework's ability to handle complex, multi-sided commerce scenarios
- How custom modules can extend core commerce functionality

> **Note**: This project was created as a hackathon demo to demonstrate Medusa 2.0's potential for building advanced commerce applications. It serves as an architectural reference for understanding how to implement multi-sided platforms with Medusa.

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [2.0 Documentation](https://docs.medusajs.com/v2)

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)

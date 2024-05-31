# Custom loader

A loader is a function executed when the Medusa application starts.

To create a loader in your Medusa application, create a TypeScript or JavaScript file under the `src/loaders` directory that default exports a function.

```ts
export default function () {
  console.log(
    "[HELLO LOADER] Just started the Medusa application!"
  )
}
```

## Loader Parameters

A loader receives the Medusa container as a first parameter, and the Medusa configuration as a second parameter.

```ts
import { MedusaContainer } from "@medusajs/medusa"
import { ConfigModule } from "@medusajs/types"

export default async function (
  container: MedusaContainer, 
  config: ConfigModule
) {
  console.log(`You have ${
    Object.values(config.modules || {}).length
  } modules!`)
}
```

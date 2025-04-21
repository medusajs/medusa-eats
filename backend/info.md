bunx medusa db:create
bunx medusa db:migrate
bunx medusa db:sync-links
bunx medusa exec ./src/scripts/seed.ts
bunx medusa user -e admin@email.com -p 123456
bun dev
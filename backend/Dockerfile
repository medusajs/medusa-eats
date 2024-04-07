FROM node:20-slim AS base
ENV YARN_HOME="/yarn"
ENV PATH="$YARN_HOME:$PATH"
RUN corepack enable
# RUN corepack use yarn
COPY . /app
RUN rm -rf /app/node_modules
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=yarn,target=/yarn/store yarn install --production 

FROM base AS build
RUN --mount=type=cache,id=yarn,target=/yarn/store yarn install 
RUN yarn build


# FROM gcr.io/distroless/nodejs20-debian12 AS final
FROM pulumi/pulumi-nodejs:3.111.1 as final

COPY --from=build /app /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

WORKDIR /app

EXPOSE 9000

ENTRYPOINT [ "/bin/bash", "-c", "/app/node_modules/.bin/medusa migrations run && /app/node_modules/.bin/medusa start"]

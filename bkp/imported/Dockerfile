FROM oven/bun:1 as base

WORKDIR /usr/src/app
FROM base AS install

USER root 
RUN apt-get update && \
  apt-get install -y --no-install-recommends python3 make g++ build-essential && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/

RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules /usr/src/app/node_modules
COPY . /usr/src/app
ENV NODE_ENV=production
RUN bun --bun run build

FROM base AS release
WORKDIR /usr/src/app

COPY --from=install /temp/prod/node_modules /usr/src/app/node_modules
COPY --from=prerelease /usr/src/app/.output /usr/src/app/.output
COPY package.json /usr/src/app/
USER bun
EXPOSE 3000/tcp
ENV NUXT_HOST=0.0.0.0
ENTRYPOINT ["sh", "-c", "bun run /usr/src/app/.output/server/index.mjs --host $NUXT_HOST"]

FROM mhart/alpine-node:10 as node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM mhart/alpine-node:10
RUN apk add --no-cache git
COPY --from=node /usr/bin/node /usr/bin/
COPY --from=node /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /app
COPY --from=node /app .
COPY . .
ENV PATH="/app/node_modules/.bin:${PATH}"
ENTRYPOINT ["node", "index.js"]
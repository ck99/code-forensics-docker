FROM mhart/alpine-node:10 as node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM openjdk:8-alpine
RUN apk add --no-cache git
COPY --from=node /usr/bin/node /usr/bin/
COPY --from=node /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
COPY --from=node /usr/lib/node_modules/npm /usr/lib/node_modules/npm
RUN cd /usr/bin && ln -s ../lib/node_modules/npm/bin/npm-cli.js npm
WORKDIR /app
COPY --from=node /app .
EXPOSE 3000
ENV PATH="/app/node_modules/.bin:${PATH}"
ENTRYPOINT ["gulp"]
CMD ["webserver"]

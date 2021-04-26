# Build project - need develop packages to build it
FROM node:14 as base
COPY config /config
COPY package.json /
COPY .prettierrc.js /
COPY .prettierignore /
COPY nodemon.json /
COPY tsconfig.json /
COPY server /

RUN npm install
RUN npm run build


# Copy artefacts from intermediate image, install production dependencies
FROM base as production

COPY config /config
COPY dist /dist
COPY --from=base package-lock.json /
COPY --from=base dist /dist
COPY package.json /
RUN npm ci --production

ENV NODE_ENV production

ENV PORT 80
EXPOSE 80

CMD npm start

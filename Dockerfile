FROM node:14

COPY config /config
COPY dist /dist
COPY package.json /
COPY package-lock.json /

RUN npm ci --production

ENV NODE_ENV production

ENV PORT 80
EXPOSE 80

CMD npm start
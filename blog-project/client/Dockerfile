FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@8.5.1
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "dev","--", "--host"]


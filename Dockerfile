FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run generate


FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

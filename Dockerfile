FROM node:22.19.0-alpine AS client-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY client/ .
ENV VITE_SERVER_URL=http://localhost:8080
RUN npm run build

FROM maven:3.9.4-eclipse-temurin-21 AS server-build
WORKDIR /app/server
COPY server/ .
RUN mkdir -p src/main/resources/static
COPY --from=client-build /app/client/dist/ src/main/resources/static/
RUN ./mvnw -B package

FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app
COPY --from=server-build /app/server/target/postman-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD [ "java", "-jar", "/app/app.jar" ]


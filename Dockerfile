#  ----- Stage 1 / Build ----- 
FROM node:22.21-alpine AS build

# Directory for the application code inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build NestJS application
RUN pnpm build

# ----- Stage 2 / Production -----
FROM node:22.21-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
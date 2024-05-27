FROM node:18.13.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.21.0-alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
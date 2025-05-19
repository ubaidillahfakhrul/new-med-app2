FROM node:18

# Set root working directory
WORKDIR /app

# Copy all files
COPY . .

# Install frontend dependencies
RUN npm install

# Build frontend & move it to server/build
RUN npm run build

# Move to backend directory
WORKDIR /app/server

# Install backend dependencies
RUN npm install

# Expose backend port
EXPOSE 8181

# Start Express backend
CMD ["node", "index.js"]

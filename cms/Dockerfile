# Use an ARM64-compatible Node.js base image for Raspberry Pi 4
FROM node:18 AS base
WORKDIR /app


# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile


# Build project
FROM base AS builder
WORKDIR /app

RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    rm awscliv2.zip && \
    ./aws/install

RUN addgroup --system nextjs && adduser --system --ingroup nextjs nextjs

# Copy the built application and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ensure proper permissions
RUN chown -R nextjs:nextjs /app

# Switch to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

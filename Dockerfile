WORKDIR /app

# Step 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Accept environment variables at build time
ARG DATABASE_NAME
ARG DATABASE_USER
ARG DATABASE_PASSWORD

# Set these as environment variables inside the container
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}

# Copy solution and restore dependencies
COPY *.sln ./
COPY src/*/*.csproj ./src/
RUN dotnet restore InfoTrack.Online.Game.sln

# Copy the full source and build
COPY src/ ./src/
WORKDIR /app/src/InfoTrack.Online.Game.Api
RUN dotnet publish -c Release -o /out


# Step 2: Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /out ./

# Copy the Infrastructure project (for migrations)
COPY --from=build /app/src/InfoTrack.Online.Game.Infrastructure ./InfoTrack.Online.Game.Infrastructure

# Run migrations from Infrastructure before starting the API
CMD dotnet ef database update --project InfoTrack.Online.Game.Infrastructure --startup-project InfoTrack.Online.Game.Api && dotnet InfoTrack.Online.Game.Application.dll
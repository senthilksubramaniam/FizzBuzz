## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)

## Features
- Feature 1: Fun customizable online game like [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz#:%7E:text=Fizz%20buzz%20is%20a%20group,with%20the%20word%20%22fizzbuzz%22.)

## Getting Started
To get a local copy up and running, follow these steps.

### Prerequisites
- [Node.js] (https://nodejs.org/) (Version 22.13.1 and above)
- [.NET 8 SDK or later](https://dotnet.microsoft.com/download)
- [PostgresSQL](https://www.postgresql.org/download/)(Version 15)
- [Visual Studio 2019 or later](https://visualstudio.microsoft.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/senthilksubramaniam/FizzBuzz.git
   ```
2. Navigate to the project directory:
   ```bash
   cd FizzBuzz
   ```
3. Install PostgreSQL: 
    [Download the Installer](https://www.postgresql.org/download/windows/) (version 17 02 later)

    Run the Installer

        Double-click the downloaded file to start the installation process.

        Follow the prompts, selecting components like PostgreSQL Server and pgAdmin 4 as needed.

        Set a password for the PostgreSQL superuser (postgres) when prompted.

        Choose the default port (5432) unless you have specific requirements.

        Note the password to update appsettings and to compose docker.

        Finish the installation and ensure PostgreSQL is running.

4. Restore dependencies and build the project:
   ```bash
   dotnet build
   ```
5. (If applicable) Navigate to the client app directory and install dependencies:
   ```bash
   cd client
   npm install
   ```
6. After testing build the docker Image:
   ```sh
   cd ../
   docker build --build-arg DATABASE_NAME=mydb --build-arg DATABASE_USER=myuser --build-arg DATABASE_PASSWORD=mypassword --build-arg DB_HOST=db -t myapi:latest .
   ```
7. Run the container:
   ```sh
   cd ../
   docker build --build-arg DATABASE_NAME=mydb --build-arg DATABASE_USER=myuser --build-arg DATABASE_PASSWORD=mypassword --build-arg DB_HOST=db -t myapi:latest .
   ```
## Usage

1. Start the Api:
   ```bash
   cd ../   
   dotnet run
   ```
2. Start the Client:
   ```bash
   cd ../client 
   npm run dev:local
   ```

## Project Structure

- **src**: Contains the Api
  - **InfoTrack.Online.Game.Api**: Start upproject with controller
  - **InfoTrack.Online.Game.Domain**: Entities and interfaces
  - **InfoTrack.Online.Game.Application**: Application logic
  - **InfoTrack.Online.Game.Infrastructure**: Database context
  - **InfoTrack.Online.Game.Test**: ASP.NET Core MVC project
- **client**: Contains the frontend
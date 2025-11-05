# CET-324

This document provides instructions on how to set up and run the project.

## Prerequisites

Before you begin, ensure you have [Bun](https://bun.sh/) installed on your system.

### Installing Bun

You can install Bun using the following commands:

**Linux / macOS:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:**
```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

For more information, please refer to the [official Bun documentation](https://bun.sh/docs/installation).

## Getting Started

### 1. Install Dependencies

Navigate to the `app` directory and install the required dependencies using Bun:

```bash
bun install
```

### 2. Development

To start the development server with hot-reloading, run the following command:

```bash
bun run dev
```

This will start the application and watch for file changes.

### 3. Production

To run the application in a production environment:

**Start the production server:**
```bash
bun run start
```

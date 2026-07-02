<div align="center">
  <img src="docs/images/01_login.png" alt="Enterprise Platform Logo" width="120" style="border-radius: 12px; margin-bottom: 20px;" />

  # ⚡ Enterprise Event-Driven Transaction Platform

  **A modern, scalable, and asynchronous Fullstack Platform integrating RPA, AI, and real-time WebSockets.**

  [![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.103.2-009688.svg?style=flat&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com)
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?style=flat&logo=React&logoColor=black)](https://reactjs.org/)
  [![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg?style=flat&logo=Docker&logoColor=white)](https://www.docker.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  <p align="center">
    <a href="#overview">Overview</a> •
    <a href="#screenshots">Screenshots</a> •
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#installation">Installation</a> •
    <a href="#api-documentation">API</a>
  </p>
</div>

---

## 📖 Overview

The **Enterprise Event-Driven Transaction Platform** is a robust, production-ready system designed to handle complex business workflows asynchronously. It serves as a centralized hub for executing financial transactions, orchestrating Robotic Process Automation (RPA) bots, and generating AI-powered summaries—all while keeping the user informed in real-time via WebSockets.

This repository demonstrates advanced architectural patterns including **Event-Driven Architecture (EDA)**, **Pub/Sub messaging**, **background workers**, and **containerized microservices**.

---

## 📸 Screenshots

Here is a visual overview of the modern, enterprise-grade React frontend. The UI was designed with TailwindCSS, utilizing a professional palette, glassmorphism, and responsive layouts.

<table align="center" width="100%">
  <tr>
    <td width="50%" align="center">
      <b>Login & Authentication</b><br/>
      <img src="docs/images/01_login.png" alt="Login" width="100%"/>
      <br/><em>Secure access control</em>
    </td>
    <td width="50%" align="center">
      <b>Real-Time Dashboard</b><br/>
      <img src="docs/images/02_dashboard.png" alt="Dashboard" width="100%"/>
      <br/><em>Metrics and live transaction feed</em>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>Operation Management</b><br/>
      <img src="docs/images/03_create_transaction.png" alt="Create Transaction" width="100%"/>
      <br/><em>Form to trigger async background tasks</em>
    </td>
    <td width="50%" align="center">
      <b>AI Integrations</b><br/>
      <img src="docs/images/04_ai_assistant.png" alt="AI Assistant" width="100%"/>
      <br/><em>OpenAI document summarization</em>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>RPA Bot Control</b><br/>
      <img src="docs/images/05_rpa_automation.png" alt="RPA Bot" width="100%"/>
      <br/><em>Trigger Playwright bots with live logs</em>
    </td>
    <td width="50%" align="center">
      <b>System Monitor</b><br/>
      <img src="docs/images/06_websocket_monitor.png" alt="WS Monitor" width="100%"/>
      <br/><em>Live WebSocket event stream</em>
    </td>
  </tr>
</table>

---

## ✨ Features

- **🎨 Modern Dashboard**: A sleek, responsive SPA (Single Page Application) built with React and TailwindCSS for real-time transaction monitoring.
- **🔐 Robust Security**: JWT-based Authentication and Authorization securing all private endpoints.
- **⚡ Asynchronous Processing**: Offloads heavy tasks to background Python workers using Redis queues (Celery/RQ style).
- **🤖 Intelligent RPA Integration**: Dedicated Playwright-based bot service for automated web scraping and data extraction.
- **🧠 AI Summarization**: Built-in OpenAI (GPT-3.5/4) integration to generate intelligent contextual summaries of processed data.
- **📡 Real-Time WebSockets**: Instant UI updates reflecting transaction state changes (Pending -> Processed) without page reloads.
- **📝 Comprehensive Logging**: Custom Python decorators for exhaustive execution logging and tracing across endpoints.

---

## 🏗 Architecture

The system is designed with an event-driven mindset to ensure maximum scalability, high availability, and immediate responsiveness. It decouples heavy processing from the main request lifecycle.

### System Components

The infrastructure consists of 6 core microservices orchestrated via Docker Compose:

1. **Backend API (FastAPI)**: The central RESTful API. Manages business logic, JWT authentication, and acts as the orchestrator.
2. **Frontend UI (React + Vite + Nginx)**: The client-facing application. Consumes the REST API and maintains a persistent WebSocket connection.
3. **RPA Engine (Python + Playwright)**: An isolated microservice dedicated to browser automation and content extraction.
4. **Background Worker (Python)**: A daemon process that consumes tasks from the Redis queue to handle heavy computational or network-bound jobs.
5. **Message Broker (Redis)**: Serves a dual purpose: task queue management for the workers and a Pub/Sub channel for live WebSocket events.
6. **Relational Database (PostgreSQL)**: Ensures ACID-compliant persistence for users, transactions, and system logs.

---

## 💻 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | ReactJS, Vite, TailwindCSS, TypeScript, Nginx |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic, JWT |
| **Database** | PostgreSQL |
| **Broker / Cache** | Redis |
| **Automation (RPA)** | Playwright (Python) |
| **AI Integration** | OpenAI API |
| **DevOps** | Docker, Docker Compose, Make |

---

## 🚀 Installation & Deployment

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed.
- Git.

### Environment Variables
Copy the `.env.example` file to create your local `.env` configuration.

```bash
cp .env.example .env
```

*(Note: The `OPENAI_API_KEY` is optional. If not provided, the system will gracefully fallback to a simulation mode).*

### Running with Docker

The project includes convenience scripts for cross-platform deployment.

**Linux / macOS** (Using `make`):
```bash
make build   # Build Docker images
make up      # Start all services in detached mode
make logs    # Tail real-time logs
make down    # Stop all services
```

**Windows** (Using PowerShell):
```powershell
.\manage.ps1 build
.\manage.ps1 up
.\manage.ps1 logs
.\manage.ps1 down
```

**Standard Docker**:
```bash
docker compose up --build -d
```

### Accessing the System
- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **Backend API (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📚 Documentation

### API Documentation
The API adheres to the OpenAPI 3.0 specification. 
- You can explore the interactive Swagger UI at `/docs` once the server is running.
- The raw OpenAPI contract is available in `docs/api/openapi.yaml`.

### Authentication
The platform uses JWT (JSON Web Tokens). 
Default Admin Credentials:
- **Username**: `admin`
- **Password**: `password123`

*(Please change these in production).*

### Postman Collection
A complete Postman collection is available to test all endpoints. Import `postman/TransactionPlatform.postman_collection.json` into your workspace.

### Real-Time Events (WebSockets)
The frontend connects to `ws://localhost:8000/transactions/stream` to receive live JSON payloads whenever a background worker completes a transaction.

---

## 📂 Folder Structure

```text
enterprise-transaction-platform/
├── backend/            # FastAPI REST API and core business logic
├── frontend/           # ReactJS Single Page Application
├── rpa/                # Playwright automation scripts and endpoints
├── worker/             # Background task consumer scripts
├── docs/               # System documentation, API contracts, diagrams, and images
├── postman/            # API collections for testing
├── .github/            # GitHub Actions and templates
├── docker-compose.yml  # Microservices orchestration
└── Makefile            # Task automation commands
```

---

## 🔮 Future Improvements (Roadmap)

- [ ] Implement Kubernetes (K8s) manifests for cloud-native deployment.
- [ ] Add comprehensive Unit and Integration testing suites (pytest, Jest).
- [ ] Introduce GraphQL endpoints for flexible frontend data fetching.
- [ ] Setup CI/CD pipelines via GitHub Actions.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
#   e n t e r p r i s e - e v e n t - d r i v e n - t r a n s a c t i o n - p l a t f o r m  
 
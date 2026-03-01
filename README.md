<div align="center">

# 🧠 Psyche Scheduler

**A comprehensive, full-stack appointment scheduling platform for mental health professionals**

[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](#)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)

*A robust web application designed to streamline the booking process between patients and professionals, featuring role-based dashboards, real-time availability tracking, and secure JWT authentication.*

</div>

<br />

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🏗️ Architecture & Structure](#️-architecture--structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup-spring-boot)
  - [Frontend Setup](#frontend-setup-react)
- [🛠️ Tech Stack](#️-tech-stack)

---

## ✨ Key Features

* **✔️ Role-Based Access Control (RBAC):** Distinct and secure experiences for Patients and Professionals, managed via JSON Web Tokens (JWT).
* **✔️ Smart Scheduling System:** Dynamic management of availability slots and a multi-step appointment booking process for patients.
* **✔️ Interactive Dashboards:** Personalized views for users to manage upcoming sessions, view booking history, and edit profiles.
* **✔️ Modern UI/UX:** A fully responsive, aesthetic, and accessible interface built with React, Tailwind CSS, and custom UI components.
* **✔️ Containerized Deployment:** Includes a `docker-compose.yml` for easy setup and teardown of the application environment.

---

## 🏗️ Architecture & Structure

This project follows a decoupled client-server architecture:

```text
Psyche-Scheduler/
├── backend/                       # Spring Boot REST API
│   ├── src/main/java/...          # Controllers, Services, Repositories, and Security (JWT)
│   ├── src/main/resources/        # Application configurations
│   └── pom.xml                    # Maven dependencies
├── frontend/                      # React SPA
│   ├── src/components/            # Reusable UI components and scheduling steps
│   ├── src/pages/                 # Main application views (Dashboard, Booking, Profile)
│   ├── src/api/                   # Axios HTTP client configuration
│   └── package.json               # Node.js dependencies
└── docker-compose.yml             # Container orchestration configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine before starting:
* **Java Development Kit (JDK):** Version 17 or higher
* **Node.js:** v18 or higher (and `npm` or `yarn`)
* **Docker & Docker Compose:** *(Optional, but recommended for database setup)*

---

### Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up your database environment. If using Docker, you can run from the root directory:
   ```bash
   docker-compose up -d
   ```
3. Run the Spring Boot application:
   ```bash
   # On Windows
   mvnw.cmd spring-boot:run

   # On macOS/Linux
   ./mvnw spring-boot:run
   ```
*The backend server will start on `http://localhost:8080`.*

---

### Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
*The frontend application will be available at `http://localhost:5173`.*

---

## 🛠️ Tech Stack

**Frontend:**
* React + Vite
* Tailwind CSS
* Lucide React (Icons)
* Axios (HTTP Requests)

**Backend:**
* Java
* Spring Boot (Web, Data JPA, Security)
* JSON Web Tokens (jjwt)
* Maven

**Infrastructure:**
* Docker Compose

<br />

<div align="center">
  <i>Developed with ☕ to simplify mental health care scheduling.</i>
</div>

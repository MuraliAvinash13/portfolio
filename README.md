# 🚀 Mukhe Murali Avinash | 3D Developer Portfolio & Universe

This is a world-class, premium 3D portfolio website and Spring Boot REST backend built for **Mukhe Murali Avinash** (Java Full Stack Developer, MERN Stack Developer, and AI Enthusiast). The theme is designed as a futuristic "Developer Universe" space command HUD center, integrating real-time 3D orbits, particle systems, floating project crystals, an interactive AI assistant (AVA), and a complete MySQL database interface.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (v19)** & **Vite (v8)**
- **Three.js** & **React Three Fiber (R3F)** & **@react-three/drei**
- **GSAP** (GreenSock) & **Framer Motion** for smooth 3D cameras and UI animations
- **Tailwind CSS (v4)** for high-fidelity glassmorphism HUD styling
- **Lucide React** for sci-fi command indicators
- **Canvas Confetti** for success feedback animations

### Backend
- **Java (v17)** & **Spring Boot (v3.3)**
- **Spring Data JPA** (Hibernate)
- **Spring Mail** (for contact notifications)
- **H2 In-Memory Database** (local fallback) & **MySQL** (production)
- **MVC Architecture**, DTO mappings, Service validation, and Global Exception Handler

---

## 📂 Folder Structure

```text
Murali-Portfolio/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/portfolio/backend/
│   │   │   │   ├── config/             # Web/CORS settings
│   │   │   │   ├── controller/         # REST Controllers
│   │   │   │   ├── dto/                # Data Transfer Objects
│   │   │   │   ├── entity/             # JPA Database Entities
│   │   │   │   ├── exception/          # Global Exception Mappings
│   │   │   │   ├── repository/         # JPA Repositories
│   │   │   │   └── service/            # Core business services (AVA logic, Email)
│   │   │   └── resources/
│   │   │       └── application.properties # H2/MySQL property specs
│   │   └── test/                       # Junit compilation tests
│   └── pom.xml                         # Maven dependencies config
├── frontend/
│   ├── src/
│   │   ├── components/                 # 3D canvas and HUD dashboard items
│   │   ├── utils/                      # REST Client and AVA offline fallbacks
│   │   ├── App.jsx                     # View orchestrator
│   │   ├── index.css                   # Custom v4 Tailwind directives and glows
│   │   └── main.jsx                    # React mounting config
│   ├── index.html                      # Futuristic Orbitron & Outfit font imports
│   ├── package.json                    # React dependencies
│   └── vite.config.js                  # React & Tailwind v4 plugin compilation config
├── database/
│   └── schema.sql                      # MySQL table definitions and seed insert statements
└── README.md                           # Operations and deployment manual
```

---

## 💾 Database Schema & Seeding

The database layer consists of three main tables: `contacts`, `projects`, and `skills`.

### MySQL Schema (`database/schema.sql`)
The schema file is located under `database/schema.sql` and includes indices, structures, and default values.
To seed the database, import the file into your MySQL command prompt:
```bash
mysql -u your_username -p < database/schema.sql
```

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env.local` / Vercel Environment Configuration)
```env
# URL where the Spring Boot REST API is running
VITE_API_URL=http://localhost:8080/api
```

### Backend (`backend/src/main/resources/application.properties` / Render Environment Configuration)
```env
# Spring Data JPA overrides for Production MySQL database
SPRING_DATASOURCE_URL=jdbc:mysql://your-mysql-host:3306/portfolio_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_DRIVER=com.mysql.cj.jdbc.Driver
SPRING_DATASOURCE_USERNAME=your_database_username
SPRING_DATASOURCE_PASSWORD=your_database_password
SPRING_JPA_PLATFORM=org.hibernate.dialect.MySQLDialect

# Optional: Email SMTP server config to forward Contact submissions
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password
```

---

## 📡 API Documentation

All API responses are formatted in JSON, implementing validation and standardized HTTP status codes.

| Endpoint | Method | Payload | Success | Description |
|---|---|---|---|---|
| `/api/projects` | `GET` | None | `200 OK` | Fetch all project credentials. |
| `/api/projects/{id}` | `GET` | None | `200 OK` | Fetch single project by ID. |
| `/api/skills` | `GET` | None | `200 OK` | Fetch all technical skills and proficiencies. |
| `/api/contacts` | `POST` | `ContactDTO` | `201 Created` | Submit a new contact message. Auto-stores to MySQL and triggers notification. |
| `/api/chat` | `POST` | `ChatRequest` | `200 OK` | Communicate with virtual assistant AVA. Processes query and returns markdown details. |
| `/api/resume/download` | `GET` | None | `200 OK` | Download Avinash's resume PDF. Falls back to dynamic text resume if file is missing. |

### DTO Payload Examples

#### 1. Contact Form submission (`POST /api/contacts`)
```json
{
  "name": "Satya Nadella",
  "email": "satya@microsoft.com",
  "subject": "Collaboration Opportunity",
  "message": "We were highly impressed by your 3D universe portfolio. Let's schedule an interview."
}
```

#### 2. Chat with AVA (`POST /api/chat`)
```json
{
  "message": "What projects have you built?"
}
```
**Response**:
```json
{
  "response": "Avinash has built several projects: **Blood Bank Management System** (Spring Boot/React), **Pharmacy Ordering System** (MERN), **Grayscale Image Colorization AI** (Flask/GANs), and this **3D Space command Portfolio**. Which one would you like to explore?",
  "sender": "AVA",
  "timestamp": "2026-05-25T22:08:48.123Z"
}
```

---

## ⚡ Running Locally

### Prerequisites
- Node.js (v18+)
- Java JDK 17
- Maven (v3.8+)
- MySQL (Optional, uses in-memory H2 DB fallback by default)

### Step 1: Initialize Database (Optional)
Create database `portfolio_db` and seed using `database/schema.sql` if you are using MySQL locally.

### Step 2: Spin Up Spring Boot Backend
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
*The server will initialize at `http://localhost:8080`.*

### Step 3: Run Vite Frontend
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser. The frontend automatically detects the active backend, and falls back to a smart client-side database/AVA chatbot engine if the Spring Boot server is offline.*

---

## 🚀 Deployment Guide

### Backend → Render
1. Create a new **Web Service** on Render.
2. Link your Git repository.
3. Configure the environment:
   - **Runtime**: `Docker` or `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
4. Add environment variables under the **Environment** tab:
   - `SPRING_DATASOURCE_URL` (your MySQL host connection string)
   - `SPRING_DATASOURCE_USERNAME` & `SPRING_DATASOURCE_PASSWORD`
   - `SPRING_DATASOURCE_DRIVER` = `com.mysql.cj.jdbc.Driver`
   - `SPRING_JPA_PLATFORM` = `org.hibernate.dialect.MySQLDialect`
5. Click **Deploy**.

### Frontend → Vercel
1. Install Vercel CLI or link your Vercel Dashboard.
2. Add your project, specifying the build settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-render-url.onrender.com/api`
4. Deploy!

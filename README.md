# 🧠 TaskStudio AI

**TaskStudio AI** is a modern, AI-powered task management platform inspired by tools like Notion, Monday, and Atlassian.  
It enables users to **create, manage, and organize tasks** using natural language — powered by **Cloudflare’s Llama AI** and **Next.js 15**.

> 🚧 **This project is still in active development.**  
> Core task management, dashboard, and AI features are working, but several features like authentication UI and task modals are still being completed.

---

## ✨ Features

✅ **AI Assistant**
- Create tasks by describing them in plain English.
- Example: “Make a presentation draft due December 17th.”  
  → The AI automatically adds it to your task board.

✅ **Kanban Board**
- Drag and drop tasks between _To Do_, _In Progress_, and _Done_.
- Modern, fluid task transitions with clean UI.

✅ **Dashboard Overview**
- View total active, completed, and overdue tasks.
- AI-integrated task creation and search coming soon.

✅ **Database**
- Managed via **Prisma ORM** and **PostgreSQL (Neon)**.
- Supports relational models for users, projects, and tasks.

✅ **Authentication**
- Powered by **NextAuth.js** (currently under UI enhancement phase).

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 15 (App Router, Turbopack), React 19, Tailwind CSS |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Auth** | NextAuth.js |
| **Database** | PostgreSQL (via [Neon.tech](https://neon.tech)) |
| **AI** | Cloudflare Workers AI (Llama 3.x) |
| **UI Library** | shadcn/ui + Lucide icons |
| **Drag & Drop** | React DnD (HTML5Backend) |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/taskstudio-ai.git
cd taskstudio-ai
npm i
npm run dev

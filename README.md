# Education-as-a-Service (EaaS)

A full-stack learning modules application built with **Angular (Frontend)**, **NestJS (Backend)**, and **GraphQL/REST APIs**.

## Project Overview

This is a TypeScript monorepo demonstrating modern web development practices:
- **Frontend**: Angular 18+ with Signals (reactive state management)
- **Backend**: NestJS with Express
- **APIs**: REST + GraphQL (both implementations available)
- **Shared**: TypeScript interfaces in monorepo
- **Testing**: Jest unit tests

**Key Features:**
- 📚 Browse 20 learning modules across 3 categories (AI, Sustainability, Digital Skills)
- 🔍 Search and filter modules by keyword or category
- ✅ Mark modules as complete/incomplete
- 📊 Real-time progress tracking
- 🔄 Dual API support (REST + GraphQL)

---

## Quick Start

### Prerequisites
- Node.js 22+ 
- npm 11+

### 1. Clone and Install

```bash
# Clone the repository
git clone <repo-url>
cd Education-as-a-Service

# Install root dependencies (if using npm workspaces)
npm install
```

### 2. Start Backend (Terminal 1)

```bash
cd backend
npm install
npm run start:dev
```

Expected output:
```
[Nest] ... LOG [NestApplication] Nest application successfully started
```

**Backend runs on:** `http://localhost:3000`

### 3. Start Frontend (Terminal 2)

```bash
cd frontend
npm install
ng serve
```

Expected output:
```
✔ Compiled successfully.
The application will be available at http://localhost:4200
```

**Frontend runs on:** `http://localhost:4200`

### 4. Open in Browser

Visit: **`http://localhost:4200`**

---

## Using the Application

### Web Interface
1. **Search modules** - Type keywords in the search box (e.g., "machine", "sustainability")
2. **Filter by category** - Select a category from the dropdown
3. **Mark complete** - Click "○ Start" to mark modules as complete (turns green "✓ Completed")
4. **View progress** - Stats card shows total modules, completed count, and completion percentage

### REST API Endpoints

**Get all modules:**
```bash
curl http://localhost:3000/api/modules
```

**Search modules:**
```bash
curl "http://localhost:3000/api/modules?search=machine"
```

**Filter by category:**
```bash
curl "http://localhost:3000/api/modules?category=AI"
```

**Search + Filter:**
```bash
curl "http://localhost:3000/api/modules?search=learning&category=AI"
```

**Get statistics:**
```bash
curl http://localhost:3000/api/modules/stats
```

**Update module completion:**
```bash
curl -X PATCH http://localhost:3000/api/modules/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Toggle module completion:**
```bash
curl -X PATCH http://localhost:3000/api/modules/1 \
  -H "Content-Type: application/json" \
  -d '{}'
```

### GraphQL API Endpoint

**GraphQL endpoint:** `http://localhost:3000/graphql`

**Get all modules:**
```graphql
query {
  modules {
    id
    title
    category
    estimatedMinutes
    completed
  }
}
```

**Search modules:**
```graphql
query {
  modules(searchTerm: "AI") {
    id
    title
  }
}
```

**Filter by category:**
```graphql
query {
  modules(category: "Sustainability") {
    id
    title
  }
}
```

**Search + Filter:**
```graphql
query {
  modules(searchTerm: "learning", category: "AI") {
    id
    title
    completed
  }
}
```

**Get statistics:**
```graphql
query {
  moduleStats {
    totalModules
    completedModules
    completionPercentage
  }
}
```

**Update module completion:**
```graphql
mutation {
  updateModuleCompleted(id: "1", completed: true) {
    id
    title
    completed
  }
}
```

**Toggle module completion:**
```graphql
mutation {
  toggleModuleCompleted(id: "1") {
    id
    title
    completed
  }
}
```

---

## Project Structure

```
Education-as-a-Service/
├── shared/                          # Shared TypeScript types
│   ├── src/
│   │   ├── index.ts                # Barrel export
│   │   └── learning-module.interface.ts  # Type definitions
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                         # NestJS Backend
│   ├── src/
│   │   ├── modules/                # Learning modules feature
│   │   │   ├── modules.controller.ts    # REST HTTP routes
│   │   │   ├── modules.resolver.ts      # GraphQL resolver
│   │   │   ├── modules.service.ts       # Business logic
│   │   │   ├── modules.repository.ts    # Data access
│   │   │   ├── modules.service.spec.ts  # Unit tests
│   │   │   ├── dto/
│   │   │   │   └── learning-module.type.ts  # GraphQL types
│   │   │   └── modules.module.ts
│   │   ├── app.module.ts           # Root module with GraphQL setup
│   │   └── main.ts                 # Bootstrap file
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   ├── nest-cli.json
│   └── README.md
│
├── frontend/                        # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   └── learning-modules/
│   │   │   │       ├── components/
│   │   │   │       │   └── learning-modules-list/
│   │   │   │       │       ├── learning-modules-list.component.ts
│   │   │   │       │       ├── learning-modules-list.component.html
│   │   │   │       │       └── learning-modules-list.component.css
│   │   │   │       └── services/
│   │   │   │           └── learning-modules.service.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.config.ts
│   │   └── main.ts
│   ├── package.json
│   ├── angular.json
│   └── tsconfig.json
│
└── package.json                    # Root package.json (optional, for workspaces)
```

---

## Architecture

### 3-Tier Backend Architecture

```
HTTP Request
    ↓
┌─────────────────────────────┐
│ Controller (REST/GraphQL)   │ ← Handles HTTP/GraphQL requests
├─────────────────────────────┤
│ Service                     │ ← Business logic & calculations
├─────────────────────────────┤
│ Repository                  │ ← Data access (in-memory array)
├─────────────────────────────┤
│ Shared Types (@myapp/shared)│ ← TypeScript interfaces
└─────────────────────────────┘
```

**Benefits:**
- ✅ Separation of concerns
- ✅ Easy to test (mock repository)
- ✅ Reusable business logic
- ✅ Swappable data sources

---

## Running Tests

### Backend Unit Tests

```bash
cd backend

# Run all tests
npm test

# Run specific test file
npm test -- modules.service.spec

# Watch mode
npm test -- --watch
```

**Current test coverage:**
- ✅ 24 tests all passing
- ✅ Service layer (business logic)
- ✅ Search/filter functionality
- ✅ Statistics calculations

---

## REST vs GraphQL: Implementation Notes

### REST (Currently Active)
- **Endpoint:** `http://localhost:3000/api/modules`
- **Query params:** `?search=X&category=Y`
- **HTTP methods:** GET, PATCH
- **Simpler:** No boilerplate, HTTP semantics

### GraphQL (Available)
- **Endpoint:** `http://localhost:3000/graphql`
- **Queries/Mutations:** Type-safe, self-documenting
- **Advantages:** Over-fetch prevention, real-time subscriptions ready
- **Commented in code:** Service has both implementations side-by-side

**To switch to GraphQL:**
1. In `learning-modules.service.ts`, comment out REST methods
2. Uncomment GraphQL methods
3. Component code remains unchanged (abstraction layer!)

---

## Frontend Architecture

### Modern Angular Patterns

**Signals-based Reactive State:**
```typescript
// Service owns all state
modules = signal<LearningModule[]>([]);
searchTerm = signal('');

// Effect auto-triggers on changes
effect(() => {
  this.searchTerm();
  this.fetchModules();
});

// Component uses signals (no subscriptions)
<li *ngFor="let module of service.modules()">
```

**Benefits:**
- ✅ No memory leaks (no manual unsubscribe)
- ✅ Automatic change detection
- ✅ Cleaner component code
- ✅ Modern Angular 16+ patterns

---

## Key Technologies

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Angular | 18+ |
| Frontend State | Signals | Angular 16+ |
| Backend | NestJS | 10+ |
| Backend HTTP | Express | 4.x |
| APIs | GraphQL + REST | Apollo/NestJS |
| Language | TypeScript | 5.9+ |
| Testing | Jest | 29+ |
| Node.js | - | 22+ |

---

## Common Issues & Solutions

### Port Already in Use
```bash
# Backend (default 3000)
kill -9 $(lsof -t -i:3000)

# Frontend (default 4200)
ng serve --port 4300
```

### CORS Errors
Backend already configured with CORS. If issues persist:
```typescript
// backend/src/main.ts
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true,
});
```

### Path Alias Issues
TypeScript path aliases configured in both `tsconfig.json` files:
```json
"paths": {
  "@myapp/*": ["../shared/src/*"]
}
```

### Modules Service Not Found
Make sure `ModulesModule` is imported in `AppModule`:
```typescript
@Module({
  imports: [ModulesModule],
})
export class AppModule {}
```

---

## Development Workflow

### Adding a New Feature

1. **Add to shared types** (`shared/src/learning-module.interface.ts`)
2. **Implement in service** (`backend/src/modules/modules.service.ts`)
3. **Add REST endpoint** (`backend/src/modules/modules.controller.ts`)
4. **Add GraphQL resolver** (`backend/src/modules/modules.resolver.ts`)
5. **Update frontend service** (`frontend/.../learning-modules.service.ts`)
6. **Update component** (`frontend/.../learning-modules-list.component.ts`)
7. **Test with curl/GraphQL** before UI testing

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/search-improvement

# Make changes, test locally
npm run start:dev  # backend
ng serve          # frontend

# Run tests
cd backend && npm test

# Commit and push
git add .
git commit -m "feat: improved search functionality"
git push origin feature/search-improvement
```

---

## Deployment Notes

### For Production
1. **Build backend:** `cd backend && npm run build`
2. **Build frontend:** `cd frontend && ng build --configuration production`
3. **Serve frontend from backend:** Configure Express static files
4. **Environment variables:** Create `.env` files for API endpoints
5. **Database:** Replace in-memory repository with real DB (PostgreSQL, MongoDB)

### Docker Support (Optional)
Can add Docker setup for containerized deployment.

---


## Learning Resources

- [Angular Signals Documentation](https://angular.io/guide/signals)
- [NestJS Official Guide](https://docs.nestjs.com/)
- [GraphQL Best Practices](https://graphql.org/learn/)
- [REST API Design](https://restfulapi.net/)

---

## License

MIT - Feel free to use this for learning and interviews!

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `cd backend && npm run start:dev` | Start backend on port 3000 |
| `cd frontend && ng serve` | Start frontend on port 4200 |
| `cd backend && npm test` | Run backend tests |
| `curl http://localhost:3000/api/modules` | Test REST API |
| `curl -X POST http://localhost:3000/graphql` | Test GraphQL API |

---

**Ready to explore? Start with Step 1-4 above and visit `http://localhost:4200`! 🚀**

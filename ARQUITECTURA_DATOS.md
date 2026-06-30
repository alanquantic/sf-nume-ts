# 📊 Flujo de Datos - Arquitectura Actual vs. Nueva

## 🔴 ARQUITECTURA ACTUAL (WordPress + Metadata)

### Flujo de Carga de Datos (GET)

```
1. Frontend (React) → Login
   └─> POST /wp-json/app/v3/auth/login
       └─> Backend WordPress
           └─> Retorna UserResponse con todos los consultants en metadata

2. UserResponse estructura:
   {
     token: string,
     user: {id, firstName, lastName, email, ...},
     consultants: [
       {
         id, names, lastName, scdLastName, date,
         partner: [{id, names, date, ...}],
         partnerData: [{id, name, date, yearMeet, partner: [...]}],
         groupData: [{id, name, description, members: [...]}],
         createNames: [{id, name, birthDate, isPerson: boolean}],
         notes: {[date]: {[path]: "content"}}
       }
     ],
     license: {...}
   }

3. Almacenamiento en Frontend:
   - Usuario en AuthContext
   - Consultants en ConsultProvider
   - Datos activos en ConsultProvider state
```

### Diagrama Flujo LOGIN ACTUAL
```
┌─────────────────────────────────────────────────────────────────┐
│ Frontend (React)                                                 │
│  ├─ AuthProvider (token, user)                                  │
│  └─ ConsultProvider (consultants, activeConsultant)             │
└──────────────────┬──────────────────────────────────────────────┘
                   │ POST /wp-json/app/v3/auth/login
                   │ {username, password}
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│ Backend WordPress (PHP)                                          │
│  ├─ Autenticación                                               │
│  ├─ Obtener user_id                                             │
│  ├─ Obtener metadata (consultants = JSON array)                 │
│  ├─ Parsear todos los consultants                               │
│  └─ Retornar UserResponse completo                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔵 OPERACIONES CRUD ACTUALES (WordPress)

### ✏️ CREATE - Crear Consultante (POST)

```
Frontend:
const newConsultant = {
  id: generateUUID(),
  names: "Juan",
  lastName: "Pérez",
  date: "1990-01-15",
  partner: [],
  partnerData: [],
  groupData: [],
  notes: {}
}

// Llamada:
POST /wp-json/app/v1/u
Body: [...allConsultants, newConsultant] // Array COMPLETO

Backend:
├─ Obtener consultants actuales de metadata
├─ Agregar el nuevo consultant
└─ Guardar ARRAY COMPLETO en metadata (metadata_key: 'app_consultants')
```

### 📖 READ - Obtener Consultantes (GET)

```
// Ocurre en LOGIN (ya incluido en UserResponse)
// No hay endpoint específico GET para consultants individuales
// Los consultants se cargan una sola vez en login

Frontend usa: AuthContext.user.consultants
```

### 🔄 UPDATE - Actualizar Consultante (PUT)

```
Frontend:
const updatedConsultant = {
  ...oldConsultant,
  names: "Juan Carlos",  // Campo modificado
  partner: [...newPartners]
}

// Llamada:
POST /wp-json/app/v1/u  // Nota: POST, no PUT
Body: [...allConsultants.map(c => 
  c.id === updatedConsultant.id ? updatedConsultant : c
)] // Array COMPLETO actualizado

Backend:
├─ Reemplazar ARRAY COMPLETO en metadata
└─ Retornar array actualizado

⚠️ PROBLEMA: Cada actualización reemplaza TODO el array
   - Ineficiente
   - Riesgo de pérdida de datos si hay cambios concurrentes
   - Sin validación granular
```

### 🗑️ DELETE - Eliminar Consultante (DELETE)

```
Frontend:
// Llamada:
POST /wp-json/app/v1/u
Body: [...allConsultants.filter(c => c.id !== consultantToDelete.id)]

Backend:
└─ Guardar array filtrado en metadata
```

### 📝 UPDATE PERFIL (Profile Update - POST)

```
Frontend:
const profileUpdate = {
  names: "Juan Carlos",
  lastName: "Pérez",
  scdLastName: "García",
  phone: "+34-123-456",
  address: "Calle Principal 123",
  company: "Mi Empresa",
  logoURL: "...",
  webSite: "www.ejemplo.com"
}

POST /wp-json/app/v1/p
Body: profileUpdate

Backend:
└─ Actualizar metadata de usuario: user_firstname, user_lastname, etc.
```

---

## 🌍 ESTRUCTURA DE DATOS ACTUAL (En Metadata WordPress)

### Metadata User (WordPress)
```
user_id: 123
├─ user_firstname: "Juan"
├─ user_lastname: "Pérez"
├─ user_email: "juan@example.com"
├─ user_phone: "+34-123-456"
├─ app_profile: JSON {
│   names, lastName, scdLastName, address, tel, date,
│   company, logoURL, phone, webSite
│ }
└─ app_consultants: JSON [
    {
      id: "consultant-uuid",
      names: "Cliente 1",
      lastName: "Apellido",
      date: "1990-01-15",
      partner: [{id, names, date, ...}],
      partnerData: [{id, name, date, yearMeet, partner: [...]}],
      groupData: [{id, name, description, members: [...]}],
      createNames: [{id, name, birthDate, isPerson}],
      notes: {"2025-01-15": {"camino": "contenido"}}
    }
  ]
```

---

## 🚀 ARQUITECTURA NUEVA (Neon PostgreSQL)

### Flujo de Carga (GET) NUEVO

```
1. Frontend → Login
   └─> POST /api/v2/auth/login
       └─> Backend Node.js (Neon)
           ├─ Autenticar usuario
           ├─ Generar token JWT
           └─ Retornar user + token (sin consultants)

2. Frontend → Obtener Consultants
   └─> GET /api/v2/consultants
       └─> SELECT * FROM consultants WHERE user_id = ?
           └─ Retorna array de consultants

3. Frontend → Obtener Details de Consultant
   └─> GET /api/v2/consultants/:id
       └─> Retorna consultant con:
           ├─ GET /api/v2/consultants/:id/partners
           ├─ GET /api/v2/consultants/:id/partner-data
           ├─ GET /api/v2/consultants/:id/groups
           └─ GET /api/v2/consultants/:id/notes
```

### Diagrama Flujo LOGIN NUEVO
```
┌──────────────────────────────────────────────────┐
│ Frontend (React)                                  │
│ ├─ AuthProvider (token, user)                   │
│ └─ ConsultProvider (loads via separate GET)     │
└───────────────────┬────────────────────────────┘
          │                      │
          │ POST /api/v2/auth/login        │ GET /api/v2/consultants
          │ {username, password}           │ Header: {token}
          ▼                                 ▼
┌────────────────────────────────────────────────────────────────┐
│ Backend Node.js (Express + Prisma)                             │
│                                                                 │
│ Auth Service:                Consultant Service:               │
│ ├─ Validar credenciales      ├─ Obtener de DB                 │
│ ├─ Generar JWT               ├─ Filtrar por user_id           │
│ └─ Retornar token            └─ Retornar array                │
└───────────────┬───────────────────────────────┬────────────────┘
                │ UserResponse              │ Consultants[]
                │ {token, user}             │
```

---

## 🗄️ ESQUEMA DE BASE DE DATOS (Neon PostgreSQL)

### Tabla: `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  scd_last_name VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  country VARCHAR(100),
  avatar_url VARCHAR(500),
  gender VARCHAR(20),
  birth_date DATE,
  company_id INT REFERENCES companies(id),
  license_status ENUM('active', 'expired', 'inactive'),
  license_expiration_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);
```

### Tabla: `consultants`
```sql
CREATE TABLE consultants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  names VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  scd_last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  gender VARCHAR(20),
  nationality VARCHAR(100),
  birth_date DATE,
  company VARCHAR(255),
  notes JSONB, -- {"2025-01-15": {"camino": "contenido", "nombre": "..."}}
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Tabla: `partners`
```sql
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID NOT NULL REFERENCES consultants(id) ON DELETE CASCADE,
  names VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  scd_last_name VARCHAR(255),
  birth_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultant_id) REFERENCES consultants(id) ON DELETE CASCADE
);
```

### Tabla: `partner_data`
```sql
CREATE TABLE partner_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID NOT NULL REFERENCES consultants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  year_meet INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultant_id) REFERENCES consultants(id) ON DELETE CASCADE
);
```

### Tabla: `partner_data_members`
```sql
CREATE TABLE partner_data_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_data_id UUID NOT NULL REFERENCES partner_data(id) ON DELETE CASCADE,
  names VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  scd_last_name VARCHAR(255),
  birth_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (partner_data_id) REFERENCES partner_data(id) ON DELETE CASCADE
);
```

### Tabla: `groups`
```sql
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID NOT NULL REFERENCES consultants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  last_init INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultant_id) REFERENCES consultants(id) ON DELETE CASCADE
);
```

### Tabla: `group_members`
```sql
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  names VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  scd_last_name VARCHAR(255),
  birth_date DATE NOT NULL,
  date_init INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);
```

### Tabla: `created_names`
```sql
CREATE TABLE created_names (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID NOT NULL REFERENCES consultants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  scd_last_name VARCHAR(255),
  birth_date DATE NOT NULL,
  is_person BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultant_id) REFERENCES consultants(id) ON DELETE CASCADE
);
```

### Tabla: `companies`
```sql
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  direction VARCHAR(500),
  logo_url VARCHAR(500),
  phone VARCHAR(20),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 ENDPOINTS NUEVOS (Neon + Backend)

### 🔐 AUTENTICACIÓN

```
POST /api/v2/auth/login
Request: { username: string, password: string }
Response: { token: string, user: User }

POST /api/v2/auth/me
Request: {}
Response: { user: User, license: License }
```

### 👥 CONSULTANTS - CRUD

#### CREATE
```
POST /api/v2/consultants
Headers: { Authorization: Bearer {token} }
Body: {
  names: string,
  last_name: string,
  scd_last_name: string,
  email: string,
  phone: string,
  gender: string,
  birth_date: ISO date,
  company: string
}
Response: { id: UUID, ...consultant }
```

#### READ (Listado)
```
GET /api/v2/consultants
Headers: { Authorization: Bearer {token} }
Response: [{id, names, last_name, ...}, ...]
```

#### READ (Individual)
```
GET /api/v2/consultants/:id
Headers: { Authorization: Bearer {token} }
Response: {
  id, names, last_name, birth_date,
  partners: [],
  partnerData: [],
  groups: [],
  createdNames: [],
  notes: {}
}
```

#### UPDATE
```
PUT /api/v2/consultants/:id
Headers: { Authorization: Bearer {token} }
Body: {
  names?: string,
  last_name?: string,
  email?: string,
  phone?: string,
  gender?: string,
  birth_date?: ISO date
}
Response: { id, ...updatedConsultant }
```

#### DELETE
```
DELETE /api/v2/consultants/:id
Headers: { Authorization: Bearer {token} }
Response: { success: true, message: "Consultant deleted" }
```

### 💑 PARTNERS (de Consultant)

#### CREATE
```
POST /api/v2/consultants/:consultantId/partners
Body: {
  names: string,
  last_name: string,
  birth_date: ISO date
}
Response: { id: UUID, ...partner }
```

#### READ
```
GET /api/v2/consultants/:consultantId/partners
Response: [{id, names, birth_date, ...}, ...]
```

#### UPDATE
```
PUT /api/v2/consultants/:consultantId/partners/:partnerId
Body: { names?, last_name?, birth_date? }
Response: { id, ...updatedPartner }
```

#### DELETE
```
DELETE /api/v2/consultants/:consultantId/partners/:partnerId
Response: { success: true }
```

### 🤝 PARTNER DATA

#### CREATE
```
POST /api/v2/consultants/:consultantId/partner-data
Body: {
  name: string,
  year_meet: number,
  members: [{names, last_name, birth_date}, ...]
}
Response: { id: UUID, ...partnerData }
```

#### READ
```
GET /api/v2/consultants/:consultantId/partner-data
Response: [
  {
    id, name, year_meet,
    members: [{id, names, birth_date, ...}]
  }, ...
]
```

#### UPDATE
```
PUT /api/v2/consultants/:consultantId/partner-data/:partnerId
Body: { name?, year_meet? }
Response: { id, ...updated }
```

#### DELETE
```
DELETE /api/v2/consultants/:consultantId/partner-data/:partnerId
Response: { success: true }
```

### 👥 GROUPS

#### CREATE
```
POST /api/v2/consultants/:consultantId/groups
Body: {
  name: string,
  description: string,
  members: [{names, last_name, birth_date, date_init}, ...]
}
Response: { id: UUID, ...group }
```

#### READ
```
GET /api/v2/consultants/:consultantId/groups
Response: [
  {
    id, name, description,
    members: [{id, names, birth_date, ...}]
  }, ...
]
```

#### UPDATE
```
PUT /api/v2/consultants/:consultantId/groups/:groupId
Body: { name?, description? }
Response: { id, ...updated }
```

#### DELETE
```
DELETE /api/v2/consultants/:consultantId/groups/:groupId
Response: { success: true }
```

### 📔 CREATED NAMES

#### CREATE
```
POST /api/v2/consultants/:consultantId/created-names
Body: {
  name: string,
  last_name: string,
  birth_date: ISO date,
  is_person: boolean
}
Response: { id: UUID, ...createdName }
```

#### READ
```
GET /api/v2/consultants/:consultantId/created-names
Response: [{id, name, birth_date, is_person, ...}, ...]
```

#### UPDATE
```
PUT /api/v2/consultants/:consultantId/created-names/:nameId
Body: { name?, last_name?, birth_date?, is_person? }
Response: { id, ...updated }
```

#### DELETE
```
DELETE /api/v2/consultants/:consultantId/created-names/:nameId
Response: { success: true }
```

### 📝 NOTES

#### CREATE/UPDATE
```
PUT /api/v2/consultants/:consultantId/notes
Body: {
  date: "2025-01-15",  // YYYY-MM-DD
  path: "camino" | "nombre" | "apellido" | ...,
  content: string
}
Response: {
  notes: {
    "2025-01-15": {
      "camino": "contenido",
      "nombre": "otro contenido"
    }
  }
}
```

#### READ
```
GET /api/v2/consultants/:consultantId/notes
Response: { "2025-01-15": { "camino": "contenido" }, ... }
```

#### DELETE
```
DELETE /api/v2/consultants/:consultantId/notes/:date
Response: { success: true }
```

---

## 🔄 COMPARATIVA: WordPress vs. Neon

| Aspecto | WordPress (Actual) | Neon (Nueva) |
|---------|-------------------|-------------|
| **Escalabilidad** | ❌ Metadata crece sin límite | ✅ Tablas normalizadas |
| **Query Performance** | ❌ Carga TODO en login | ✅ Lazy loading por endpoint |
| **Concurrencia** | ❌ Riesgo de sobrescribir datos | ✅ Manejo ACID transacciones |
| **Actualización** | ❌ Reemplaza array completo | ✅ Update granular por registro |
| **Relaciones** | ❌ Arrays anidados en JSON | ✅ Foreign keys normalizadas |
| **Validación** | ❌ A nivel de aplicación | ✅ Constraints en DB |
| **Indexing** | ❌ Búsqueda lineal | ✅ Índices B-Tree |
| **Backup/Recovery** | ❌ Exportar JSON | ✅ Snapshots automáticos |

---

## 🎯 PLAN DE MIGRACIÓN

### Fase 1: Backend Setup
- [ ] Crear backend Node.js/Express
- [ ] Configurar Prisma ORM
- [ ] Crear esquema en Neon
- [ ] Implementar autenticación JWT
- [ ] Implementar endpoints CRUD

### Fase 2: Frontend Refactor
- [ ] Cambiar llamadas POST a endpoints REST específicos
- [ ] Implementar lazy loading de consultants
- [ ] Actualizar hooks de API
- [ ] Implementar manejo de errores HTTP

### Fase 3: Migración de Datos
- [ ] Exportar datos de WordPress metadata
- [ ] Transformar JSON a tablas relacionales
- [ ] Validar integridad de datos
- [ ] Plan de rollback

### Fase 4: Testing & Deploy
- [ ] Testing de endpoints
- [ ] Testing de performance
- [ ] Deploy a producción
- [ ] Monitoreo

---

## 💡 BENEFICIOS DE LA MIGRACIÓN

✅ **Performance**: Queries específicas vs. cargar TODO  
✅ **Escalabilidad**: Tablas separadas vs. arrays en metadata  
✅ **Mantenibilidad**: API REST clara vs. WordPress hooks  
✅ **Concurrencia**: Transacciones ACID vs. sobrescrituras  
✅ **Seguridad**: Constraints DB vs. validación en app  
✅ **Backup**: Snapshots Neon vs. exportar JSON  


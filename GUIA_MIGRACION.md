# 🔄 Guía de Migración: WordPress → Neon

## 📊 Flujo Visual: Cómo Cambia la Arquitectura

### ANTES: WordPress (Monolítico)
```
┌──────────────────────────────────────┐
│        FRONTEND (React/Vite)         │
│  ┌──────────────────────────────────┐│
│  │ AuthProvider → Login             ││
│  └─────────────┬────────────────────┘│
│                │                     │
│                │ POST auth/login     │
│                ▼                     │
│  ┌──────────────────────────────────┐│
│  │ ConsultProvider ← UserResponse    ││
│  │ (TODOS los datos de una vez)    ││
│  │ - 10 consultants               ││
│  │ - 50 partners                  ││
│  │ - 100 groups                   ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
                 │
        ┌────────▼────────┐
        │  WordPress API  │
        │  /wp-json/app   │
        │   user_meta     │
        │  (JSON array)   │
        └─────────────────┘

PROBLEMA: Si tienes 1000 consultants, cargas 1000 en login ⚠️
```

### DESPUÉS: Neon (Distribuido)
```
┌────────────────────────────────────────────────────────────┐
│           FRONTEND (React/Vite)                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ AuthProvider → Login → {token, user}                 │ │
│  │                       (sin consultants)              │ │
│  └─────────────┬────────────────────────────────────────┘ │
│                │                                          │
│                │ POST /api/v2/auth/login                 │
│                ▼                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ConsultProvider                                       │ │
│  │   └─ GET /api/v2/consultants (primeros 20)        │ │
│  │      └─ GET /api/v2/consultants/:id (detalle)   │ │
│  │         └─ GET /api/v2/consultants/:id/partners │ │
│  │         └─ GET /api/v2/consultants/:id/groups   │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
              │
    ┌─────────▼────────────────┐
    │  Backend (Node.js)       │
    │  Express + Prisma        │
    └─────────┬────────────────┘
              │
    ┌─────────▼────────────────┐
    │   Neon PostgreSQL        │
    │  - consultants table     │
    │  - partners table        │
    │  - groups table          │
    │  - etc (normalizadas)    │
    └──────────────────────────┘

VENTAJA: Lazy loading, queries optimizadas, escalable ✅
```

---

## 📝 Ejemplos de Transformación de Datos

### ANTES: Un consultant en WordPress metadata
```json
{
  "id": "consultant-uuid-1",
  "names": "Juan",
  "lastName": "Pérez",
  "scdLastName": "García",
  "date": "1990-05-15",
  "email": "juan@example.com",
  "phone": "+34-123-456",
  "gender": "male",
  "nationality": "Spanish",
  "company": "Mi Empresa",
  "notes": {
    "2025-01-15": {
      "camino": "Camino del Número 7",
      "nombre": "Análisis del nombre",
      "desafios": "Trabajar en la integridad"
    }
  },
  "partner": [
    {
      "id": "partner-1",
      "names": "María",
      "lastName": "López",
      "date": "1992-03-20"
    }
  ],
  "partnerData": [
    {
      "id": "pdata-1",
      "name": "Pareja Actual",
      "yearMeet": 2015,
      "partner": [
        {
          "id": "partner-1",
          "names": "María",
          "lastName": "López",
          "date": "1992-03-20"
        }
      ]
    }
  ],
  "groupData": [
    {
      "id": "group-1",
      "name": "Familia",
      "description": "Grupo familiar",
      "lastInit": 2025,
      "members": [
        {
          "id": "member-1",
          "name": "Hijo",
          "lastName": "Pérez",
          "date": "2010-07-10",
          "dateInit": 2010
        }
      ]
    }
  ]
}
```

### DESPUÉS: Normalizado en Neon

#### `consultants` table
```sql
-- INSERT
INSERT INTO consultants (id, user_id, names, last_name, scd_last_name, email, phone, gender, nationality, birth_date, company, notes)
VALUES (
  'consultant-uuid-1',
  123,  -- user_id
  'Juan',
  'Pérez',
  'García',
  'juan@example.com',
  '+34-123-456',
  'male',
  'Spanish',
  '1990-05-15',
  'Mi Empresa',
  '{"2025-01-15": {"camino": "Camino del Número 7", "nombre": "Análisis del nombre"}}'::jsonb
);

-- SELECT
SELECT id, names, last_name, birth_date FROM consultants WHERE user_id = 123;

-- UPDATE
UPDATE consultants 
SET names = 'Juan Carlos', updated_at = CURRENT_TIMESTAMP
WHERE id = 'consultant-uuid-1';

-- DELETE
DELETE FROM consultants WHERE id = 'consultant-uuid-1';
```

#### `partners` table (Relación 1:N)
```sql
-- INSERT
INSERT INTO partners (id, consultant_id, names, last_name, scd_last_name, birth_date)
VALUES ('partner-1', 'consultant-uuid-1', 'María', 'López', NULL, '1992-03-20');

-- SELECT
SELECT id, names, birth_date FROM partners WHERE consultant_id = 'consultant-uuid-1';

-- UPDATE
UPDATE partners 
SET names = 'María del Rosario'
WHERE id = 'partner-1';

-- DELETE
DELETE FROM partners WHERE id = 'partner-1';
```

#### `partner_data` table (Histórico de relaciones)
```sql
-- INSERT
INSERT INTO partner_data (id, consultant_id, name, year_meet)
VALUES ('pdata-1', 'consultant-uuid-1', 'Pareja Actual', 2015);

-- SELECT
SELECT id, name, year_meet FROM partner_data WHERE consultant_id = 'consultant-uuid-1';

-- UPDATE
UPDATE partner_data 
SET name = 'Pareja Anterior'
WHERE id = 'pdata-1';

-- DELETE
DELETE FROM partner_data WHERE id = 'pdata-1';
```

#### `groups` table
```sql
-- INSERT
INSERT INTO groups (id, consultant_id, name, description, last_init)
VALUES ('group-1', 'consultant-uuid-1', 'Familia', 'Grupo familiar', 2025);

-- SELECT
SELECT id, name FROM groups WHERE consultant_id = 'consultant-uuid-1';
```

---

## 🔧 Implementación en Frontend

### Hook Actual (useConsultant.ts)
```typescript
// ACTUAL - WordPress
async function postConsultants(consultants: Api.Consultant[]) {
  const res = await axios.post('/wp-json/app/v1/u', consultants); // TODO: change to V2
  return res; // Envía ARRAY COMPLETO
}
```

### Hook Nuevo (Recomendado)
```typescript
// NUEVO - Neon
import { useMutation, useQuery } from 'react-query';

// CREATE
async function createConsultant(data: Omit<Api.Consultant, 'id'>) {
  const res = await axios.post('/api/v2/consultants', data);
  return res;
}

// READ (lista)
async function getConsultants() {
  const res = await axios.get('/api/v2/consultants');
  return res; // Retorna array, permite paginación
}

// READ (individual con relaciones)
async function getConsultantDetail(id: string) {
  const res = await axios.get(`/api/v2/consultants/${id}`);
  return res; // Incluye partners, groups, etc.
}

// UPDATE
async function updateConsultant(id: string, data: Partial<Api.Consultant>) {
  const res = await axios.put(`/api/v2/consultants/${id}`, data);
  return res; // Solo actualiza los campos que cambiaron
}

// DELETE
async function deleteConsultant(id: string) {
  const res = await axios.delete(`/api/v2/consultants/${id}`);
  return res;
}

// Hooks de React Query
export const useCreateConsultant = () => 
  useMutation(createConsultant, {
    onSuccess: () => queryClient.invalidateQueries(['consultants'])
  });

export const useConsultants = () => 
  useQuery(['consultants'], getConsultants);

export const useConsultantDetail = (id: string) => 
  useQuery(['consultant', id], () => getConsultantDetail(id), {
    enabled: !!id
  });

export const useUpdateConsultant = () => 
  useMutation(
    ({ id, data }: { id: string; data: Partial<Api.Consultant> }) => 
      updateConsultant(id, data),
    {
      onSuccess: () => queryClient.invalidateQueries(['consultants'])
    }
  );

export const useDeleteConsultant = () => 
  useMutation(deleteConsultant, {
    onSuccess: () => queryClient.invalidateQueries(['consultants'])
  });
```

---

## 🖥️ Implementación en Backend

### Schema Prisma (schema.prisma)
```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                    Int          @id @default(autoincrement())
  email                 String       @unique
  username              String       @unique
  passwordHash          String
  firstName             String?
  lastName              String?
  scdLastName           String?
  phone                 String?
  address               String?
  country               String?
  avatarUrl             String?
  gender                String?
  birthDate             DateTime?
  companyId             Int?
  licenseStatus         String       @default("active")
  licenseExpirationDate DateTime?
  
  company               Company?     @relation(fields: [companyId], references: [id])
  consultants           Consultant[]
  
  createdAt             DateTime     @default(now())
  updatedAt             DateTime     @updatedAt
  deletedAt             DateTime?
  
  @@map("users")
}

model Consultant {
  id                String       @id @default(cuid())
  userId            Int
  names             String
  lastName          String?
  scdLastName       String?
  email             String?
  phone             String?
  gender            String?
  nationality       String?
  birthDate         DateTime?
  company           String?
  notes             Json?        // {"2025-01-15": {"camino": "...", "nombre": "..."}}
  
  user              User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  partners          Partner[]
  partnerData       PartnerData[]
  groups            Group[]
  createdNames      CreatedName[]
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  deletedAt         DateTime?
  
  @@index([userId])
  @@map("consultants")
}

model Partner {
  id                String       @id @default(cuid())
  consultantId      String
  names             String
  lastName          String?
  scdLastName       String?
  birthDate         DateTime
  
  consultant        Consultant   @relation(fields: [consultantId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@index([consultantId])
  @@map("partners")
}

model PartnerData {
  id                String       @id @default(cuid())
  consultantId      String
  name              String
  yearMeet          Int?
  
  consultant        Consultant   @relation(fields: [consultantId], references: [id], onDelete: Cascade)
  members           PartnerDataMember[]
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@index([consultantId])
  @@map("partner_data")
}

model PartnerDataMember {
  id                String       @id @default(cuid())
  partnerDataId     String
  names             String
  lastName          String?
  scdLastName       String?
  birthDate         DateTime
  
  partnerData       PartnerData   @relation(fields: [partnerDataId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime     @default(now())
  
  @@index([partnerDataId])
  @@map("partner_data_members")
}

model Group {
  id                String       @id @default(cuid())
  consultantId      String
  name              String
  description       String?
  lastInit          Int?
  
  consultant        Consultant   @relation(fields: [consultantId], references: [id], onDelete: Cascade)
  members           GroupMember[]
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@index([consultantId])
  @@map("groups")
}

model GroupMember {
  id                String       @id @default(cuid())
  groupId           String
  names             String
  lastName          String?
  scdLastName       String?
  birthDate         DateTime
  dateInit          Int?
  
  group             Group         @relation(fields: [groupId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime     @default(now())
  
  @@index([groupId])
  @@map("group_members")
}

model CreatedName {
  id                String       @id @default(cuid())
  consultantId      String
  name              String
  lastName          String?
  scdLastName       String?
  birthDate         DateTime
  isPerson          Boolean      @default(true)
  
  consultant        Consultant   @relation(fields: [consultantId], references: [id], onDelete: Cascade)
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@index([consultantId])
  @@map("created_names")
}

model Company {
  id                Int          @id @default(autoincrement())
  name              String
  direction         String?
  logoUrl           String?
  phone             String?
  website           String?
  
  users             User[]
  
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  
  @@map("companies")
}
```

### Controller Ejemplo (consultants.controller.ts)
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE - POST /api/v2/consultants
export async function createConsultant(req: Request, res: Response) {
  try {
    const { names, lastName, email, birthDate, ... } = req.body;
    const userId = req.user!.id; // From JWT token
    
    const consultant = await prisma.consultant.create({
      data: {
        userId,
        names,
        lastName,
        email,
        birthDate: new Date(birthDate),
        // ... otros campos
      },
    });
    
    res.status(201).json(consultant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// READ (lista) - GET /api/v2/consultants
export async function getConsultants(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const { skip = 0, take = 20 } = req.query;
    
    const consultants = await prisma.consultant.findMany({
      where: { userId, deletedAt: null },
      skip: Number(skip),
      take: Number(take),
      select: {
        id: true,
        names: true,
        lastName: true,
        email: true,
        birthDate: true,
        createdAt: true,
      },
    });
    
    res.json(consultants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// READ (detalle) - GET /api/v2/consultants/:id
export async function getConsultantDetail(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    
    const consultant = await prisma.consultant.findUniqueOrThrow({
      where: { id },
      include: {
        partners: {
          where: { createdAt: { not: null } },
        },
        partnerData: {
          include: {
            members: true,
          },
        },
        groups: {
          include: {
            members: true,
          },
        },
        createdNames: true,
      },
    });
    
    // Validar que pertenece al usuario
    if (consultant.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    res.json(consultant);
  } catch (error) {
    res.status(404).json({ error: 'Consultant not found' });
  }
}

// UPDATE - PUT /api/v2/consultants/:id
export async function updateConsultant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = req.body;
    
    const consultant = await prisma.consultant.findUniqueOrThrow({
      where: { id },
    });
    
    if (consultant.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const updated = await prisma.consultant.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE - DELETE /api/v2/consultants/:id
export async function deleteConsultant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    
    const consultant = await prisma.consultant.findUniqueOrThrow({
      where: { id },
    });
    
    if (consultant.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Soft delete
    await prisma.consultant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    
    res.json({ success: true, message: 'Consultant deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

---

## 🔑 Puntos Clave de la Migración

### 1. **Cambio en la Estructura de Datos**
- ❌ WordPress: Arrays anidados en JSON
- ✅ Neon: Tablas relacionales normalizadas

### 2. **Cambio en los Endpoints**
- ❌ WordPress: Una ruta, envía todo el array
- ✅ Neon: Múltiples rutas, cada una con responsabilidad clara

### 3. **Cambio en el Flujo de Carga**
- ❌ WordPress: TODO en login
- ✅ Neon: Lazy loading bajo demanda

### 4. **Cambio en el Manejo de Concurrencia**
- ❌ WordPress: Riesgo de sobrescribir cambios
- ✅ Neon: Transacciones ACID, timestamps

### 5. **Validación**
- ❌ WordPress: Solo a nivel de aplicación
- ✅ Neon: Constraints en la base de datos + aplicación

---

## ⚡ Performance Comparison

### WordPress Actual
```
LOGIN:
1. Autentica usuario
2. Carga 1 usuario: 1 query
3. Carga 10 consultants: 1 query (todo en metadata)
4. Parsea JSON array: 10-50ms
5. Frontend renderiza 10 consultants: 1s
Total: ~1.5s

ACTUALIZAR 1 CONSULTANT:
1. Envía ARRAY COMPLETO de 10 consultants
2. Backend reemplaza todo en metadata
3. Frontend recibe array completo
Total: 500ms - 1s (Wasteful!)
```

### Neon Nueva
```
LOGIN:
1. Autentica usuario
2. Carga 1 usuario: 1 query
3. NO carga consultants (lazy load)
4. Frontend renderiza botón "Mis Consultants"
Total: ~300ms ⚡

VER LISTA DE CONSULTANTS:
1. GET /api/v2/consultants (primeros 20)
2. Query optimizada con índice en user_id
3. Retorna lista paginada
Total: ~100ms ⚡

VER DETALLE + RELACIONES:
1. GET /api/v2/consultants/123
2. Incluye partners, groups, notes
3. Query con JOINs optimizados
Total: ~150ms ⚡

ACTUALIZAR 1 CONSULTANT:
1. PUT /api/v2/consultants/123
2. UPDATE query solo del registro
3. Timestamps automáticos
4. Retorna registro actualizado
Total: ~100ms ⚡
```

---

## 🚨 Validación de Datos en Neon

```sql
-- Restricciones a nivel DB

-- 1. User no puede ser NULL
ALTER TABLE consultants ADD CONSTRAINT consultant_user_not_null 
  CHECK (user_id IS NOT NULL);

-- 2. Nombres no pueden ser vacíos
ALTER TABLE consultants ADD CONSTRAINT consultant_names_not_empty 
  CHECK (names != '');

-- 3. Fecha de nacimiento debe ser válida
ALTER TABLE consultants ADD CONSTRAINT consultant_birth_date_valid 
  CHECK (birth_date <= CURRENT_DATE);

-- 4. No duplicate consultants para mismo user y nombre
CREATE UNIQUE INDEX consultant_user_names_unique 
  ON consultants(user_id, names) 
  WHERE deleted_at IS NULL;

-- 5. Partner debe tener fecha de nacimiento
ALTER TABLE partners ADD CONSTRAINT partner_birth_date_not_null 
  CHECK (birth_date IS NOT NULL);
```

---

## 📋 Checklist de Migración

- [ ] **Preparación**
  - [ ] Crear base de datos Neon
  - [ ] Configurar Prisma schema
  - [ ] Crear backend Express

- [ ] **Backend**
  - [ ] Implementar autenticación JWT
  - [ ] Implementar endpoints CRUD consultants
  - [ ] Implementar endpoints partners/groups
  - [ ] Agregar validación
  - [ ] Agregar paginación
  - [ ] Agregar manejo de errores

- [ ] **Frontend**
  - [ ] Actualizar axios baseURL
  - [ ] Reemplazar hooks de API
  - [ ] Implementar lazy loading
  - [ ] Actualizar componentes que llaman API
  - [ ] Tester login y carga de consultants

- [ ] **Migración de Datos**
  - [ ] Exportar metadata de WordPress
  - [ ] Transformar a JSON compatible
  - [ ] Script de importación a Neon
  - [ ] Validación de integridad

- [ ] **Testing**
  - [ ] Tests unitarios endpoints
  - [ ] Tests de performance
  - [ ] Tests de seguridad
  - [ ] Tests de integridad de datos

- [ ] **Deployment**
  - [ ] Deploy backend
  - [ ] Deploy frontend
  - [ ] Monitoreo
  - [ ] Rollback plan


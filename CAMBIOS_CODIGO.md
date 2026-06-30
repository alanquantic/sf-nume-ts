# 🔧 Cambios de Código: De WordPress a Neon

## 📁 Archivos que Necesitarán Cambios

```
src/api/
├─ axios.ts                  ✅ (Cambio: baseURL)
├─ useConsultant.ts         ❌ (Reescribir completamente)
├─ useProfileUpdate.ts       ✅ (Cambio: endpoint)
├─ useGuestEnergy.ts        ✅ (Cambio: endpoint)
├─ react-query.ts           ✅ (Mantener - es bueno)
├─ consultantAPI.ts         ✨ (NUEVO - falta crear)
└─ partnerAPI.ts            ✨ (NUEVO - falta crear)

src/context/
├─ AuthProvider.tsx         ✅ (Cambio: endpoints login/me)
├─ ConsultProvider.tsx       ✅ (Cambio: cargar consultants lazy)
└─ ConsultContext.tsx       ✅ (Cambio menor)

src/hooks/
├─ useConsultants.ts        ✅ (Cambio: hooks de API)
└─ useConsult.ts            ✅ (Cambio: lógica de carga)
```

---

## 📝 ANTES vs. DESPUÉS

### 1️⃣ axios.ts

#### ANTES ❌
```typescript
import Axios, { AxiosRequestConfig } from 'axios';
import env from '@/utils/constants';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL: env.VITE_API_URL,  // ← WordPress URL
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;
```

#### DESPUÉS ✅
```typescript
import Axios, { AxiosRequestConfig } from 'axios';
import env from '@/utils/constants';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;  // ← Sigue igual
  }
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL: env.VITE_API_URL,  // ← Cambiar a URL del backend Node.js
  // Ejemplo: env.VITE_API_URL = "http://localhost:3000/api"
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;
```

**Cambios en .env:**
```env
# ANTES
VITE_API_URL=https://midominio.com/wp-json

# DESPUÉS
VITE_API_URL=https://backend.midominio.com/api
# o en desarrollo:
VITE_API_URL=http://localhost:3000/api
```

---

### 2️⃣ useConsultant.ts - 🔴 REESCRIBIR COMPLETAMENTE

#### ANTES ❌
```typescript
import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';

async function postConsultants(consultants: Api.Consultant[]) { // ❌ MALO
  const res = await axios.post('/wp-json/app/v1/u', consultants); // Envía TODO
  return res;
}

const makeConsultant = makeMutation(
  ['add-consultant'], 
  postConsultants, 
  ['auth-user']
);

export default makeConsultant;
```

#### DESPUÉS ✅
```typescript
import axios from '@/api/axios';
import makeMutation from '@/hooks/makeMutation';
import { MutationConfig } from '@/api/react-query';

// CREATE - POST /api/v2/consultants
async function createConsultant(data: Omit<Api.Consultant, 'id'>) {
  const res = await axios.post('/v2/consultants', data);
  return res;
}

// UPDATE - PUT /api/v2/consultants/:id
async function updateConsultant({ 
  id, 
  data 
}: { 
  id: string; 
  data: Partial<Api.Consultant> 
}) {
  const res = await axios.put(`/v2/consultants/${id}`, data);
  return res;
}

// DELETE - DELETE /api/v2/consultants/:id
async function deleteConsultant(id: string) {
  const res = await axios.delete(`/v2/consultants/${id}`);
  return res;
}

// Exports de mutations
export const makeCreateConsultant = makeMutation(
  ['create-consultant'],
  createConsultant,
  ['consultants', 'auth-user'] // Invalidar estas queries
);

export const makeUpdateConsultant = makeMutation(
  ['update-consultant'],
  updateConsultant,
  ['consultants', 'auth-user']
);

export const makeDeleteConsultant = makeMutation(
  ['delete-consultant'],
  deleteConsultant,
  ['consultants', 'auth-user']
);

export default {
  makeCreateConsultant,
  makeUpdateConsultant,
  makeDeleteConsultant,
};
```

---

### 3️⃣ AuthProvider.tsx - Actualizar Login

#### ANTES ❌
```typescript
const getUser = (): Promise<Api.UserResponse> => 
  axios.post('/wp-json/app/v3/auth/me');  // ❌ POST para GET

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    const isExpired = isBefore(data.license.expirationDate, new Date());
    if ((data.license.status as unknown as string) === 'expired' || isExpired) {
      storage.clearToken();
      window.location.assign(window.location.origin as unknown as string);
      return null;
    }
    return data;  // ❌ Retorna TODO (incluyendo consultants)
  }
  return null as unknown as Api.UserResponse;
}

const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<Api.UserResponse> => 
  axios.post('/wp-json/app/v3/auth/login', data);
```

#### DESPUÉS ✅
```typescript
// Cambiar a endpoints modernos
const getUser = (): Promise<Api.UserResponse> => 
  axios.get('/v2/auth/me');  // ✅ GET correcto

async function loadUser() {
  if (storage.getToken()) {
    try {
      const data = await getUser();
      const isExpired = isBefore(data.license.expirationDate, new Date());
      if ((data.license.status as unknown as string) === 'expired' || isExpired) {
        storage.clearToken();
        window.location.assign(window.location.origin as unknown as string);
        return null;
      }
      // ✅ Aquí NO viene consultants (se cargan por separado)
      return data;
    } catch (error) {
      storage.clearToken();
      throw error;
    }
  }
  return null as unknown as Api.UserResponse;
}

const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<Api.UserResponse> => 
  axios.post('/v2/auth/login', data);

// En la función loginFn, después de handleUserResponse:
async function loginFn(data: LoginCredentialsDTO) {
  try {
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    // ✅ No cargar consultants aquí, se cargan en ConsultProvider
    return user;
  } catch (error) {
    handleAuthError(error);
    return null;
  }
}
```

---

### 4️⃣ ConsultProvider.tsx - Lazy Loading

#### ANTES ❌
```typescript
const selectConsultant = useCallback((newConsultant: Api.Consultant) => {
  if (!newConsultant) throw new Error('consultant is required');

  const newConsultantPerson = new Person({
    id: newConsultant.id || '',
    name: sanitizeName(newConsultant.names || ''),
    lastName: sanitizeName(newConsultant.lastName || ''),
    scdLastName: sanitizeName(newConsultant.scdLastName || ''),
    birthDate: newConsultant.date?.toString() || '',
  });
  setConsultant(newConsultantPerson);
  setActiveConsultant(newConsultant);

  // Cargar datos que ya vienen del servidor (metadata)
  setPartnersAvailable(newConsultant.partner as Api.Partner[] || []);
  setPartnerDataAvailable(newConsultant.partnerData || []);
  setGroupsAvailable(newConsultant.groupData || []);

  const action = { type: types.selectConsultant, consultant: newConsultant };
  dispatch(action);
}, [dispatch]);
```

#### DESPUÉS ✅
```typescript
// Hook para cargar consultants
const { data: consultants = [] } = useQuery(
  ['consultants'],
  () => axios.get('/v2/consultants'),
  { enabled: !!user } // Solo carga si hay usuario logueado
);

// Hook para cargar detalle de consultant
const { data: consultantDetail } = useQuery(
  ['consultant', activeConsultant?.id],
  () => axios.get(`/v2/consultants/${activeConsultant?.id}`),
  { enabled: !!activeConsultant?.id } // Solo carga si hay consultant seleccionado
);

const selectConsultant = useCallback((newConsultant: Api.Consultant) => {
  if (!newConsultant) throw new Error('consultant is required');

  const newConsultantPerson = new Person({
    id: newConsultant.id || '',
    name: sanitizeName(newConsultant.names || ''),
    lastName: sanitizeName(newConsultant.lastName || ''),
    scdLastName: sanitizeName(newConsultant.scdLastName || ''),
    birthDate: newConsultant.date?.toString() || '',
  });
  setConsultant(newConsultantPerson);
  setActiveConsultant(newConsultant);
  
  // ✅ Datos se cargan automáticamente por useQuery
  // No establecer aquí, se cargarán en consultantDetail

  const action = { type: types.selectConsultant, consultant: newConsultant };
  dispatch(action);
}, [dispatch]);

// Cuando consultantDetail carga, actualizar estado
useEffect(() => {
  if (consultantDetail) {
    setPartnersAvailable(consultantDetail.partners || []);
    setPartnerDataAvailable(consultantDetail.partnerData || []);
    setGroupsAvailable(consultantDetail.groupData || []);
  }
}, [consultantDetail]);
```

---

### 5️⃣ useConsultants.ts - Hook Actualizado

#### ANTES ❌
```typescript
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';

const useConsultants = () => {
  const { user } = useAuth();
  const { selectConsultant } = useConsult();
  
  // ❌ Consultants vienen ya en user (cargados en login)
  const consultants = user?.consultants ?? [];

  const addConsultant = (newConsultant: Api.Consultant): Api.Consultant[] => {
    selectConsultant(newConsultant);
    return [...consultants, newConsultant];  // ❌ Actualiza localmente
  };

  const removeConsultant = (consultantId: string): Api.Consultant[] => 
    consultants.filter((consultant) => consultant?.id !== consultantId);

  const updateConsultant = (consultantId: string, newConsultant: Api.Consultant): Api.Consultant[] => {
    const updatedConsultants = consultants.map((consultant) => {
      if (consultant?.id === consultantId) {
        return newConsultant;
      }
      return consultant;
    });
    return updatedConsultants;  // ❌ Actualiza localmente
  };

  return {
    consultants,
    addConsultant,
    removeConsultant,
    updateConsultant,
  };
};

export default useConsultants;
```

#### DESPUÉS ✅
```typescript
import { useAuth } from '@/context/AuthProvider';
import useConsult from '@/hooks/useConsult';
import { useQuery, useMutation } from 'react-query';
import axios from '@/api/axios';
import { queryClient } from '@/api/react-query';

const useConsultants = () => {
  const { user } = useAuth();
  const { selectConsultant } = useConsult();
  
  // ✅ Cargar consultants del servidor
  const { data: consultants = [], isLoading, refetch } = useQuery(
    ['consultants'],
    () => axios.get('/v2/consultants'),
    { enabled: !!user }
  );

  // CREATE Mutation
  const addConsultantMutation = useMutation(
    (newConsultant: Omit<Api.Consultant, 'id'>) =>
      axios.post('/v2/consultants', newConsultant),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['consultants']);
      },
    }
  );

  const addConsultant = async (newConsultant: Omit<Api.Consultant, 'id'>) => {
    const response = await addConsultantMutation.mutateAsync(newConsultant);
    selectConsultant(response);
    return response;
  };

  // DELETE Mutation
  const removeConsultantMutation = useMutation(
    (consultantId: string) =>
      axios.delete(`/v2/consultants/${consultantId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['consultants']);
      },
    }
  );

  const removeConsultant = (consultantId: string) => {
    return removeConsultantMutation.mutateAsync(consultantId);
  };

  // UPDATE Mutation
  const updateConsultantMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<Api.Consultant> }) =>
      axios.put(`/v2/consultants/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['consultants']);
      },
    }
  );

  const updateConsultant = (
    consultantId: string,
    newConsultant: Partial<Api.Consultant>
  ) => {
    return updateConsultantMutation.mutateAsync({
      id: consultantId,
      data: newConsultant,
    });
  };

  return {
    consultants,
    isLoading,
    addConsultant,
    removeConsultant,
    updateConsultant,
    refetch,
  };
};

export default useConsultants;
```

---

### 6️⃣ Componentes que Usan Consultants

#### ANTES ❌ - ConsultantPicker.tsx
```typescript
import useConsultants from '@/hooks/useConsultants';

export default function ConsultantPicker() {
  const { consultants, updateConsultant } = useConsultants();
  
  const handleUpdate = async (id: string, data: any) => {
    // ❌ Actualizar array localmente
    const updated = updateConsultant(id, data);
    // El array local se actualiza pero no se sincroniza con servidor
  };

  return (
    <div>
      {consultants.map((c) => (
        <div key={c.id}>{c.names}</div>
      ))}
    </div>
  );
}
```

#### DESPUÉS ✅ - ConsultantPicker.tsx
```typescript
import useConsultants from '@/hooks/useConsultants';
import toast from 'react-hot-toast';

export default function ConsultantPicker() {
  const { consultants, isLoading, updateConsultant } = useConsultants();
  
  const handleUpdate = async (id: string, data: any) => {
    try {
      // ✅ Llamar mutation que:
      // 1. Actualiza en servidor (PUT)
      // 2. Invalida query
      // 3. Re-fetcha automáticamente
      await updateConsultant(id, data);
      toast.success('Consultant actualizado');
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      {consultants.map((c) => (
        <div key={c.id}>{c.names}</div>
      ))}
    </div>
  );
}
```

---

## 🆕 Nuevos Archivos a Crear

### src/api/consultantAPI.ts
```typescript
import axios from '@/api/axios';
import { MutationConfig, QueryConfig } from '@/api/react-query';

// ============ CONSULTANTS ============
export async function createConsultant(data: Omit<Api.Consultant, 'id'>) {
  return axios.post('/v2/consultants', data);
}

export async function getConsultants() {
  return axios.get('/v2/consultants');
}

export async function getConsultantDetail(id: string) {
  return axios.get(`/v2/consultants/${id}`);
}

export async function updateConsultant({
  id,
  data,
}: {
  id: string;
  data: Partial<Api.Consultant>;
}) {
  return axios.put(`/v2/consultants/${id}`, data);
}

export async function deleteConsultant(id: string) {
  return axios.delete(`/v2/consultants/${id}`);
}

// ============ PARTNERS ============
export async function createPartner({
  consultantId,
  data,
}: {
  consultantId: string;
  data: Omit<Api.Partner, 'id'>;
}) {
  return axios.post(`/v2/consultants/${consultantId}/partners`, data);
}

export async function getPartners(consultantId: string) {
  return axios.get(`/v2/consultants/${consultantId}/partners`);
}

export async function updatePartner({
  consultantId,
  partnerId,
  data,
}: {
  consultantId: string;
  partnerId: string;
  data: Partial<Api.Partner>;
}) {
  return axios.put(
    `/v2/consultants/${consultantId}/partners/${partnerId}`,
    data
  );
}

export async function deletePartner({
  consultantId,
  partnerId,
}: {
  consultantId: string;
  partnerId: string;
}) {
  return axios.delete(
    `/v2/consultants/${consultantId}/partners/${partnerId}`
  );
}

// ============ GROUPS ============
export async function createGroup({
  consultantId,
  data,
}: {
  consultantId: string;
  data: Omit<Api.GroupData, 'id'>;
}) {
  return axios.post(`/v2/consultants/${consultantId}/groups`, data);
}

export async function getGroups(consultantId: string) {
  return axios.get(`/v2/consultants/${consultantId}/groups`);
}

export async function updateGroup({
  consultantId,
  groupId,
  data,
}: {
  consultantId: string;
  groupId: string;
  data: Partial<Api.GroupData>;
}) {
  return axios.put(
    `/v2/consultants/${consultantId}/groups/${groupId}`,
    data
  );
}

export async function deleteGroup({
  consultantId,
  groupId,
}: {
  consultantId: string;
  groupId: string;
}) {
  return axios.delete(`/v2/consultants/${consultantId}/groups/${groupId}`);
}
```

### src/hooks/useConsultantAPI.ts
```typescript
import { useQuery, useMutation } from 'react-query';
import { queryClient } from '@/api/react-query';
import * as consultantAPI from '@/api/consultantAPI';

// ============ CONSULTANTS QUERIES ============
export function useConsultants() {
  return useQuery(
    ['consultants'],
    consultantAPI.getConsultants
  );
}

export function useConsultantDetail(id: string) {
  return useQuery(
    ['consultant', id],
    () => consultantAPI.getConsultantDetail(id),
    { enabled: !!id }
  );
}

// ============ CONSULTANTS MUTATIONS ============
export function useCreateConsultant() {
  return useMutation(
    (data: Omit<Api.Consultant, 'id'>) =>
      consultantAPI.createConsultant(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['consultants']);
      },
    }
  );
}

export function useUpdateConsultant() {
  return useMutation(
    ({ id, data }: { id: string; data: Partial<Api.Consultant> }) =>
      consultantAPI.updateConsultant({ id, data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['consultants']);
      },
    }
  );
}

export function useDeleteConsultant() {
  return useMutation(
    (id: string) => consultantAPI.deleteConsultant(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['consultants']);
      },
    }
  );
}

// ============ PARTNERS QUERIES ============
export function usePartners(consultantId: string) {
  return useQuery(
    ['partners', consultantId],
    () => consultantAPI.getPartners(consultantId),
    { enabled: !!consultantId }
  );
}

// ============ PARTNERS MUTATIONS ============
export function useCreatePartner() {
  return useMutation(
    ({
      consultantId,
      data,
    }: {
      consultantId: string;
      data: Omit<Api.Partner, 'id'>;
    }) => consultantAPI.createPartner({ consultantId, data }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries([
          'partners',
          variables.consultantId,
        ]);
        queryClient.invalidateQueries(['consultant', variables.consultantId]);
      },
    }
  );
}

export function useUpdatePartner() {
  return useMutation(
    ({
      consultantId,
      partnerId,
      data,
    }: {
      consultantId: string;
      partnerId: string;
      data: Partial<Api.Partner>;
    }) => consultantAPI.updatePartner({ consultantId, partnerId, data }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries([
          'partners',
          variables.consultantId,
        ]);
      },
    }
  );
}

export function useDeletePartner() {
  return useMutation(
    ({
      consultantId,
      partnerId,
    }: {
      consultantId: string;
      partnerId: string;
    }) => consultantAPI.deletePartner({ consultantId, partnerId }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries([
          'partners',
          variables.consultantId,
        ]);
      },
    }
  );
}

// Similar para Groups, CreatedNames, etc...
```

---

## 📊 Resumen de Cambios

| Archivo | Cambio | Complejidad |
|---------|--------|-------------|
| `axios.ts` | baseURL | ⭐ Trivial |
| `useConsultant.ts` | Reescribir | ⭐⭐⭐ Alto |
| `AuthProvider.tsx` | endpoints | ⭐⭐ Medio |
| `ConsultProvider.tsx` | lazy loading | ⭐⭐ Medio |
| `useConsultants.ts` | hooks React Query | ⭐⭐⭐ Alto |
| Componentes | usar mutations | ⭐⭐ Medio |
| `consultantAPI.ts` | NUEVO | ⭐⭐ Medio |
| `useConsultantAPI.ts` | NUEVO | ⭐⭐ Medio |

---

## ⚡ Orden de Implementación Recomendado

1. **Backend primero** ✅
   - Setup Node.js + Express
   - Crear endpoints CRUD
   - Autenticación JWT
   - Validación

2. **Backend testing** ✅
   - Tests con Postman/Thunder
   - Validar todos los endpoints

3. **Frontend - Cambios Críticos** 🔴
   - `axios.ts` - cambiar baseURL
   - `AuthProvider.tsx` - endpoints login/me
   - `consultantAPI.ts` - CREAR nuevo archivo

4. **Frontend - Refactor Hooks** 🟡
   - `useConsultants.ts` - usar React Query
   - `useConsultantAPI.ts` - CREAR nuevo archivo

5. **Frontend - Componentes** 🟢
   - Actualizar componentes que usan consultants
   - Cambiar de estado local a mutations

6. **Testing** ✅
   - Probar flujo completo
   - Performance
   - Error handling


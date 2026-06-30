# Resumen de Conversacion y Estado de la Migracion

## Objetivo de esta conversacion

Entender la arquitectura actual del frontend, compararla con la observacion inicial del sistema, validar el nuevo contrato del backend y comenzar la migracion del frontend para que deje de depender de WordPress como fuente principal de datos de negocio.

---

## 1. Hallazgos sobre la arquitectura actual

### Observacion inicial validada parcialmente

La observacion inicial fue:

- la app usa state para guardar consultantes, notas, guests, partners y groups

### Lo que se confirmo en el codigo

Eso es cierto en parte, pero no como un solo estado centralizado.

La arquitectura actual esta repartida en varias capas:

- `AuthProvider`
  - carga el usuario autenticado desde WordPress
  - hoy recibe tambien `consultants`, `guests`, `license`, `company`, `app_version`
- `ConsultProvider`
  - maneja seleccion activa y estado derivado del consultante
  - fechas de calculo
  - `partnerData`, `groupData`, `activePartner`, `activeGroup`
- `EnergyProvider`
  - maneja `guestEnergy`
  - construye los objetos de invitado para pareja y grupo

### Conclusion tecnica

No existia un solo state que guardara todo.

La fuente real de verdad estaba mezclada entre:

- payload de autenticacion de WordPress
- estado derivado en contextos React
- mutaciones que enviaban arreglos completos de consultantes

---

## 2. Confirmaciones importantes sobre el sistema actual

### Dependencia del usuario

Se confirmo que, a nivel de persistencia actual:

- `consultants` y `guests` venian ligados al usuario autenticado
- `notes`, `partnerData` y `groupData` residian dentro de cada `consultant`

### Uso de WordPress

Se confirmo que:

- `AuthProvider` consumia directamente endpoints de WordPress
- login actual:
  - `POST /wp-json/app/v3/auth/login`
- sesion persistente actual:
  - `POST /wp-json/app/v3/auth/me`

### Riesgo de la arquitectura actual

Se concluyo que guardar datos de negocio sensibles en metadata de usuario de WordPress:

- puede funcionar para un MVP
- no es ideal a largo plazo
- no es lo mejor para seguridad, concurrencia, escalabilidad ni mantenibilidad

Problemas principales:

- carga excesiva en login
- sobreescritura de arreglos completos
- falta de relaciones reales
- dificultad de evolucionar CRUD granular
- datos sensibles de terceros dentro de metadata de WordPress

---

## 3. Analisis de los documentos del backend

Se revisaron dos archivos externos:

- `FRONTEND_MIGRATION_GUIDE.md`
- `FRONTEND_API_CONTRACT.md`

### Lo que quedo claro del backend nuevo

WordPress queda solo para:

- validar login
- devolver `license`
- devolver `app_version`

El backend nuevo en TypeScript + Express + Prisma + Neon sera la fuente principal para:

- usuarios
- consultores
- create names
- partner data
- group data
- notes
- guest energy

### Decisiones funcionales importantes confirmadas

#### `auth/me`

Se discutio si `auth/me` debia devolver solo `license` y `app_version`.

Decision final:

- `auth/me` debe devolver tambien `user.id`

Motivo:

- el frontend necesita `userId` para pedir recursos como:
  - `GET /consultants/user/:userId`
  - `GET /users/:userId/guest-energy`

#### Sinastria

Se confirmo explicitamente que:

- toda la sinastria ya reside en `partnerData[].partner[]`
- el campo top-level `partner` o `partners` en `Consultant` es legacy
- ese campo ya no debe ser la fuente real de verdad

#### Notes

Se confirmo que:

- `notes` ya es tabla propia en el backend
- puede venir como relacion anidada al pedir `Consultant`
- tambien existe como subrecurso REST

#### Guest Energy

Se confirmo que:

- `guestEnergy` pertenece al `User`
- no pertenece al `Consultant`

---

## 4. Decisiones de arquitectura tomadas para el frontend

### AuthProvider nuevo

Se decidio que `AuthProvider` debe manejar solo sesion:

- `token`
- `user`
- `license`
- `app_version`
- mapeo de `company` desde el usuario local del backend

No debe volver a ser la fuente de:

- `consultants`
- `guests`
- `notes`
- `partnerData`
- `groupData`

### Modelo objetivo de frontend

Se definio esta separacion:

- `AuthProvider`
  - sesion
- `useConsultants` / queries de consultantes
  - negocio de consultantes
- `EnergyProvider`
  - guest energy del usuario
- `ConsultProvider`
  - solo seleccion activa y estado derivado UI/calculo

### Contrato deseado de `auth/me`

Se acordo que el shape ideal es:

```json
{
  "user": {
    "id": 1
  },
  "license": {
    "id": 2,
    "status": "active",
    "expirationDate": "2028-10-31",
    "licenseId": "425"
  },
  "app_version": "3.0.6"
}
```

Y si el backend quiere, puede incluir mas datos base del usuario local.

---

## 5. Trabajo ya realizado en el frontend

Ya se comenzo la migracion en la capa de autenticacion.

### Archivo modificado: `src/api.d.ts`

Se agregaron tipos nuevos para alinearlo con el backend nuevo:

- `LicenseStatus`
- `AuthUser`
- `License`
- `AuthSession`
- `LoginResponse`
- `MeResponse`
- `FrontendSession`
- `GuestEnergy`
- `GuestRecord`
- `GuestPartnerRecord`
- `GuestGroupMemberRecord`
- `Note`

Tambien se dejo compatibilidad temporal para no romper de golpe:

- `company`
- `consultants`
- `guests`
- campo legacy `partner` dentro de `Consultant`

### Archivo modificado: `src/context/AuthProvider.tsx`

Se refactorizo para:

- usar `POST /auth/login`
- usar `GET /auth/me`
- normalizar sesion al shape `FrontendSession`
- derivar `company` desde:
  - `companyName`
  - `companyDirection`
  - `companyPhone`
  - `companyWebsite`
  - `companyLogo`
- manejar expiracion de licencia
- dejar defaults temporales vacios para:
  - `consultants`
  - `guests`

### Estado actual despues de este cambio

La sesion ya no depende del contrato viejo de WordPress.

Pero todavia existe compatibilidad temporal porque el resto de la app sigue esperando:

- `user.consultants`
- `user.guests`

---

## 6. Validaciones y limitaciones encontradas

### Validacion realizada

Se hizo revision de referencias y compatibilidad de tipos.

### Limitacion tecnica actual

No se pudo correr `npm run lint` porque en este entorno:

- `eslint` no esta disponible

Error observado:

- `"eslint" no se reconoce como un comando interno o externo`

Eso significa que la validacion fue:

- estatica
- por inspeccion de referencias
- no por lint completo ni typecheck real

---

## 7. Lo que falta por hacer

### Fase inmediata siguiente

#### 1. Migrar `useConsultants`

Hoy sigue leyendo:

- `useAuth().user.consultants`

Debe cambiar para usar endpoints reales:

- `GET /consultants/user/:userId`
- `POST /consultants`
- `PUT /consultants/:id`
- `DELETE /consultants/:id`

#### 2. Refactorizar `ConsultProvider`

Debe dejar de asumir que:

- el auth payload trae `consultants`
- la sinastria sale de `activeConsultant.partner`

Debe pasar a usar:

- `activeConsultant.partnerData`
- `activePartnerData.partner[]`

#### 3. Migrar `EnergyProvider`

Hoy depende de:

- `useAuth().user.guests`

Debe cambiar para usar:

- `GET /users/:userId/guest-energy`
- endpoints separados para:
  - partners invitados
  - miembros de grupo invitados

#### 4. Migrar notes

Hoy muchas pantallas siguen pensando en notas como estructura heredada.

Debe decidirse si:

- se adapta el frontend para trabajar directamente con `Note[]`
- o se hace una funcion mapper para convertir entre:
  - `Note[]`
  - `NotesByDate`

#### 5. Migrar profile/settings

Hoy el perfil sigue pegando a WordPress:

- `POST /wp-json/app/v1/p`

Debe migrarse a backend nuevo:

- `PUT /users/:id`

#### 6. Quitar compatibilidad temporal legacy

Cuando ya esten migrados consultantes y guest energy, se debe retirar:

- `consultants: []` temporal en `AuthProvider`
- `guests` temporales en `AuthProvider`
- `partner` legacy en `Consultant`

---

## 8. Resumen ejecutivo final

### Ya se resolvio

- entender la arquitectura actual
- separar sesion vs negocio
- confirmar que `auth/me` debe incluir `user.id`
- confirmar que la sinastria real vive en `partnerData[].partner[]`
- confirmar que `guestEnergy` pertenece al usuario
- iniciar la migracion real del frontend en:
  - tipos
  - `AuthProvider`

### Esta pendiente

- mover `consultants` fuera de auth
- mover `guestEnergy` fuera de auth
- migrar `notes`
- migrar `profile/settings`
- refactorizar `ConsultProvider`
- reemplazar mutaciones legacy que hoy mandan arreglos completos

### Estado actual del proyecto

La sesion ya comenzo a alinearse con el backend nuevo, pero el dominio de negocio todavia sigue acoplado parcialmente al modelo viejo.

La siguiente etapa debe enfocarse en desacoplar:

- `consultants`
- `guestEnergy`
- `notes`

del `AuthProvider`, para que la app quede realmente orientada al backend nuevo.

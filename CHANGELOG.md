# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [3.0.2] - 2026-02-11

### Corregido
- Corrección en la edad de relación en la tabla del destino de pareja: ahora muestra los años desde que se conocieron correctamente

### Añadido
- Sección de registro de cambios en la página de configuración para ver las novedades de cada versión
- El mes seleccionado en el calendario mensual ahora se guarda correctamente al generar reportes PDF

---

## [3.0.1] - 2026-01-28

### Añadido
- **Sincronización de mes seleccionado para reportes PDF**: Implementada funcionalidad para guardar el mes seleccionado en el componente `SingleMonth` y utilizarlo al generar reportes PDF desde el Navbar.
  - Agregado `selectedMonthReport` al contexto `ConsultContext` y `ConsultProvider`
  - Implementada inicialización automática de `selectedMonthReport` con el mes actual cuando el valor es 0
  - Actualizado `SingleMonth.tsx` para sincronizar el mes seleccionado con el contexto global
  - Modificado `Navbar.tsx` para usar `selectedMonthReport` al generar reportes PDF en lugar de `calculationDate.month`
  - Agregado `useEffect` en `ConsultProvider` para inicializar `selectedMonthReport` con el mes actual
  - Agregado `useEffect` en `SingleMonth` para sincronizar el estado local con el contexto cuando cambia `selectedMonthReport`

### Cambiado
- **ConsultProvider.tsx**: 
  - Agregado `selectedMonthReport` y `setSelectedMonthReport` a las dependencias del `useMemo` del contexto
  - Agregado `useEffect` para inicializar `selectedMonthReport` con `calculationDate.month` cuando es 0
  
- **Navbar.tsx**:
  - Modificado `printReportPreview` para usar `selectedMonthReport || calculationDate.month` en lugar de solo `calculationDate.month`
  - Actualizado objeto de validación de PDF para usar `selectedMonthReport || calculationDate.month`

- **SingleMonth.tsx**:
  - Agregado `selectedMonthReport` del contexto usando `useConsult()`
  - Inicializado `selectedMonth` con `selectedMonthReport || month` para sincronizar con el contexto
  - Agregado `useEffect` para sincronizar `selectedMonth` cuando cambia `selectedMonthReport` en el contexto
  - Mejorada la lógica para usar `personalMonth.month` en lugar de `selectedMonth` directamente cuando `showMonthSelector` es false

### Corregido
- **Corrección del número maestro en el reporte personal de creación de nombre**: Se corrigió el cálculo del número maestro en el reporte de creación de nombre personal.
- **Corrección en los cálculos de los meses personales**: Se corrigieron los cálculos de los meses personales para asegurar precisión en los reportes.

### Técnico
- Agregado import de `useEffect` en `ConsultProvider.tsx`
- Agregado import de `useEffect` en `SingleMonth.tsx`
- Mejorada la sincronización de estado entre componentes locales y contexto global

---

## Formato de Versiones

- **[MAYOR.MENOR.PARCHE]** - Cambios que rompen compatibilidad, nuevas funcionalidades importantes, o correcciones de seguridad
- **Añadido**: Para nuevas funcionalidades
- **Cambiado**: Para cambios en funcionalidades existentes
- **Deprecado**: Para funcionalidades que serán eliminadas en futuras versiones
- **Eliminado**: Para funcionalidades eliminadas
- **Corregido**: Para corrección de bugs
- **Seguridad**: Para vulnerabilidades

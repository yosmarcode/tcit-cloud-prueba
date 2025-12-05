# Instrucciones para Configurar la Base de Datos

Este documento explica cómo usar el script `schema.sql` para crear la base de datos y las tablas necesarias para el proyecto TCIT Cloud Prueba.

## Requisitos Previos

- PostgreSQL instalado (versión 12 o superior recomendada)
- Acceso a un usuario con permisos para crear bases de datos (por defecto: `postgres`)

## Opción 1: Usando pgAdmin

1. Abrir **pgAdmin**
2. Conectarse al servidor PostgreSQL
3. Click derecho en "Databases" → "Create" → "Database..."
4. Nombre: `tcit-cloud-prueba`
5. Owner: `postgres`
6. Click en "Save"
7. Click derecho en la base de datos recién creada → "Query Tool"
8. Abrir el archivo `schema.sql` (File → Open o Ctrl+O)
9. Ejecutar el script completo (F5 o botón ▶️)

## Opción 2: Usando la Línea de Comandos (psql)

### Paso 1: Crear la Base de Datos

```bash
# Conectarse a PostgreSQL como usuario postgres
psql -U postgres

# Crear la base de datos
CREATE DATABASE "tcit-cloud-prueba";

# Salir de psql
\q
```

### Paso 2: Ejecutar el Script de Schema

```bash
# Ejecutar el script completo
psql -U postgres -d tcit-cloud-prueba -f database/schema.sql
```

O alternativamente:

```bash
# Conectarse a la base de datos
psql -U postgres -d tcit-cloud-prueba

# Ejecutar el script desde psql
\i database/schema.sql

# Salir
\q
```

## Opción 3: Usando DBeaver u otro Cliente SQL

1. Crear una nueva conexión a PostgreSQL
2. Conectarse al servidor
3. Click derecho en "Databases" → "Create New Database"
4. Nombre: `tcit-cloud-prueba`
5. Abrir el archivo `schema.sql`
6. Ejecutar el script completo

## Verificación de la Instalación

Después de ejecutar el script, verifica que todo se haya creado correctamente:

```sql
-- Verificar que la tabla existe
SELECT * FROM public."Contacts";

-- Ver la estructura de la tabla
\d public."Contacts"

-- O usando SQL estándar:
SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'Contacts'
ORDER BY ordinal_position;
```

## Estructura de la Tabla Contacts

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL (INTEGER) | Identificador único autoincremental |
| `name` | VARCHAR(255) | Nombre del contacto (requerido) |
| `descriptions` | TEXT | Descripción o detalles del contacto (requerido) |
| `created_at` | TIMESTAMP WITH TIME ZONE | Fecha de creación (automático) |
| `updated_at` | TIMESTAMP WITH TIME ZONE | Fecha de última actualización (automático) |

## Características Adicionales

### Índices
- **idx_contacts_name**: Índice en el campo `name` para búsquedas rápidas
- **idx_contacts_name_lower**: Índice para búsquedas case-insensitive

### Triggers
- **update_contacts_updated_at**: Actualiza automáticamente el campo `updated_at` cada vez que se modifica un registro

## Datos de Ejemplo (Opcional)

Si deseas insertar datos de prueba, descomenta la sección 8 del archivo `schema.sql` o ejecuta:

```sql
INSERT INTO public."Contacts" (name, descriptions) VALUES 
    ('Juan Pérez', 'Cliente principal de la empresa'),
    ('María García', 'Proveedor de servicios de TI'),
    ('Carlos López', 'Contacto de soporte técnico'),
    ('Ana Martínez', 'Gerente de ventas'),
    ('Pedro Sánchez', 'Desarrollador freelance');
```

## Configuración de la Aplicación

Asegúrate de que el archivo de conexión (`server/src/conex/conex.js`) tenga la configuración correcta:

```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tcit-cloud-prueba',
  password: 'TU_CONTRASEÑA_AQUI', // Cambiar por la contraseña correcta
  port: 5432,
});
```

## Solución de Problemas

### Error: "database already exists"
Si la base de datos ya existe, puedes:
1. Eliminarla primero (⚠️ **CUIDADO**: esto borrará todos los datos)
   ```sql
   DROP DATABASE "tcit-cloud-prueba";
   ```
2. O simplemente ejecutar solo la parte de creación de tablas del script

### Error: "permission denied"
Asegúrate de tener permisos suficientes. Intenta ejecutar como usuario `postgres`:
```bash
psql -U postgres
```

### Error de conexión
Verifica que PostgreSQL esté corriendo:
```bash
# Windows
pg_ctl status

# Linux/Mac
sudo systemctl status postgresql
```

## Respaldo y Restauración

### Crear un respaldo
```bash
pg_dump -U postgres -d tcit-cloud-prueba -f backup.sql
```

### Restaurar desde un respaldo
```bash
psql -U postgres -d tcit-cloud-prueba -f backup.sql
```

## Contacto y Soporte

Si tienes problemas con la configuración, verifica:
1. Que PostgreSQL esté instalado y corriendo
2. Que las credenciales sean correctas
3. Que el puerto 5432 esté disponible
4. Que el firewall permita conexiones a PostgreSQL

-- ============================================
-- Script de Migraciones
-- Versión: 1.0.0
-- Fecha: 2025-12-05
-- ============================================

-- Este archivo documenta los cambios en el schema de la base de datos
-- Cada migración debe tener:
-- 1. Número de versión
-- 2. Descripción del cambio
-- 3. Script de actualización (UP)
-- 4. Script de reversión (DOWN)

-- ============================================
-- MIGRACIÓN 1.0.0 - Schema Inicial
-- Fecha: 2025-12-05
-- Descripción: Creación inicial de la tabla Contacts
-- ============================================

-- UP: Crear tabla Contacts
-- (Ya ejecutado en schema.sql)

-- DOWN: Revertir migración 1.0.0
-- DROP TABLE IF EXISTS public."Contacts" CASCADE;
-- DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- ============================================
-- MIGRACIÓN 1.1.0 - Ejemplo de migración futura
-- Fecha: TBD
-- Descripción: Agregar campo email a Contacts
-- ============================================

-- UP: Agregar campo email
-- ALTER TABLE public."Contacts" 
-- ADD COLUMN email VARCHAR(255);

-- DOWN: Revertir migración 1.1.0
-- ALTER TABLE public."Contacts" 
-- DROP COLUMN IF EXISTS email;

-- ============================================
-- MIGRACIÓN 1.2.0 - Ejemplo de migración futura
-- Fecha: TBD
-- Descripción: Agregar campo phone a Contacts
-- ============================================

-- UP: Agregar campo phone
-- ALTER TABLE public."Contacts" 
-- ADD COLUMN phone VARCHAR(50);

-- DOWN: Revertir migración 1.2.0
-- ALTER TABLE public."Contacts" 
-- DROP COLUMN IF EXISTS phone;

-- ============================================
-- INSTRUCCIONES DE USO
-- ============================================
-- 1. Para aplicar una migración, descomente la sección UP correspondiente
-- 2. Para revertir una migración, ejecute la sección DOWN correspondiente
-- 3. Siempre haga un backup antes de ejecutar migraciones en producción
-- 4. Documente cada cambio con fecha y descripción clara
-- 5. Mantenga este archivo actualizado con todas las migraciones

-- ============================================
-- VERSIÓN ACTUAL DEL SCHEMA
-- ============================================
-- Versión: 1.0.0
-- Última actualización: 2025-12-05

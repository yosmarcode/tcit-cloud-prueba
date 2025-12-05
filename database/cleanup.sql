-- ============================================
-- Script de Limpieza y Reset
-- CUIDADO: Este script eliminará TODOS los datos
-- ============================================

-- ⚠️ ADVERTENCIA: Este script borrará todos los datos de la tabla Contacts
-- Solo ejecutar si está seguro de querer eliminar toda la información

-- Opción 1: Eliminar todos los datos pero mantener la estructura
-- (Reinicia el contador de ID a 1)
TRUNCATE TABLE public."Contacts" RESTART IDENTITY CASCADE;

-- Opción 2: Eliminar la tabla completamente
-- DROP TABLE IF EXISTS public."Contacts" CASCADE;

-- Opción 3: Eliminar solo algunos registros (ejemplo)
-- DELETE FROM public."Contacts" WHERE id > 10;

-- Verificar que la tabla está vacía
SELECT COUNT(*) as total_registros FROM public."Contacts";

-- Mensaje de confirmación
SELECT 'Base de datos limpiada exitosamente' AS status;

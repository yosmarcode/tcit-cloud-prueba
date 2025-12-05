-- ============================================
-- Script de creación de Base de Datos
-- Proyecto: TCIT Cloud Prueba
-- Base de Datos: PostgreSQL
-- ============================================

-- ============================================
-- 1. CREACIÓN DE LA BASE DE DATOS
-- ============================================
-- NOTA: Ejecutar este comando conectado a la base de datos 'postgres' o cualquier otra base existente
-- Si la base de datos ya existe, puede omitir esta sección

-- Eliminar la base de datos si existe (CUIDADO: esto borrará todos los datos)
-- DROP DATABASE IF EXISTS "tcit-cloud-prueba";

-- Crear la base de datos
CREATE DATABASE "tcit-cloud-prueba"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "tcit-cloud-prueba"
    IS 'Base de datos para el proyecto TCIT Cloud Prueba';

-- ============================================
-- 2. CONECTARSE A LA BASE DE DATOS
-- ============================================
-- Después de crear la base de datos, conéctese a ella antes de ejecutar los siguientes comandos
-- \c "tcit-cloud-prueba"

-- ============================================
-- 3. CREACIÓN DEL SCHEMA PUBLIC (ya existe por defecto)
-- ============================================
-- El schema 'public' ya existe en PostgreSQL por defecto

-- ============================================
-- 4. CREACIÓN DE TABLAS
-- ============================================

-- Tabla: Contacts
-- Descripción: Almacena información de contactos
DROP TABLE IF EXISTS public."Contacts" CASCADE;

CREATE TABLE IF NOT EXISTS public."Contacts"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    descriptions TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comentarios de la tabla
COMMENT ON TABLE public."Contacts" IS 'Tabla que almacena los contactos del sistema';
COMMENT ON COLUMN public."Contacts".id IS 'Identificador único del contacto (autoincremental)';
COMMENT ON COLUMN public."Contacts".name IS 'Nombre del contacto';
COMMENT ON COLUMN public."Contacts".descriptions IS 'Descripción o detalles del contacto';
COMMENT ON COLUMN public."Contacts".created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN public."Contacts".updated_at IS 'Fecha y hora de última actualización del registro';

-- ============================================
-- 5. ÍNDICES
-- ============================================

-- Índice para búsquedas por nombre (mejora el rendimiento de búsquedas)
CREATE INDEX IF NOT EXISTS idx_contacts_name 
    ON public."Contacts" USING btree (name);

-- Índice para búsquedas case-insensitive por nombre
CREATE INDEX IF NOT EXISTS idx_contacts_name_lower 
    ON public."Contacts" USING btree (LOWER(name));

-- ============================================
-- 6. TRIGGERS (Opcional)
-- ============================================

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger que actualiza updated_at automáticamente en cada UPDATE
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public."Contacts";

CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public."Contacts"
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 7. PERMISOS (Opcional)
-- ============================================

-- Otorgar permisos al usuario postgres (ajustar según necesidades)
GRANT ALL PRIVILEGES ON TABLE public."Contacts" TO postgres;
GRANT USAGE, SELECT ON SEQUENCE public."Contacts_id_seq" TO postgres;

-- ============================================
-- 8. DATOS DE EJEMPLO (Opcional)
-- ============================================
-- Descomentar las siguientes líneas si desea insertar datos de prueba

-- INSERT INTO public."Contacts" (name, descriptions) VALUES 
--     ('Juan Pérez', 'Cliente principal de la empresa'),
--     ('María García', 'Proveedor de servicios de TI'),
--     ('Carlos López', 'Contacto de soporte técnico'),
--     ('Ana Martínez', 'Gerente de ventas'),
--     ('Pedro Sánchez', 'Desarrollador freelance');

-- ============================================
-- 9. VERIFICACIÓN
-- ============================================
-- Consulta para verificar que la tabla se creó correctamente
-- SELECT * FROM public."Contacts";

-- Consulta para verificar la estructura de la tabla
-- SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'Contacts'
-- ORDER BY ordinal_position;

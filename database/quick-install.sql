-- ============================================
-- Script Rápido de Instalación
-- Solo tablas (asume que la BD ya existe)
-- ============================================

-- Conectarse a la base de datos tcit-cloud-prueba antes de ejecutar

-- Crear tabla Contacts
CREATE TABLE IF NOT EXISTS public."Contacts"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    descriptions TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_contacts_name ON public."Contacts" (name);
CREATE INDEX IF NOT EXISTS idx_contacts_name_lower ON public."Contacts" (LOWER(name));

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public."Contacts";
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public."Contacts"
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Verificación
SELECT 'Tabla Contacts creada exitosamente' AS status;

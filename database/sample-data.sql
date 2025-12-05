-- ============================================
-- Script de Datos de Ejemplo
-- Inserta datos de prueba en la tabla Contacts
-- ============================================

-- NOTA: Ejecutar este script DESPUÉS de crear las tablas

-- Limpiar datos existentes (opcional - descomentar si desea empezar desde cero)
-- TRUNCATE TABLE public."Contacts" RESTART IDENTITY CASCADE;

-- Insertar datos de ejemplo
INSERT INTO public."Contacts" (name, descriptions) VALUES 
    ('Juan Pérez', 'Cliente principal de la empresa. Contacto directo para proyectos de gran escala.'),
    ('María García', 'Proveedor de servicios de TI. Especializada en infraestructura cloud.'),
    ('Carlos López', 'Contacto de soporte técnico. Disponible 24/7 para emergencias.'),
    ('Ana Martínez', 'Gerente de ventas. Responsable de la región sur.'),
    ('Pedro Sánchez', 'Desarrollador freelance. Experto en React y Node.js.'),
    ('Laura Fernández', 'Diseñadora UX/UI. Portfolio disponible en su sitio web.'),
    ('Roberto Torres', 'Consultor de seguridad informática. Certificaciones ISO 27001.'),
    ('Carmen Ruiz', 'Project Manager. Experiencia en metodologías ágiles.'),
    ('Diego Morales', 'Administrador de bases de datos. Especialista en PostgreSQL y MongoDB.'),
    ('Isabel Navarro', 'Analista de datos. Experta en Business Intelligence y Power BI.');

-- Verificar la inserción
SELECT COUNT(*) as total_contacts FROM public."Contacts";

-- Mostrar todos los contactos insertados
SELECT id, name, descriptions, created_at 
FROM public."Contacts" 
ORDER BY id;

-- Mensaje de confirmación
SELECT 'Datos de ejemplo insertados exitosamente' AS status;

<div align="center">

![TCIT Solutions](src/assets/bg-TCIT-SOLUCTIONS.png)

# TCIT Cloud Prueba

**Proyecto de prueba con React + TypeScript + Vite y backend Node.js con PostgreSQL**

</div>

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

### 1. Configurar la Base de Datos

```bash
# Opción A: Instalación completa (crea BD y tablas)
psql -U postgres -f database/schema.sql

# Opción B: Solo tablas (si la BD ya existe)
psql -U postgres -d tcit-cloud-prueba -f database/quick-install.sql

# Opción C: Agregar datos de ejemplo
psql -U postgres -d tcit-cloud-prueba -f database/sample-data.sql
```

📖 **Documentación detallada**: Ver [database/README.md](database/README.md)

### 2. Configurar el Backend

```bash
cd server
npm install
npm run dev
```

### 3. Configurar el Frontend

```bash
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
tcit-cloud-prueba/
├── database/           # Scripts SQL
│   ├── schema.sql     # Schema completo con BD
│   ├── quick-install.sql  # Solo tablas
│   ├── sample-data.sql    # Datos de ejemplo
│   └── README.md      # Documentación de BD
├── server/            # Backend Node.js
│   └── src/
│       ├── conex/     # Conexión a PostgreSQL
│       ├── controller/ # Controladores
│       └── routers/   # Rutas API
└── src/               # Frontend React
    └── core/
        └── components/ # Componentes UI
```

## 🗄️ Base de Datos

### Configuración de Conexión

Editar `server/src/conex/conex.js`:

```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tcit-cloud-prueba',
  password: 'TU_CONTRASEÑA',
  port: 5432,
});
```

### Tablas

- **Contacts**: Gestión de contactos
  - `id`: Identificador único
  - `name`: Nombre del contacto
  - `descriptions`: Descripción
  - `created_at`: Fecha de creación
  - `updated_at`: Fecha de actualización

## 🛠️ Stack Tecnológico

### Frontend
- React 18
- TypeScript
- Vite
- Redux Toolkit

### Backend
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)

## 📝 React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

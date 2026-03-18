# Link Tree Tesoreria

Mini portal web para mostrar enlaces operativos cargados desde NocoDB.

## Requisitos

- Node.js 20+
- npm

## Configuracion

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

1. Completa en `.env`:

- `VITE_NOCODB_TOKEN`
- `VITE_NOCODB_BASE_URL`
- `VITE_NOCODB_SOURCE_ID`
- `VITE_NOCODB_BASE_ID`
- `VITE_NOCODB_TABLE_ID`

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de produccion

```bash
npm run build
```

Genera los archivos estaticos en `dist/`.

## Despliegue con Docker

```bash
docker compose up --build -d
```

La app queda expuesta por el servicio web en el puerto interno `3000`.

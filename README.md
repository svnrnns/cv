# CV — Portfolio de Miguel Montesinos

Sitio web personal y currículum interactivo construido con [Next.js](https://nextjs.org) (App Router). Presenta la experiencia profesional en un timeline con soporte bilingüe (inglés y español), modo claro/oscuro y diseño responsive.

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd cv
```

2. Instala las dependencias:

```bash
npm install
```

3. Arranca el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Comando         | Descripción                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila la aplicación para producción          |
| `npm run start` | Sirve la build de producción                   |
| `npm run lint`  | Ejecuta ESLint sobre el código                 |

## Tecnologías

- **Next.js 16** — framework React con App Router y Server Components
- **React 19** — interfaz de usuario
- **TypeScript** — tipado estático
- **Tailwind CSS 4** — estilos utilitarios
- **next-themes** — alternancia entre tema claro y oscuro
- **lucide-react** — iconografía
- **canvas-confetti** — efectos visuales

## Internacionalización

El proyecto incluye un sistema de i18n propio con dos idiomas:

| Idioma  | Ruta  | Rol                          |
| ------- | ----- | ---------------------------- |
| Inglés  | `/`   | Idioma por defecto           |
| Español | `/es` | Idioma con prefijo en la URL |

La detección de idioma se basa en la cookie `locale`, el header `Accept-Language` y la ruta. El enrutamiento lo gestiona `src/proxy.ts`, que reescribe las peticiones y persiste la preferencia del usuario.

Las traducciones viven en `src/lib/i18n/translations/` (`en.json`, `es.json`). El contenido de cada puesto de trabajo se define en los JSON; las fechas y metadatos estructurales están en `src/features/cv/constants/cv-positions.ts`.

## Estructura de ficheros

```
cv/
├── public/                          # Assets estáticos servidos tal cual
│
├── src/
│   ├── app/                         # App Router de Next.js
│   │   ├── layout.tsx               # Layout raíz (fuentes, providers, controles fijos)
│   │   ├── page.tsx                 # Página principal (metadata + CvPage)
│   │   └── not-found.tsx            # Página 404
│   │
│   ├── components/                  # Componentes reutilizables de UI (botones, iconos, providers)
│   │
│   ├── features/
│   │   └── cv/                      # Dominio del currículum (secciones, timeline, puestos, hooks)
│   │
│   ├── lib/
│   │   ├── i18n/                    # Sistema de internacionalización (traducciones, routing, runtime)
│   │   ├── ui/                      # Utilidades de interfaz (p. ej. composición de clases CSS)
│   │   └── dates.ts                 # Formateo de fechas por locale
│   │
│   ├── styles/                      # Hojas de estilo globales
│   │   ├── main.css                 # Punto de entrada de estilos
│   │   ├── tailwind.css
│   │   ├── globals.css
│   │   └── animations.css
│   │
│   └── proxy.ts                     # Proxy de Next.js: enrutamiento i18n y cookies
│
├── next.config.ts                   # Configuración de Next.js
├── tsconfig.json                    # TypeScript (alias `@/*` → `./src/*`)
├── postcss.config.mjs               # PostCSS + Tailwind
├── eslint.config.mjs                # Reglas de linting
└── package.json
```

## Despliegue

Para generar una build de producción:

```bash
npm run build
npm run start
```

El proyecto está preparado para desplegarse en [Vercel](https://vercel.com) u otra plataforma compatible con Next.js.

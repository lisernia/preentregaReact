# La cocina de casa 🍽️

Aplicación web de comida casera desarrollada como trabajo integrador de React. Permite explorar un catálogo, elegir cantidades y armar un carrito con el resumen del pedido.

## Funcionalidades

- Catálogo y detalle de productos consultados desde Cloud Firestore; Inicio muestra los productos marcados como oferta.
- Gestión de productos: crear, listar, editar y eliminar, con validaciones y carga de imágenes mediante URL, ruta local o ImgBB.
- Gestión de cupones: crear, listar y eliminar códigos con un porcentaje de descuento.
- Presentación del equipo con datos de Firestore y mensajes de carga y error.
- Registro, inicio y cierre de sesión con Firebase Authentication; Gestión está reservada a administradores.
- Carrito con Context API: agregar, cambiar cantidades, eliminar y vaciar, respetando el stock disponible.
- Favoritos guardados en el navegador mediante `localStorage` y estilos adaptables a distintos tamaños de pantalla.

## Tecnologías

React 19 · Vite 8 · React Router 7 · Firebase Authentication / Cloud Firestore · CSS Modules · ESLint

## Instalación y ejecución

Necesitás Git, Node.js compatible con Vite 8 (20.19+ o 22.12+) y npm.

```bash
git clone https://github.com/lisernia/preentregaReact.git
cd preentregaReact
npm ci
```

Configurá los servicios indicados debajo y luego iniciá la aplicación:

```bash
npm run dev
```

Abrí la dirección que muestra Vite en la terminal.

## Configuración

### Firebase / Cloud Firestore

La conexión se define en `src/fileStore/config.js`. Para usar tu propio proyecto, reemplazá el objeto `firebaseConfig` por la configuración de tu aplicación web de Firebase y creá una colección llamada `productos` en Firestore.

Cada documento representa un producto. Su ID se utiliza como identificador en el catálogo y debe incluir los siguientes campos:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `nombre` | string | Nombre del producto |
| `precio` | number | Precio en pesos argentinos |
| `stock` | number | Cantidad disponible |
| `imagen` | string | URL o ruta local de la imagen |
| `oferta` | boolean | Si es `true`, se muestra en la sección de ofertas de Inicio |

El catálogo necesita permisos de lectura en las reglas de Firestore del proyecto utilizado.

### Autenticación

En Firebase Console, abrí **Authentication → Sign-in method** y habilitá el proveedor **Correo electrónico/contraseña**. Desde `/registro` se puede crear una cuenta y desde `/login` iniciar sesión. La ruta `/gestion` requiere una sesión activa y, al cerrar sesión, vuelve a solicitar el ingreso. Creá una cuenta de prueba para compartir sus credenciales con el docente de forma privada.

Para dar acceso a Gestión a una cuenta:

1. En Firebase Console → **Authentication → Users**, copiá el UID de la cuenta registrada.
2. En **Firestore Database → Datos**, creá la colección `administradores` y un documento cuyo ID sea exactamente ese UID. Agregá, por ejemplo, el campo `activo` de tipo booleano con valor `true`. La autorización se basa en la existencia del documento.
3. En **Firestore Database → Reglas**, revisá y publicá el contenido de `firestore.rules` de este repositorio. Estas reglas permiten leer productos y equipo públicamente y reservan sus escrituras y el acceso a cupones a administradores. También permiten que cada cuenta compruebe solo su propio documento de administrador. Las demás colecciones quedan sin acceso desde la aplicación salvo que se agreguen reglas explícitas.
4. Iniciá sesión con esa cuenta y entrá a `/gestion`. Una cuenta sin documento de administrador verá un mensaje de acceso restringido. Comprobá también que una cuenta sin permisos no pueda escribir productos directamente en Firestore.

Las reglas se publican en Firebase Console: agregar `firestore.rules` al proyecto local no las publica automáticamente. Revisá las reglas actuales antes de reemplazarlas si Firebase se comparte con otras aplicaciones. Para quitar el acceso a un administrador, eliminá su documento desde la consola de Firebase.

### Equipo

La página Nosotros lee la colección `equipo` de Firestore. Creá un documento por integrante desde Firebase Console con los campos de texto `nombre`, `email`, `puesto`, `foto` y `descripcion`. Los datos de ejemplo están en `public/data/equipo.json`; copiá sus campos a Firestore. Las fotos pueden usar URL o rutas de imágenes locales. Publicá la versión actualizada de `firestore.rules` para permitir la lectura del equipo.

### ImgBB (opcional)

El formulario permite usar una URL o una ruta local sin ImgBB. Para habilitar la subida de imágenes del formulario, creá un archivo `.env` en la raíz:

```dotenv
VITE_API_KEY=tu_clave_de_imgbb
```

Reiniciá el servidor de desarrollo después de modificar este archivo. `.env` debe permanecer excluido de Git mediante `.gitignore`.

Las variables con prefijo `VITE_` forman parte del código del navegador; no deben utilizarse para credenciales privadas de servidor.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada, productos en oferta, equipo y formulario |
| `/productos` | Catálogo de comida |
| `/productos/:id` | Detalle de un producto |
| `/nosotros` | Presentación del equipo |
| `/gestion` | Gestión de productos y cupones (requiere cuenta administradora) |
| `/login` | Inicio de sesión |
| `/registro` | Creación de cuenta |
| `/carrito` | Artículos seleccionados y total |

## Estructura del proyecto

```text
public/
├── data/                 # Datos JSON de productos y equipo
└── images/               # Imágenes locales
src/
├── componentes/          # Catálogo, detalle, carrito, equipo y formulario
├── context/              # Estado del carrito y de autenticación
├── fileStore/            # Configuración de Firebase
├── services/             # Operaciones de productos y cupones en Firestore
├── Header/               # Navegación principal
├── layout/               # Estructura común de las páginas
├── App.jsx               # Rutas de la aplicación
└── main.jsx              # Punto de entrada
```

## Comandos disponibles

| Comando | Acción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Permite revisar localmente la compilación |
| `npm run lint` | Ejecuta ESLint |

Para publicar la aplicación, generá la compilación y configurá el hosting para redirigir las rutas de la aplicación a `index.html`.

## Estado actual y próximos pasos

- El carrito se mantiene en memoria y se reinicia al recargar la página.
- Los cupones se administran en Gestión, pero todavía no se aplican al total del carrito.
- El checkout, la creación de órdenes y el procesamiento de pagos no están implementados.

## Autora

[lisernia](https://github.com/lisernia)

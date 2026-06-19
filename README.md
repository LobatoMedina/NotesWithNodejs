# Notes App

Aplicación web sencilla de notas con Node.js, Express, MongoDB (Mongoose), JWT en cookies y EJS. Arquitectura MVC.

## Funcionalidades

- Signup (registro con contraseña encriptada con bcrypt)
- Login (genera JWT guardado en cookie httpOnly)
- Logout (limpia la cookie)
- Crear nota (título + contenido, asociada al usuario)
- Ver notas (solo las propias del usuario autenticado)

## Estructura del proyecto

```
notes-app/
├── config/
│   └── db.js                 # Conexión a MongoDB
├── controllers/
│   ├── authController.js     # Lógica signup/login/logout
│   └── noteController.js     # Lógica de notas
├── middleware/
│   └── authMiddleware.js      # protect / redirectIfAuthenticated
├── models/
│   ├── User.js
│   └── Note.js
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js
├── views/
│   ├── partials/
│   │   ├── head.ejs
│   │   └── navbar.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── notes.ejs
│   └── newNote.ejs
├── public/
│   └── css/style.css
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Cómo ejecutar con Docker (recomendado)

1. Clona/copia el proyecto.
2. Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up --build
```

3. Abre tu navegador en: http://localhost:3000

Esto levanta dos contenedores:
- `app`: la aplicación Node.js/Express en el puerto 3000.
- `mongo`: MongoDB en el puerto 27017, con un volumen persistente (`mongo-data`).

Para detener todo:

```bash
docker-compose down
```

Para borrar también los datos de Mongo:

```bash
docker-compose down -v
```

## Cómo ejecutar en local sin Docker

1. Asegúrate de tener MongoDB corriendo localmente (o cambia `MONGO_URI`).
2. Copia `.env.example` a `.env` y ajusta las variables si lo necesitas.
3. Instala dependencias:

```bash
npm install
```

4. Levanta el servidor:

```bash
npm start
```

5. Abre http://localhost:3000

## Notas de seguridad / producción

- El JWT se guarda en una cookie `httpOnly` (no accesible desde JS del navegador).
- En producción, activa `secure: true` en la cookie (requiere HTTPS) dentro de `controllers/authController.js`.
- Cambia `JWT_SECRET` por un valor largo y aleatorio antes de desplegar.

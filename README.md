# PERITA (e-commerce de ropa infantil)

Aplicación MERN desarrollada con create-react-app para el proyecto final de la Diplomatura Full Stack Web Developer de la Universidad Tecnológica Nacional.

## Capturas de Pantalla

![PERITA_01](https://github.com/MABAROCELA/perita-front/assets/129613112/32e95368-4fff-4380-b87f-6256c4392f86)

![PERITA_02](https://github.com/MABAROCELA/perita-front/assets/129613112/c47b76bc-26db-4165-bf58-5910c5ed971e)


## Descripción de la App:

### Admin:

- Gestión de usuarios (create, read, update, delete)
- Gestión de productos (create, read, update, delete)

### Cliente:

- Registro de usuario
- Login
- Acceso a los productos
- Suscripción a newsletter

## Usuarios:

- admin@gmail.com / 1234
- cliente@gmail.com / cliente


## Tecnologías Utilizadas

### Backend (Node.js)

- [bcrypt](https://www.npmjs.com/package/bcrypt): Librería para el hashing de contraseñas.
- [connect-mongo](https://www.npmjs.com/package/connect-mongo): Almacena las sesiones de Express en MongoDB.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Analiza las cookies en las solicitudes.
- [cors](https://www.npmjs.com/package/cors): Middleware para manejar CORS en Express.
- [debug](https://www.npmjs.com/package/debug): Utilidad para imprimir mensajes de depuración.
- [dotenv](https://www.npmjs.com/package/dotenv): Carga variables de entorno desde un archivo `.env`.
- [express](https://www.npmjs.com/package/express): Marco de aplicación web para Node.js.
- [express-session](https://www.npmjs.com/package/express-session): Middleware de sesión para Express.
- [express-validator](https://www.npmjs.com/package/express-validator): Middleware para la validación de solicitudes en Express.
- [http-errors](https://www.npmjs.com/package/http-errors): Crea errores HTTP para Express.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implementa la generación y verificación de tokens JWT.
- [mongoose](https://www.npmjs.com/package/mongoose): Biblioteca para modelar objetos MongoDB en Node.js.
- [morgan](https://www.npmjs.com/package/morgan): Registro de solicitudes HTTP para Express.
- [nodemailer](https://www.npmjs.com/package/nodemailer): Librería para enviar correos electrónicos desde Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon): Herramienta para reiniciar automáticamente la aplicación Node.js durante el desarrollo.

### Frontend (React)

- [axios](https://www.npmjs.com/package/axios): Cliente HTTP para realizar solicitudes HTTP.
- [bootstrap](https://www.npmjs.com/package/bootstrap): Marco de diseño y componentes CSS.
- [react](https://www.npmjs.com/package/react): Biblioteca para construir interfaces de usuario.
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap): Componentes de Bootstrap reescritos para React.
- [react-dom](https://www.npmjs.com/package/react-dom): Renderiza elementos de React en el DOM.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): Enrutamiento para aplicaciones React.
- [react-scripts](https://www.npmjs.com/package/react-scripts): Scripts y configuración preconfigurados para proyectos de React.
- [web-vitals](https://www.npmjs.com/package/web-vitals): Librería para medir las métricas de rendimiento web.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona los repositorios desde GitHub:

```bash
//Clonar el repositorio del backend

git clone https://github.com/MABAROCELA/perita-back.git

//Clonar el repositorio del frontend

git clone https://github.com/MABAROCELA/perita-front.git
```

2 - Instalar las dependencias necesarias en cada carpeta (backend y frontend):

```bash
//Instalación del backend:

cd perita-back
npm install

//Instalación del frontend:

cd ../perita-front
npm install
```

3 - Volver a la carpeta principal del proyecto:

```bash
cd ..

//Instalación global de Concurrently:

npm install -g concurrently

//Utilizar el siguiente script para ejecutar los scripts 'dev' de las carpetas 'back' y 'front' simultáneamente:

"dev": "concurrently -k \"cd back && npm run dev \" \"cd front && npm start\"",

//Ejecutar el script 'dev':

npm run dev
```


## VARIABLES ENTORNO FRONT:

- REACT_APP_API_KEY= *api key de apiweather*
- REACT_APP_BACK_URL= *URL del localhost con puerto o deploy url del back*

## VARIABLES DE ENOTRNO BACK:

- PORT= *número de puerto local back*
- URL_ATLAS= *URL de la base de datos Mongo Atlas con usuario y password*
- URL_DB_SESSION= *URL de la base de datos Mongo Atlas con usuario y password*
- PASSGMAIL= *password de email de Gmail*
- USERGMAIL= *dirección de Gmail*
- NODE_ENV= *development o production*
- SESSION_SECRET= *código de sesión*
- URL_FRONT= *URL localhost con puerto o URL de deploy back*

# DEPLOY: 
(https://perita-front.vercel.app/)

## Contacto:

Marta Barocela
marbarocela@gmail.com
https://www.linkedin.com/in/marta-barocela/

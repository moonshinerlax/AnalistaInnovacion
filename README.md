# InnovaTube

## Descripción del Proyecto

InnovaTube es una aplicación web que permite a los usuarios registrarse, autenticarse, listar y buscar videos de YouTube, y gestionar una lista de videos favoritos. El proyecto es parte de una evaluación técnica para un puesto de trabajo en InnovaTube.

## Tecnologías Utilizadas

- **Frontend**: Angular
- **Backend**: NodeJS
- **Otros**: Docker, Google reCaptcha, YouTube API

## Funcionalidades

- Registro de usuarios con validación y reCaptcha.
- Autenticación de usuarios con inicio de sesión y recuperación de contraseña.
- Listado y búsqueda de videos de YouTube.
- Gestión de videos favoritos.
- Seguridad adicional con encriptación de contraseñas y tokens.
- Diseño responsivo.

## Plan de Trabajo

### Día 1: Preparación y Estructura Inicial
**Objetivo**: Configurar el entorno de desarrollo y establecer la estructura básica de la aplicación.

#### Tareas
1. Configurar Repositorio
   - Crear un repositorio en GitHub o GitLab.
   - Añadir el enlace al repositorio desde el comienzo del ejercicio.
   - Realizar el primer commit con un archivo README.md que describa el proyecto y el plan de trabajo.

2. Configuración del Entorno
   - Instalar NodeJS y Angular.
   - Configurar un proyecto básico de Angular y NodeJS.
   - Configurar el entorno de desarrollo para backend y frontend.

3. Estructura del Proyecto
   - Crear la estructura básica de carpetas y archivos para frontend y backend.
   - Definir las rutas principales del frontend y las APIs del backend.

4. Registro de Usuarios (Frontend)
   - Implementar el formulario de registro de usuarios con validaciones básicas.
   - Integrar reCaptcha en el formulario de registro.

5. Commit & Push
   - Realizar commit y push de los avances realizados durante el día.

### Día 2: Funcionalidades de Autenticación y Listado de Videos
**Objetivo**: Implementar la autenticación de usuarios y la funcionalidad principal de listado de videos.

#### Tareas
1. Backend: Registro y Autenticación
   - Implementar el registro de usuarios en el backend, incluyendo validación de datos y encriptación de contraseñas.
   - Implementar la autenticación de usuarios, incluyendo generación y verificación de tokens.

2. Frontend: Inicio de Sesión
   - Implementar el formulario de inicio de sesión con validaciones.
   - Integrar el backend con el frontend para el inicio de sesión y registro de usuarios.

3. Sección Principal: Listado de Videos
   - Implementar la interfaz para listar videos y la barra de búsqueda.
   - Utilizar la API de YouTube para obtener los videos y mostrarlos en la interfaz.

4. Funcionalidad de Favoritos
   - Implementar la opción de marcar y desmarcar videos como favoritos en el frontend.
   - Crear la API en el backend para gestionar los videos favoritos.

5. Commit & Push
   - Realizar commit y push de los avances realizados durante el día.

### Día 3: Finalización y Despliegue
**Objetivo**: Completar la funcionalidad, mejorar la seguridad, y desplegar la aplicación.

#### Tareas
1. Sección de Favoritos
   - Implementar la interfaz para listar los videos favoritos con buscador.
   - Integrar el backend con el frontend para la gestión de favoritos.

2. Mejoras de Seguridad
   - Implementar encriptación de contraseñas y manejo seguro de tokens.
   - Añadir medidas de seguridad adicionales como protección contra ataques XSS y CSRF.

3. Diseño Responsivo
   - Asegurarse de que la aplicación tenga un diseño responsivo y sea accesible desde dispositivos móviles.

4. Despliegue
   - Configurar contenedores usando Docker para el despliegue de la aplicación.
   - Desplegar la aplicación en una plataforma de hosting como Heroku, AWS, o similar.

5. Documentación y Monitoreo
   - Añadir documentación sobre cómo instalar, configurar y usar la aplicación.
   - Implementar una solución básica de monitoreo y registro (logging).

6. Commit Final & Push
   - Realizar commit y push final de todos los cambios realizados.
   - Asegurarse de que el repositorio esté completo y documentado.

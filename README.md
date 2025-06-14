Configuración Inicial del Entorno:
1.1 Requisitos Previos Instalados:

-Docker Desktop (con WSL2 si usas Windows)
-Node.js (v18+)
-NestJS CLI (npm i -g @nestjs/cli)
-PostgreSQL client (opcional, para pruebas)

1.2 Estructura de Carpetas:
task-management-system/
├── backend/          # API NestJS
└── frontend/         # Aplicación Next.js

2. Configuración de Docker y PostgreSQL
2.1 Archivo docker-compose.yml:
version: '3.8'
services:
  db:
    image: postgres:13
    container_name: task_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: task_management
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

Pasos ejecutados:
1.Creamos el archivo en /backend/docker-compose.yml

2.Ejecutamos:
docker-compose up -d

3.Verificamos con:
docker ps

3. Configuración del Backend (NestJS)
3.1 Variables de entorno (.env.development):
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_management
JWT_SECRET=mi_clave_secreta

3.2 Configuración TypeORM (app.module.ts):
TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
}),

Pasos clave:
1.Instalamos dependencias:
npm install @nestjs/typeorm typeorm pg
2.Configuramos la conexión a la base de datos
3.Verificamos que los módulos se carguen correctamente

5. Configuración del Frontend (Next.js)
1.Instalamos dependencias:
npm install axios @tanstack/react-query
2.Configuramos el provider de React Query
3.Implementamos la autenticación JWT

6. Pruebas Finales
Flujo de trabajo verificado:

-Registro de usuario
-Login con JWT
-Creación de proyectos
-Gestión de tareas
-Comentarios en tareas

Comandos útiles para pruebas:
# Limpiar y reiniciar la base de datos
docker-compose down
docker volume rm backend_postgres_data
docker-compose up -d

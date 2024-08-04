## NestJs backend
  @Auth(ValidRoles.user)
Para usar el auth que se encarga de validar lo roles en cada ruta para ejecutar cualquier accion, necesito importar El AuthModule en el Module que lo quiero usar, eje: Importar el AuthModule en el SeedModule que sirve para llenar la base de datos de las provincias
// db_tienda.js

db = db.getSiblingDB('db_tienda'); // Al ingresar en Mongocompass utilizamos el terminal para conectaronos especificamente al db de la tienda
//Si quisieramos cambiar de db unicamente cambiamos el nombre de la base de datos


db.getCollectionNames() // Verifica las colecciones existentes en la DB

db.nombreColeccion.findOne() //Busca un documento en la colección especifica


// Insertar un usuario con el insertOne
//Realizando testing podriamos insegresar datos adicionales a un usuario ej si quisieramos agregarle una fecha de registro, un campo de estado se puede agregar un campo adicional no siendo esta una estructura rígida 

// ------------Agregar Usuario-----------------


//Agregar un usuario con el insertOne
db.usuarios.insertOne({
  nombre: "Valeria Montero",
  correo: "valeria.montero@empresa.com",
  telefono: "7000-1111",
  direccion: "Limón, Costa Rica",
});

// Agregar varios usuarios con el insertMany
db.usuarios.insertMany([
  {
    nombre: "Kevin Mora",
    correo: "kevin.mora@empresa.com",
    telefono: "7100-2222",
    direccion: "Puntarenas, Costa Rica",
  },
  {
    nombre: "Natalia Rojas",
    correo: "natalia.rojas@empresa.com",
    telefono: "7200-3333",
    direccion: "Guanacaste, Costa Rica",
  },
  {
    nombre: "Daniela Quirós",
    correo: "daniela.quiros@empresa.com",
    telefono: "7300-4444",
    direccion: "Cartago, Costa Rica",
  }
]);

//-----------------Actualizacion de Usuario-----------------


// Actualizar teléfono de un usuario
// En este caso la actualizacion utiliza el updateOne, que se rigue en este caso con el nombre del usuario, podriaos realizar la actualizacion por el id del usuario, pero en este caso se utiliza el nombre como referencia, y se actualiza el campo telefono con el $set

db.usuarios.updateOne(
  { nombre: "Kevin Mora" },
  { $set: { telefono: "7100-0000" } }
);

// Eliminar un usuario, de igual forma se elmina utilizando el nombre del usuario, pero se puede utilizar el id del usuario para eliminarlo

db.usuarios.deleteOne({ nombre: "Daniela Quirós" });


//si en la colecion no hay un match, no se realiza la actualizacion, por lo que no se genera un error, simplemente no se actualiza nada


// ---------------------- Marcas ----------------------

// Insertar una marca
db.marcas.insertOne({
  nombre: "UrbanStyle",
  pais: "Costa Rica"
});

// Insertar varias marcas
db.marcas.insertMany([
  { nombre: "EcoModa", pais: "Colombia" },
  { nombre: "FashionWear", pais: "Estados Unidos" },
  { nombre: "TrendyLine", pais: "España" },
  { nombre: "Ropa Latina", pais: "México" }
]);

// Actualizar país de una marca
db.marcas.updateOne(
  { nombre: "EcoModa" },
  { $set: { pais: "Perú" } }
);

// Eliminar una marca
db.marcas.deleteOne({ nombre: "TrendyLine" });


// ---------------------- Prendas ----------------------

// Insertar una prenda
db.prendas.insertOne({
  nombre: "Camiseta básica",
  talla: "M",
  color: "Blanco",
  precio: 8500,
  marca: "UrbanStyle",
  stock: 10,
  
});

// Insertar varias prendas
db.prendas.insertMany([
  {
    nombre: "Jeans ajustados",
    talla: "L",
    color: "Azul",
    precio: 14500,
    marca: "FashionWear",
    stock: 8,
    
  },
  {
    nombre: "Chaqueta de cuero",
    talla: "M",
    color: "Negro",
    precio: 32000,
    marca: "UrbanStyle",
    stock: 5,
    
  },
  {
    nombre: "Camiseta estampada",
    talla: "S",
    color: "Gris",
    precio: 7000,
    marca: "Ropa Latina",
    stock: 12,
    
  }
]);

// Actualizar  datos stock
db.prendas.updateOne(
  { nombre: "Camiseta básica" },
  { $set: { stock: 9 } }
);

// Eliminar prenda
db.prendas.deleteOne({ nombre: "Camiseta estampada" });


// ---------------------- Ventas ----------------------

// Insertar una venta
db.ventas.insertOne({
  usuario: "Valeria Montero",
  fecha: new Date("2025-06-08"),
  prendas: [
    { nombre: "Camiseta básica", cantidad: 2 },
    { nombre: "Jeans ajustados", cantidad: 1 }
  ],
  total: 30500
});

// Insertar varias ventas
db.ventas.insertMany([
  {
    usuario: "Kevin Mora",
    fecha: new Date("2025-06-07"),
    prendas: [
      { nombre: "Camiseta básica", cantidad: 1 },
      { nombre: "Chaqueta de cuero", cantidad: 1 }
    ],
    total: 40500
  },
  {
    usuario: "Natalia Rojas",
    fecha: new Date("2025-06-06"),
    prendas: [
      { nombre: "Jeans ajustados", cantidad: 2 }
    ],
    total: 29000
  },
  {
    usuario: "Carlos Jiménez",
    fecha: new Date("2025-06-09"),
    prendas: [
      { nombre: "Chaqueta de cuero", cantidad: 1 }
    ],
    total: 32000
  }
]);

// Actualizar total de una venta
db.ventas.updateOne(
  { usuario: "Kevin Mora" },
  { $set: { total: 39500 } }
);

// Eliminar venta
db.ventas.deleteOne({ usuario: "Carlos Jiménez" });


// ---------------------- CONSULTAS ----------------------

// i. Obtener la cantidad vendida de prendas por fecha y fíltrala con una fecha específica.


//agregate permite realizar consultas más complejas, como unir colecciones
//unwind permite descomponer un array en documentos individuales
// al hacer esto realiza una suma de la cantidad de prendas vendidas en esa fecha específica

db.ventas.aggregate([
  { $match: { fecha: new Date("2025-06-08") } },
  { $unwind: "$prendas" },
  { $group: { _id: "$fecha", totalVendidas: { $sum: "$prendas.cantidad" } } }
]);

// ii. Obtener la lista de todas las marcas que tienen al menos una venta

// se utiliza el aggregate para unir las colecciones de ventas y prendas.
// Se utiliza $unwind para descomponer el array de prendas en documentos individuales
// Luego se utiliza $lookup para unir la colección de prendas con la colección de marcas
// Finalmente, se agrupa por marca para obtener una lista de marcas que tienen al menos una venta

db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $lookup: {
      from: "prendas",
      localField: "prendas.nombre",
      foreignField: "nombre",
      as: "detalle_prenda"
    }
  },
  { $unwind: "$detalle_prenda" },
  { $group: { _id: "$detalle_prenda.marca" } }
]);

// iii. Obtener prendas vendidas y su stock restante
//Agregate une las colecciones.
//unwind descompone la matris para tener los datos individuales 
//group agrupa por nombre de prenda y suma la cantidad vendida
// lookup une la colección de prendas para obtener información adicional como el stock
// unwind nuevamente para descomponer el array de prendas
// project permite seleccionar los campos que queremos mostrar en el resultado final

db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $group: {
      _id: "$prendas.nombre",
      totalVendidas: { $sum: "$prendas.cantidad" }
    }
  },
  {
    $lookup: {
      from: "prendas",
      localField: "_id",
      foreignField: "nombre",
      as: "prenda_info"
    }
  },
  { $unwind: "$prenda_info" },
  {
    $project: {
      prenda: "$_id",
      totalVendidas: 1,
      stockRestante: "$prenda_info.stock"
    }
  }
]);

// iv. Obtener listado de las 5 marcas más vendidas y su cantidad de ventas

//localfield  es el campo de la colección de ventas que se va a comparar con el campo de la colección de prendas
//foreignField es el campo de la colección de prendas que se va a comparar con el campo de la colección de ventas
//as es el nombre del campo que se va a agregar a la colección de ventas con la información de la colección de prendas
//sort ordena los resultados por cantidadVendida en orden descendente
//limit limita el número de resultados a 5


db.ventas.aggregate([
  { $unwind: "$prendas" },
  {
    $lookup: {
      from: "prendas",
      localField: "prendas.nombre",
      foreignField: "nombre",
      as: "info_prenda"
    }
  },
  { $unwind: "$info_prenda" },
  {
    $group: {
      _id: "$info_prenda.marca",
      cantidadVendida: { $sum: "$prendas.cantidad" }
    }
  },
  { $sort: { cantidadVendida: -1 } },
  { $limit: 5 }
]);

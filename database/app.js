const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rpd_db:LkfxqpwRjuFDNatI@cluster0.uebuxvd.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // Conectar a MongoDB
    await client.connect();
    console.log(" Conexión exitosa a MongoDB");

    // Listar bases de datos disponibles
    const databasesList = await client.db().admin().listDatabases();
    console.log("Bases de datos disponibles:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    // Seleccionar base de datos
    const db = client.db("rpd_db");

    // Seleccionar colección
    const coleccion = db.collection("usuarios");

    // Consultar documentos de la colección
    const usuarios = await coleccion.find({}).toArray();

    console.log(`\nUsuarios encontrados: ${usuarios.length}`);
    console.log(usuarios);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Conexión cerrada");
  }
}

run();


//CONSULTA DE USUARIOS 

// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://rpd_db:LkfxqpwRjuFDNatI@cluster0.uebuxvd.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     console.log("Conexión exitosa a MongoDB");

//     const databasesList = await client.db().admin().listDatabases();
//     console.log("Bases de datos disponibles:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));

//     const db = client.db("db_tienda");
//     const coleccion = db.collection("usuarios"); // puedes cambiar "usuarios" por otra colección

//     const usuarios = await coleccion.find({}).toArray();

//     console.log(`\nUsuarios encontrados: ${usuarios.length}`);
//     console.log(usuarios);

//   } catch (err) {
//     console.error(" Error:", err);
//   } finally {
//     await client.close();
//     console.log("🔒 Conexión cerrada");
//   }
// }

// run();


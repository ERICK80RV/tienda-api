from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId
import certifi

app = Flask(__name__)

# URI conexión MongoDB Atlas
uri = "mongodb+srv://rpd_db:LkfxqpwRjuFDNatI@cluster0.uebuxvd.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client['db_tienda']

# ---------------- USUARIOS ----------------

@app.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = list(db.usuarios.find())
    for usuario in usuarios:
        usuario['_id'] = str(usuario['_id'])
    return jsonify(usuarios)

@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.json
    resultado = db.usuarios.insert_one(data)
    return jsonify({"mensaje": "Usuario creado", "id": str(resultado.inserted_id)}), 201

@app.route('/usuarios/<id>', methods=['GET'])
def obtener_usuario(id):
    try:
        usuario = db.usuarios.find_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if usuario:
        usuario['_id'] = str(usuario['_id'])
        return jsonify(usuario)
    return jsonify({"error": "Usuario no encontrado"}), 404

@app.route('/usuarios/<id>', methods=['PUT'])
def actualizar_usuario(id):
    try:
        data = request.json
        resultado = db.usuarios.update_one({"_id": ObjectId(id)}, {"$set": data})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.modified_count == 1:
        return jsonify({"mensaje": "Usuario actualizado"})
    return jsonify({"error": "Usuario no encontrado o sin cambios"}), 404

@app.route('/usuarios/<id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        resultado = db.usuarios.delete_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.deleted_count == 1:
        return jsonify({"mensaje": "Usuario eliminado"})
    return jsonify({"error": "Usuario no encontrado"}), 404

# ---------------- PRENDAS ----------------

@app.route('/prendas', methods=['GET'])
def listar_prendas():
    prendas = list(db.prendas.find())
    for prenda in prendas:
        prenda['_id'] = str(prenda['_id'])
    return jsonify(prendas)

@app.route('/prendas', methods=['POST'])
def crear_prenda():
    data = request.json
    resultado = db.prendas.insert_one(data)
    return jsonify({"mensaje": "Prenda creada", "id": str(resultado.inserted_id)}), 201

@app.route('/prendas/<id>', methods=['GET'])
def obtener_prenda(id):
    try:
        prenda = db.prendas.find_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if prenda:
        prenda['_id'] = str(prenda['_id'])
        return jsonify(prenda)
    return jsonify({"error": "Prenda no encontrada"}), 404

@app.route('/prendas/<id>', methods=['PUT'])
def actualizar_prenda(id):
    try:
        data = request.json
        resultado = db.prendas.update_one({"_id": ObjectId(id)}, {"$set": data})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.modified_count == 1:
        return jsonify({"mensaje": "Prenda actualizada"})
    return jsonify({"error": "Prenda no encontrada o sin cambios"}), 404

@app.route('/prendas/<id>', methods=['DELETE'])
def eliminar_prenda(id):
    try:
        resultado = db.prendas.delete_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.deleted_count == 1:
        return jsonify({"mensaje": "Prenda eliminada"})
    return jsonify({"error": "Prenda no encontrada"}), 404

# ---------------- MARCAS ----------------

@app.route('/marcas', methods=['GET'])
def listar_marcas():
    marcas = list(db.marcas.find())
    for marca in marcas:
        marca['_id'] = str(marca['_id'])
    return jsonify(marcas)

@app.route('/marcas', methods=['POST'])
def crear_marca():
    data = request.json
    resultado = db.marcas.insert_one(data)
    return jsonify({"mensaje": "Marca creada", "id": str(resultado.inserted_id)}), 201

@app.route('/marcas/<id>', methods=['GET'])
def obtener_marca(id):
    try:
        marca = db.marcas.find_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if marca:
        marca['_id'] = str(marca['_id'])
        return jsonify(marca)
    return jsonify({"error": "Marca no encontrada"}), 404

@app.route('/marcas/<id>', methods=['PUT'])
def actualizar_marca(id):
    try:
        data = request.json
        resultado = db.marcas.update_one({"_id": ObjectId(id)}, {"$set": data})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.modified_count == 1:
        return jsonify({"mensaje": "Marca actualizada"})
    return jsonify({"error": "Marca no encontrada o sin cambios"}), 404

@app.route('/marcas/<id>', methods=['DELETE'])
def eliminar_marca(id):
    try:
        resultado = db.marcas.delete_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.deleted_count == 1:
        return jsonify({"mensaje": "Marca eliminada"})
    return jsonify({"error": "Marca no encontrada"}), 404

# ---------------- VENTAS ----------------

@app.route('/ventas', methods=['GET'])
def listar_ventas():
    ventas = list(db.ventas.find())
    for venta in ventas:
        venta['_id'] = str(venta['_id'])
    return jsonify(ventas)

@app.route('/ventas', methods=['POST'])
def crear_venta():
    data = request.json
    resultado = db.ventas.insert_one(data)
    return jsonify({"mensaje": "Venta creada", "id": str(resultado.inserted_id)}), 201

@app.route('/ventas/<id>', methods=['GET'])
def obtener_venta(id):
    try:
        venta = db.ventas.find_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if venta:
        venta['_id'] = str(venta['_id'])
        return jsonify(venta)
    return jsonify({"error": "Venta no encontrada"}), 404

@app.route('/ventas/<id>', methods=['PUT'])
def actualizar_venta(id):
    try:
        data = request.json
        resultado = db.ventas.update_one({"_id": ObjectId(id)}, {"$set": data})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.modified_count == 1:
        return jsonify({"mensaje": "Venta actualizada"})
    return jsonify({"error": "Venta no encontrada o sin cambios"}), 404

@app.route('/ventas/<id>', methods=['DELETE'])
def eliminar_venta(id):
    try:
        resultado = db.ventas.delete_one({"_id": ObjectId(id)})
    except InvalidId:
        return jsonify({"error": "ID inválido"}), 400

    if resultado.deleted_count == 1:
        return jsonify({"mensaje": "Venta eliminada"})
    return jsonify({"error": "Venta no encontrada"}), 404

if __name__ == '__main__':
    app.run(debug=True)

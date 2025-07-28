import certifi
from pymongo import MongoClient

uri = "mongodb+srv://rpd_db:LkfxqpwRjuFDNatI@cluster0.uebuxvd.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, tlsCAFile=certifi.where())

try:
    client.admin.command('ping')
    print("Conexión exitosa a MongoDB con certificados SSL")
except Exception as e:
    print("Error de conexión:", e)

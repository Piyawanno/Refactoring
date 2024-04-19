from flask import Flask, request
from flask_cors import CORS
from datetime import datetime

import pprint, sqlite3, json, math

from postapi.model.Address import Address
from postapi.model.Package import Package
from postapi.model.ExpressPackageExtension import ExpressPackageExtension
from postapi.model.RegularPackageExtension import RegularPackageExtension

from postapi.controller.UtilController import mapUtilController
from postapi.util.ConfigUtil import getConfig
from postapi.util.DBHandler import DBHandler

app = Flask(__name__)
config = getConfig()
CORS(app)

DB_FILE = config['databasePath']

session = DBHandler(config)
session.connect()
session.modelList.append(Address)
session.modelList.append(Package)
session.modelList.append(ExpressPackageExtension)
session.modelList.append(RegularPackageExtension)
session.generateQuery()
session.checkTable()


mapUtilController(app)

def connectDB(path: str) -> sqlite3.Connection:
	connection = sqlite3.connect(path, isolation_level=None, check_same_thread=False)
	connection.row_factory = sqlite3.Row
	return connection.cursor()

def getPackageCategroy(weight: float) -> int:
	if weight < 5: return 1
	elif weight >=  5 and weight < 10: return 2
	elif weight >= 10 and weight < 15: return 3
	elif weight >= 15 and weight < 20: return 4
	elif weight >= 20: return 5
	else: return 0

def getExpressPrice(weight: float, distance: float, category: int) -> float:
	if   category == 1: price = 0.5
	elif category == 2: price = 0.6
	elif category == 3: price = 0.7
	elif category == 4: price = 0.8
	elif category == 5: price = 0.9
	normalized = math.ceil(distance/100.0)
	return price*weight*normalized

def getRegularPrice(weight: float, category: int) -> float:
	if   category == 1: price = 0.20
	elif category == 2: price = 0.25
	elif category == 3: price = 0.30
	elif category == 4: price = 0.35
	elif category == 5: price = 0.40
	return price*weight

def getLetterPrice(category: int) -> float:
	if   category == 6: price = 2
	elif category == 7: price = 4
	elif category == 8: price = 10
	return price


@app.post("/api/express/insert")
def insertExpressPackage():
	data = request.get_json()
	category = getPackageCategroy(float(data['packageWeight']))
	price = getExpressPrice(float(data['packageWeight']), float(data['distance']), category)
	cursor = connectDB(DB_FILE)
	query  = f'INSERT INTO ExpressPackage('
	query += f'senderName, senderAddress, senderDistrict, '
	query += f'senderProvince, senderPostCode, senderTelephone, '
	query += f'receiverName, receiverAddress, receiverDistrict, '
	query += f'receiverProvince, receiverPostCode, receiverTelephone, '
	query += f'distance, packageWeight, packageCategory, price, sendDate, currentStatus) VALUES('
	query += f"'{data['senderName']}',"
	query += f"'{data['senderAddress']}',"
	query += f"'{data['senderDistrict']}',"
	query += f"'{data['senderProvince']}',"
	query += f"'{data['senderPostCode']}',"
	query += f"'{data['senderTelephone']}',"
	query += f"'{data['receiverName']}',"
	query += f"'{data['receiverAddress']}',"
	query += f"'{data['receiverDistrict']}',"
	query += f"'{data['receiverProvince']}',"
	query += f"'{data['receiverPostCode']}',"
	query += f"'{data['receiverTelephone']}',"
	query += f"{data['distance']},"
	query += f"{data['packageWeight']},"
	query += f"{category},"
	query += f"{price},"
	query += f"'{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}',"
	query += '1)'
	cursor.execute(query)
	return {'isSuccess': True}

@app.post("/api/regular/insert")
def insertRegularPackage():
	data = request.get_json()
	category = getPackageCategroy(float(data['packageWeight']))
	price = getRegularPrice(float(data['packageWeight']), category)
	cursor = connectDB(DB_FILE)
	query  = f'INSERT INTO Package('
	query += f'senderName, senderAddress, senderDistrict, '
	query += f'senderProvince, senderPostCode, senderTelephone, '
	query += f'receiverName, receiverAddress, receiverDistrict, '
	query += f'receiverProvince, receiverPostCode, receiverTelephone, '
	query += f'packageWeight, packageCategory, price, sendDate, currentStatus) VALUES('
	query += f"'{data['senderName']}',"
	query += f"'{data['senderAddress']}',"
	query += f"'{data['senderDistrict']}',"
	query += f"'{data['senderProvince']}',"
	query += f"'{data['senderPostCode']}',"
	query += f"'{data['senderTelephone']}',"
	query += f"'{data['receiverName']}',"
	query += f"'{data['receiverAddress']}',"
	query += f"'{data['receiverDistrict']}',"
	query += f"'{data['receiverProvince']}',"
	query += f"'{data['receiverPostCode']}',"
	query += f"'{data['receiverTelephone']}',"
	query += f"{data['packageWeight']},"
	query += f"{category},"
	query += f"{price},"
	query += f"'{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}',"
	query += '1)'
	cursor.execute(query)
	return {'isSuccess': True}

@app.post("/api/letter/insert")
def insertLetter():
	data = request.get_json()
	price = getLetterPrice(float(data['packageCategory']))
	cursor = connectDB(DB_FILE)
	query  = f'INSERT INTO Letter('
	query += f'senderName, senderAddress, senderDistrict, '
	query += f'senderProvince, senderPostCode, senderTelephone, '
	query += f'receiverName, receiverAddress, receiverDistrict, '
	query += f'receiverProvince, receiverPostCode, receiverTelephone, '
	query += f'packageCategory, price, sendDate, currentStatus) VALUES('
	query += f"'{data['senderName']}',"
	query += f"'{data['senderAddress']}',"
	query += f"'{data['senderDistrict']}',"
	query += f"'{data['senderProvince']}',"
	query += f"'{data['senderPostCode']}',"
	query += f"'{data['senderTelephone']}',"
	query += f"'{data['receiverName']}',"
	query += f"'{data['receiverAddress']}',"
	query += f"'{data['receiverDistrict']}',"
	query += f"'{data['receiverProvince']}',"
	query += f"'{data['receiverPostCode']}',"
	query += f"'{data['receiverTelephone']}',"
	query += f"{data['packageCategory']},"
	query += f"{price},"
	query += f"'{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}',"
	query += '1)'
	cursor.execute(query)
	return {'isSuccess': True}

@app.get("/api/package/get")
def getPackage():
	cursor = connectDB(DB_FILE)
	packageList = []
	query = 'SELECT * FROM ExpressPackage;'
	cursor.execute(query)
	while True:
		row = cursor.fetchone()
		if row is None: break
		rowData = dict(row)
		rowData['packageType'] = 1
		packageList.append(rowData)
	query = 'SELECT * FROM Package;'
	cursor.execute(query)
	while True:
		row = cursor.fetchone()
		if row is None: break
		rowData = dict(row)
		rowData['packageType'] = 2
		packageList.append(rowData)
	query = 'SELECT * FROM Letter;'
	cursor.execute(query)
	while True:
		row = cursor.fetchone()
		if row is None: break
		rowData = dict(row)
		rowData['packageType'] = 3
		packageList.append(rowData)
	packageList.sort(key=lambda x: x['sendDate'])
	return packageList

@app.post('/api/status/change')
def changeStatus():
	data = request.get_json()
	pprint.pprint(data)
	if data['packageType'] == 1: table = 'ExpressPackage'
	elif data['packageType'] == 2: table = 'Package'
	elif data['packageType'] == 3: table = 'Letter'
	query = f"UPDATE {table} SET currentStatus={data['nextStatus']} WHERE id={data['pid']}"
	cursor = connectDB(DB_FILE)
	cursor.execute(query)
	print(query)
	return {'isSuccess': True}
	
if __name__ == '__main__':
	app.run(host=config['host'], port=config['port'])
from typing import List, Set, Any, get_type_hints
from datetime import date, datetime
from postapi.util.Record import Record

import sqlite3

__COLUMN_TYPE__ = {
	str: 'VARCHAR(255)',
	int: 'INTEGER',
	float: 'DOUBLE PRECISION',
	date: 'DATE',
	datetime: 'TIMESTAMP',
}

class DBHandler :
	def __init__(self, config:dict) :
		self.config = config
		self.isConnected = False
		self.isCreateTable = False
		self.modelList: List[type] = []
	
	def generateQuery(self) :
		for model in self.modelList :
			model.__column_name__ = list(get_type_hints(model))
			model.insertQuery = self.generateInsertQuery(model)
			model.updateQuery = self.generateUpdateQuery(model)
			model.selectQuery = self.generateSelectQuery(model)
	
	def generateInsertQuery(self, model) :
		column = ','.join(model.__column_name__)
		name = model.__name__.lower()
		parameter = ','.join(['?' for i in model.__column_name__])
		return f'INSERT INTO {name} ({column}) VALUES({parameter})'
	
	def generateUpdateQuery(self, model) :
		column = ','.join([f'{i}=?' for i in model.__column_name__])
		name = model.__name__.lower()
		return f'UPDATE {name} SET {column} WHERE id=?'
	
	def generateSelectQuery(self, model) :
		column = ','.join(model.__column_name__)
		name = model.__name__.lower()
		return f'SELECT id, {column} FROM {name}'
	
	def connect(self) :
		if self.isConnected : return
		self.connection = sqlite3.connect(
			self.config["databasePath"],
			isolation_level=None,
			check_same_thread=False
		)
		self.connection.row_factory = sqlite3.Row
		cursor = self.connection.cursor()
		cursor.execute("PRAGMA synchronous = OFF")
		cursor.execute("PRAGMA journal_mode = MEMORY")
		self.isConnected = True
	
	def close(self) :
		if self.isConnected :
			self.connection.close()

	def insert(self, record) :
		query = record.__class__.insertQuery
		attribute = self.getAttribute(record)
		attribute = self.getAttributeID(attribute)
		cursor = self.connection.cursor()
		cursor.execute(query, attribute)
		record.id = cursor.lastrowid
	
	def update(self, record) :
		query = record.__class__.updateQuery
		attribute = self.getAttribute(record)
		attribute = self.getAttributeID(attribute)
		attribute.append(record.id)
		cursor = self.connection.cursor()
		cursor.execute(query, attribute)

	def select(self, model, clause, parameter) :
		query = f'{model.selectQuery} {clause}'
		cursor = self.connection.cursor()
		cursor.execute(query, parameter)
		result = cursor.fetchall()
		return self.mapModel(model, result)
	
	
	def getAttribute(self, record) -> List[Any]:
		columnName = record.__class__.__column_name__
		return [getattr(record, i) for i in columnName]
	
	def getAttributeID(self, attribute: List[Any]):
		return [getattr(i, 'id', None) if isinstance(i, Record) else i for i in attribute]

	def mapModel(self, model, result) -> list :
		mapped = []
		for i in result :
			record = model()
			record.id = i[0]
			for c, v in zip(model.__column_name__, i[1:]) :
				setattr(record, c, v)
			mapped.append(record)
		return mapped
	
	def checkTable(self) :
		if self.isCreateTable : return
		self.getTableList()
		self.isCreateTable = True
		for model in self.modelList :
			if model.__name__.lower() not in self.existingTable :
				self.createTable(model)
			self.createIndex(model)
		self.getTableList()
	
	def createTable(self, model) :
		name = model.__name__.lower()
		query = [f"CREATE TABLE IF NOT EXISTS {name} (\n\t"]
		columnList = ['id INTEGER PRIMARY KEY AUTOINCREMENT']
		typeHint = get_type_hints(model)
		for i, hint in typeHint.items() :
			print(i, hint)
			if hint is None: continue
			if issubclass(hint, Record):
				columnType = 'INTEGER'
			else:
				columnType = __COLUMN_TYPE__.get(hint, None)
			print(i, columnType)
			if columnType is None : continue
			columnList.append(f'{i} {columnType}')
		query.append(',\n\t'.join(columnList))
		query.append('\n)')
		query = ' '.join(query)
		cursor = self.connection.cursor()
		cursor.execute(query)
	
	def createIndex(self, model) :
		name = model.__name__.lower()
		cursor = self.connection.cursor()
		for i in model.getIndex() :
			query = f"CREATE INDEX IF NOT EXISTS {name}_{i} ON {name}({i})"
			cursor.execute(query)
	
	def getTableList(self) :
		query = 'SELECT name FROM sqlite_master WHERE type = "table"'
		cursor = self.connection.cursor()
		cursor.execute(query)
		result = cursor.fetchall()
		self.existingTable = {row[0].lower() for row in result}

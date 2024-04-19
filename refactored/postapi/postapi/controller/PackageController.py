from postapi.model.Package import Package
from postapi.util.DBHandler import DBHandler
from flask import request
from typing import List

from pprint import pprint

def mapPackageController(main):
	from postapi.RefactoredApplication import RefactoredApplication
	application: RefactoredApplication = main
	session: DBHandler = application.session
	get = application.app.get
	post = application.app.post

	@post('/api/package/insert')
	def insertPackage():
		data = request.get_json()
		package = Package.create(data)
		package.calculatePrice()
		if package.extension is not None:
			session.insert(package.extension)
		session.insert(package)
		return {
			'isSuccess': True,
		}
	
	@get('/api/package/get')
	def getPackage():
		packageList: List[Package] = session.select(Package, "")
		return [i.toDict() for i in packageList]
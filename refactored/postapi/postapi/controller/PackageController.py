from postapi.model.Package import Package
from postapi.model.PackageStatus import PackageStatus
from postapi.util.DBHandler import DBHandler
from flask import request
from typing import List
from datetime import datetime

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
		print(data)
		package = Package.create(data)
		print(package)
		if package is None:
			return {
				'isSuccess': False,
				'message': f'Package Type {data["packageType"]} cannot be found'
			}
		package.sendDate = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
		package.status = PackageStatus.REGISTERED
		package.calculatePrice()
		if package.extension is not None:
			session.insert(package.extension)
		session.insert(package)
		return {
			'isSuccess': True,
		}
	
	@get('/api/package/get')
	def getPackage():
		packageList: List[Package] = session.select(Package, "ORDER BY id DESC", [])
		return [i.toDict() for i in packageList]
	
	@post('/api/status/change')
	def changeStatus():
		data = request.get_json()
		packageList: List[Package] = session.select(Package, "WHERE id=?", [data['pid']])
		if len(packageList):
			package = packageList[0]
			package.status = data['status']
			if package.status == PackageStatus.RECEIVED.value:
				package.receiveDate = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
			session.update(package)
			return {
				'isSuccess': True,
			}
		else:
			return {
				'isSuccess': False,
				'message': f'Package {data["pid"]} cannot be found.'
			}

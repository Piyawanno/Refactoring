from flask import Flask, request
from flask_cors import CORS
from postapi.util.ConfigUtil import getConfig
from postapi.util.DBHandler import DBHandler

from postapi.model.PackageType import PackageType
from postapi.model.Address import Address
from postapi.model.Package import Package
from postapi.model.ExpressPackage import ExpressPackage
from postapi.model.RegularPackage import RegularPackage
from postapi.model.LetterPackage import LetterPackage
from postapi.model.OutBoundPackage import OutBoundPackage
from postapi.model.ExpressPackageExtension import ExpressPackageExtension
from postapi.model.RegularPackageExtension import RegularPackageExtension

from postapi.controller.UtilController import mapUtilController
from postapi.controller.PackageController import mapPackageController

class RefactoredApplication:
	def __init__(self):
		self.config = getConfig()
		self.app = Flask(__name__)

	def run(self):
		if self.config['isCrossOrigin']: CORS(self.app)
		self.mapModel()
		self.mapController()
		self.app.run(host=self.config['host'], port=self.config['port'])
	
	def mapController(self):
		mapUtilController(self)
		mapPackageController(self)
	
	def mapModel(self):
		Package.registerCreate(PackageType.LETTER.value, LetterPackage.create)
		Package.registerCreate(PackageType.PACKAGE.value, RegularPackage.create)
		Package.registerCreate(PackageType.EXPRESS_PACKAGE.value, ExpressPackage.create)
		Package.registerCreate(PackageType.OUT_BOUND.value, OutBoundPackage.create)
		self.session: DBHandler = DBHandler(self.config)
		self.session.connect()
		self.session.modelList.append(Address)
		self.session.modelList.append(Package)
		self.session.modelList.append(ExpressPackageExtension)
		self.session.modelList.append(RegularPackageExtension)
		self.session.generateQuery()
		self.session.checkTable()


if __name__ == '__main__':
	application = RefactoredApplication()
	application.run()
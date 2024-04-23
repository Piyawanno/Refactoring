from postapi.model.EnvelopSize import EnvelopSize
from postapi.model.PackageCategory import PackageCategory
from postapi.model.PackageStatus import PackageStatus
from postapi.model.PackageType import PackageType
from postapi.model.ExpressPackage import ExpressPackage
from postapi.model.RegularPackage import RegularPackage
from postapi.model.LetterPackage import LetterPackage
from postapi.model.Package import Package

from postapi.model.Address import Address

def mapUtilController(main):
	from postapi.RefactoredApplication import RefactoredApplication
	application: RefactoredApplication = main
	get = application.app.get

	@get('/api/price/get')
	def getPriceMap():
		return {
			'ExpressPackage': ExpressPackage.getPriceMap(),
			'RegularPackage': RegularPackage.getPriceMap(),
			'LetterPackage': LetterPackage.getPriceMap(),
		}

	@get('/api/enum/get')
	def getEnum():
		return {
			'EnvelopSize': {i.name: i.value for i in EnvelopSize},
			'PackageCategory': {i.name: i.value for i in PackageCategory},
			'PackageStatus': {i.name: i.value for i in PackageStatus},
			'PackageType': {i.name: i.value for i in PackageType},
		}
	
	@get('/api/weight/get')
	def getWeight():
		return [[k.value, v] for k, v in Package.getWeightCategoryMap()]
	
	@get('/api/model/get')
	def getModel():
		result = {}
		for i in application.session.modelList:
			result[i.__name__] = i.__column_name__
		return result
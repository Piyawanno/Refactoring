from postapi.model.Address import Address
from postapi.model.PackageType import PackageType
from postapi.model.PackageCategory import PackageCategory
from postapi.util.Record import Record

from datetime import datetime
from typing import List

class Package (Record) :
	senderName: str
	senderAddress: Address
	sendDate: datetime
	receiverName: str
	receiverAddress: Address
	receiveDate: datetime
	price: float
	packageCategory: int
	status: int
	extension: int

	@staticmethod
	def create(data):
		category = data['packageCategory']
		if category == PackageType.EXPRESS_PACKAGE.value:
			from postapi.model.ExpressPackage import ExpressPackage
			from postapi.model.ExpressPackageExtension import ExpressPackageExtension
			package: ExpressPackage = ExpressPackage().fromDict(data)
			package.extension = ExpressPackageExtension().fromDict(data)
			package.packageCategory = Package.getWeightCategroy(package.extension.weight)

		elif category == PackageType.PACKAGE.value:
			from postapi.model.RegularPackage import RegularPackage
			from postapi.model.RegularPackageExtension import RegularPackageExtension
			package: RegularPackage = RegularPackage().fromDict(data)
			package.extension = RegularPackageExtension().fromDict(data)
			package.packageCategory = Package.getWeightCategroy(package.extension.weight)

		elif category == PackageType.PACKAGE.value:
			from postapi.model.LetterPackage import LetterPackage
			package = LetterPackage().fromDict(data)
			package.extension = None
		return package

	@staticmethod
	def getWeightCategroy(weight: float) -> PackageCategory:
		if weight < 5: return PackageCategory.PACKLET
		elif weight >=  5 and weight < 10: return PackageCategory.SMALL
		elif weight >= 10 and weight < 15: return PackageCategory.MEDIUM
		elif weight >= 15 and weight < 20: return PackageCategory.LARGE
		elif weight >= 20: return PackageCategory.EXTRA_LARGE


	def calculatePrice(self) -> float:
		raise NotImplementedError

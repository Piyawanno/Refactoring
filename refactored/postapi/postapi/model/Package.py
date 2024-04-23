from postapi.model.Address import Address
from postapi.model.PackageType import PackageType
from postapi.model.PackageCategory import PackageCategory
from postapi.util.Record import Record

from datetime import datetime
from typing import List, Tuple, Callable, Dict

PACKAGE_CREATE_MAP: Dict[int, Callable[[int], object]] = {}

class Package (Record) :
	senderName: str
	senderAddress: Address
	sendDate: datetime
	receiverName: str
	receiverAddress: Address
	receiveDate: datetime
	price: float
	packageType: int
	packageCategory: int
	status: int
	extension: int

	@staticmethod
	def registerCreate(packageType: int, creator: Callable[[int], object]):
		PACKAGE_CREATE_MAP[packageType] = creator

	@staticmethod
	def create(data):
		packageType = data['packageType']
		creator = PACKAGE_CREATE_MAP.get(packageType, None)
		print(PACKAGE_CREATE_MAP, packageType, creator)
		if creator is None: return None
		return creator(data)

	@staticmethod
	def getWeightCategoryMap() -> List[Tuple[PackageCategory, float]]:
		return [
			(PackageCategory.PACKLET, 5.0),
			(PackageCategory.SMALL, 10.0),
			(PackageCategory.MEDIUM, 15.0),
			(PackageCategory.LARGE, 20.0),
			(PackageCategory.EXTRA_LARGE, 100.0),
		]

	@staticmethod
	def getWeightCategory(weight: float) -> PackageCategory:
		map = Package.getWeightCategoryMap()
		for package, minimum in map:
			if weight < minimum: return package
		return PackageCategory

	def calculatePrice(self) -> float:
		raise NotImplementedError

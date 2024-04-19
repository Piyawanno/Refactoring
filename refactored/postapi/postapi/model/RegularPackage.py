from postapi.model.Package import Package
from postapi.model.PackageCategory import PackageCategory
from postapi.model.RegularPackageExtension import RegularPackageExtension

class RegularPackage (Package):
	extension: RegularPackageExtension

	@staticmethod
	def getPriceMap():
		return {
			PackageCategory.PACKLET: 0.20,
			PackageCategory.SMALL: 0.25,
			PackageCategory.MEDIUM: 0.30,
			PackageCategory.LARGE: 0.35,
			PackageCategory.EXTRA_LARGE: 0.40,
		}

	def calculatePrice(self) -> float:
		priceMap = RegularPackage.getPriceMap()
		price = priceMap.get(self.packageCategory)
		return self.extension.weight*price
from postapi.model.Package import Package
from postapi.model.ExpressPackageExtension import ExpressPackageExtension
from postapi.model.PackageCategory import PackageCategory

import math

class ExpressPackage (Package):
	extension: ExpressPackageExtension

	@staticmethod
	def getPriceMap():
		return {
			PackageCategory.PACKLET: 0.5,
			PackageCategory.SMALL: 0.6,
			PackageCategory.MEDIUM: 0.7,
			PackageCategory.LARGE: 0.8,
			PackageCategory.EXTRA_LARGE: 0.9,
		}

	def calculatePrice(self) -> float:
		priceMap = ExpressPackage.getPriceMap()
		price = priceMap.get(self.packageCategory)
		normalized = math.ceil(self.extension.distance/100.0)
		return self.extension.weight*normalized*price
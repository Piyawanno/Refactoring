from postapi.model.Package import Package
from postapi.model.EnvelopSize import EnvelopSize

class LetterPackage (Package):
	@staticmethod
	def getPriceMap():
		return {
			EnvelopSize.US_LETTER: 2.0,
			EnvelopSize.A5: 4.0,
			EnvelopSize.A4: 10.0
		}
	
	def calculatePrice(self) -> float:
		priceMap = LetterPackage.getPriceMap()
		return priceMap.get(self.packageCategory)
from postapi.util.Record import Record
from typing import List

class Address (Record):
	address: str
	district: str
	province: str
	postCode: str
	telephone: str
	
	@staticmethod
	def getIndex() -> List[str] :
		return []


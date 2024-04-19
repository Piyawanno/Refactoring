from typing import List, Dict, Any, get_type_hints

class Record:
	@staticmethod
	def getIndex() -> List[str] :
		return []
	
	def toDict(self) -> Dict[str, Any]:
		result = {}
		for i in self.__class__.__column_name__:
			attribute = getattr(self, i, None)
			if hasattr(attribute, 'toDict'):
				result[i] = attribute.toDict()
			else :
				result[i] = attribute
		return result
	
	def fromDict(self, data) -> object:
		typeHint = get_type_hints(self.__class__)
		for i in self.__class__.__column_name__:
			attribute = data.get(i, None)
			if isinstance(attribute, dict):
				hint = typeHint.get(i, None)
				if hint is None: continue
				setattr(self, i, hint().fromDict(attribute))
			else:
				setattr(self, i, attribute)
		return self
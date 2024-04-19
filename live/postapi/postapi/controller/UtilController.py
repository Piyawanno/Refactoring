from postapi.model.EnvelopSize import EnvelopSize
from postapi.model.PackageCategory import PackageCategory
from postapi.model.PackageType import PackageType
from postapi.model.PackageStatus import PackageStatus


def mapUtilController(app) :
	@app.get('/api/enum/get')
	def getEnum():
		return {
			'EnvelopSize': {i.name: i.value for i in EnvelopSize},
			'PackageCategory': {i.name: i.value for i in PackageCategory},
			'PackageStatus': {i.name: i.value for i in PackageStatus},
			'PackageType': {i.name: i.value for i in PackageType},
		}

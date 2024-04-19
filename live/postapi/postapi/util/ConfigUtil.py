import json

def getConfig() -> dict:
	import postapi
	path = f'{postapi.__path__[0]}/config.json'
	with open(path) as fd:
		return json.load(fd)
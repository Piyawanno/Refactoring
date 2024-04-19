from enum import IntEnum

class PackageStatus (IntEnum):
	REGISTERED = 10
	ON_TRANSPORT = 20
	RECEIVED = 30
	REJECTED = 40
	LOST = 50
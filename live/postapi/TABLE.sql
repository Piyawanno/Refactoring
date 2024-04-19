CREATE TABLE ExpressPackage(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	senderName VARCHAR(128),
	senderAddress TEXT,
	senderDistrict VARCHAR(128),
	senderProvince VARCHAR(128),
	senderPostCode CHAR(5),
	senderTelephone VARCHAR(16),
	receiverName VARCHAR(128),
	receiverAddress TEXT,
	receiverDistrict VARCHAR(128),
	receiverProvince VARCHAR(128),
	receiverPostCode CHAR(5),
	receiverTelephone VARCHAR(16),
	distance FLOAT,
	packageWeight FLOAT,
	packageCategory INTEGER,
	sendDate DATE,
	receiveDate DATE,
	price FLOAT,
	currentStatus INTEGER
);

CREATE TABLE Package(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	senderName VARCHAR(128),
	senderAddress TEXT,
	senderDistrict VARCHAR(128),
	senderProvince VARCHAR(128),
	senderPostCode CHAR(5),
	senderTelephone VARCHAR(16),
	receiverName VARCHAR(128),
	receiverAddress TEXT,
	receiverDistrict VARCHAR(128),
	receiverProvince VARCHAR(128),
	receiverPostCode CHAR(5),
	receiverTelephone VARCHAR(16),
	packageWeight FLOAT,
	packageCategory INTEGER,
	sendDate DATE,
	receiveDate DATE,
	price FLOAT,
	currentStatus INTEGER
);

CREATE TABLE Letter(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	senderName VARCHAR(128),
	senderAddress TEXT,
	senderDistrict VARCHAR(128),
	senderProvince VARCHAR(128),
	senderPostCode CHAR(5),
	senderTelephone VARCHAR(16),
	receiverName VARCHAR(128),
	receiverAddress TEXT,
	receiverDistrict VARCHAR(128),
	receiverProvince VARCHAR(128),
	receiverPostCode CHAR(5),
	receiverTelephone VARCHAR(16),
	packageCategory INTEGER,
	sendDate DATE,
	receiveDate DATE,
	price FLOAT,
	currentStatus INTEGER
);
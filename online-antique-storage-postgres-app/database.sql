CREATE TABLE categories(
	categoryId SERIAL,
	categoryName VARCHAR(25) NOT NULL,
	categoryDescription VARCHAR(100) DEFAULT 'No Description Available',
	categoryImage VARCHAR(30) DEFAULT 'assets/defaultCategory.jpg',

	PRIMARY KEY (categoryId)
);

CREATE TABLE subcategories(
	subCategoryId SERIAL,
	subCategoryName VARCHAR(25) NOT NULL,
	subCategoryDescription VARCHAR(100) DEFAULT 'No Description Available',
	subCategoryImage VARCHAR(30) DEFAULT 'assets/defaultCategory.jpg',

	categoryId int NOT NULL,
	
	PRIMARY KEY(subCategoryId),
	FOREIGN KEY(categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE product(
	productId SERIAL,
	productName VARCHAR(25) NOT NULL,
	productDescription VARCHAR(100) DEFAULT 'No Description Available.',
	productImage VARCHAR(30) DEFAULT 'assets/defaultProduct.jpg',
	subCategoryId int NOT NULL,

	price float NOT NULL,
	discountPercent int DEFAULT 0,
	discountPrice float DEFAULT NULL,
	
	reviewScore int DEFAULT 0,
	stock int DEFAULT 0,
	
	PRIMARY KEY (productId),
	FOREIGN KEY (subCategoryId) REFERENCES subCategories(subCategoryId)
);

CREATE TABLE users(
	userId SERIAL,
	username VARCHAR(15) NOT NULL,
	passwd VARCHAR (18) NOT NULL, --idealy hashed and salted
	
	firstName VARCHAR (15),
	lastName VARCHAR(15),
	address VARCHAR(200),
	contractNo VARCHAR(15),
	
	administrator boolean DEFAULT FALSE,
	
	PRIMARY KEY (userId)
);

CREATE TABLE orders(
	orderId SERIAL,
	cartItemId int NOT NULL,
	totalPrice float DEFAULT 0.00,
	userId int NOT NULL,
	
	PRIMARY KEY (orderId),
	FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE cartItem( -- many to one with order
	cartItemId SERIAL,
	orderId int NOT NULL,
	productId int NOT NULL,
	quantity int DEFAULT 1,
	
	PRIMARY KEY(cartItemId),
	FOREIGN KEY(productId) REFERENCES product(productId),
	FOREIGN KEY(orderId) REFERENCES orders(orderId)
);
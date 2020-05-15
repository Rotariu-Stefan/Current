DROP TABLE IF EXISTS DishData;
DROP TABLE IF EXISTS MealData;
DROP TABLE IF EXISTS FoodItems;
DROP TABLE IF EXISTS Meals;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	UserID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	Username VARCHAR(50) NOT NULL,
	Email VARCHAR(30) NOT NULL UNIQUE,
	Firstname VARCHAR(30) NOT NULL,
	Lastname VARCHAR(30) NOT NULL,
	DoB DATE NOT NULL,
	Sex BIT(1) NOT NULL,
	Describe VARCHAR(200) NULL,
	Pic VARCHAR(50) NULL,
	Default_Meals VARCHAR(100) NOT NULL DEFAULT 'Meal1,Meal2',
	Access VARCHAR(6) NOT NULL,
	Pass VARCHAR(30) NOT NULL,
	CONSTRAINT CH_Access CHECK(Access IN('Guest', 'User', 'Admin', 'SV'))
);

CREATE TABLE Notes(
	NoteID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	UserID INT NOT NULL,
	Title VARCHAR(20) NOT NULL DEFAULT 'NoteTitle',
	Score FLOAT NULL,
	NoteText VARCHAR(200) NULL,
	OfDay DATE NULL,
	CONSTRAINT CH_Score CHECK(Score BETWEEN -5 AND 5),
	CONSTRAINT FK_Notes_MadeBy FOREIGN KEY(UserID) REFERENCES Users(UserID)
);

CREATE TABLE Meals(
	MealID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	MealName VARCHAR(30) NOT NULL,
	TimeEaten DATE NOT NULL,
	Portion FLOAT NOT NULL DEFAULT 1,
	UserID INT NOT NULL,
	NoteID INT NULL,
	CONSTRAINT FK_Meals_EatenBy FOREIGN KEY(UserID) REFERENCES Users(UserID),
	CONSTRAINT FK_Meals_Note FOREIGN KEY(NoteID) REFERENCES Notes(NoteID)
);

CREATE TABLE FoodItems(
	FoodID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	FoodName VARCHAR(30) NOT NULL,
	Brand VARCHAR(30) NULL,
	Fat FLOAT NOT NULL,
	Carbs FLOAT NOT NULL,
	Protein FLOAT NOT NULL,
	SizeInfo INT NULL,
	UserID INT NOT NULL,
	Pic VARCHAR(50) NULL,
	Price INT NOT NULL DEFAULT 0,
	IsDish BIT(1) NOT NULL,
	NoteID INT NULL,
	CONSTRAINT FK_FoodItems_MadeBy FOREIGN KEY(UserID) REFERENCES Users(UserID),
	CONSTRAINT FK_FoodItems_Note FOREIGN KEY(NoteID) REFERENCES Notes(NoteID)
);

CREATE TABLE MealData(
	MealID INT NOT NULL,
	FoodID INT NOT NULL,
	Amount FLOAT NOT NULL,
	Measure VARCHAR(6) NOT NULL,
	CONSTRAINT CH_MealMeasure CHECK(Measure IN('Grams', 'Pieces')),
	CONSTRAINT PK_MealData PRIMARY KEY(MealID, FoodID),
	CONSTRAINT FK_MealData_Meal FOREIGN KEY(MealID) REFERENCES Meals(MealID),
	CONSTRAINT FK_MealData_Food FOREIGN KEY(FoodID) REFERENCES FoodItems(FoodID)
);

CREATE TABLE DishData(
	DishID INT NOT NULL,
	IngredientID INT NOT NULL,
	Amount FLOAT NOT NULL,
	Measure VARCHAR(6) NOT NULL,
	CONSTRAINT CH_DishMeasure CHECK(Measure IN('Grams', 'Pieces')),
	CONSTRAINT PK_DishData PRIMARY KEY(DishID, IngredientID),
	CONSTRAINT FK_DishData_Meal FOREIGN KEY(DishID) REFERENCES FoodItems(FoodID),
	CONSTRAINT FK_DishData_Food FOREIGN KEY(IngredientID) REFERENCES FoodItems(FoodID)
);

INSERT INTO Users VALUES (default, 'StravoS', 'stravos11@gmail.com', 'Stefan', 'Rotariu', '1987/12/17', B'1', 'Da Owner!', null, default, 'SV', 'svpass');
INSERT INTO Users VALUES (default, 'Mama', 'mama@email.com', 'Rodica', 'Rotariu', '1960/03/29', B'0', 'Da Mother!', null, 'Breakfast,Lunch,Dinner', 'User', 'mamapass');
INSERT INTO Users VALUES (default, 'Gori', 'gori@email.com', 'Alexandru', 'Mircea', '1986/08/03', B'1', 'Da Lag!', null, 'Lag1,Lag2', 'Admin', 'goripass');

INSERT INTO Notes (UserID, Title, Score, NoteText, OfDay)
SELECT u.UserID, 'Magic', 5, 'Omg it''s magical', null
FROM Users u
WHERE u.Username='StravoS';
INSERT INTO Notes (UserID, Title, Score, NoteText, OfDay)
SELECT u.UserID, 'Meh', 0, 'Whatever...', null
FROM Users u
WHERE u.Username='StravoS';
INSERT INTO Notes (UserID, Title, Score, NoteText, OfDay)
SELECT u.UserID, 'Bad', -5, 'Ouch...', null
FROM Users u
WHERE u.Username='StravoS';

INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal1Sv', '2020/02/22 11:11:11', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='StravoS' AND n.Title='Magic';
INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal2Sv', '2020/02/22 17:11:11', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='StravoS' AND n.Title='Meh';
INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal1Gr', '2020/02/23 12:12:12', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='Gori' AND n.Title='Bad';
INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal2Gr', '2020/02/23 18:12:12', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='Gori' AND n.Title='Meh';

INSERT INTO FoodItems VALUES (default, '_Vrajeala', 'Sv', 11, 11, 11, 11, (SELECT UserID FROM Users WHERE Username='StravoS'), null, -11, B'0', (SELECT NoteID FROM Notes WHERE Title='Magic'));
INSERT INTO FoodItems VALUES (default, '_Crap', 'Bodega', 1, 99, 1, 0, (SELECT UserID FROM Users WHERE Username='Gori'), null, 99, B'0', (SELECT NoteID FROM Notes WHERE Title='Bad'));
INSERT INTO FoodItems VALUES (default, '_CevaCeva', 'Mama', 25, 1, 24, null, (SELECT UserID FROM Users WHERE Username='Mama'), null, 23, B'1', (SELECT NoteID FROM Notes WHERE Title='Meh'));

INSERT INTO DishData
VALUES (3,1,100,'Grams'),
	(3,2,1,'Pieces');

INSERT INTO MealData
VALUES (1, 1, 2, 'Pieces'),
	(1, 3, 80, 'Grams'),
	(2, 1, 1, 'Pieces'),
	(2, 2, 1, 'Pieces'),
	(3, 2, 2, 'Pieces'),
	(3, 3, 120, 'Grams'),
	(4, 2, 1, 'Pieces'),
	(4, 1, 100, 'Grams');
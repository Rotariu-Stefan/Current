DROP TABLE IF EXISTS DayNotes;
DROP TABLE IF EXISTS DishData;
DROP TABLE IF EXISTS MealData;
DROP TABLE IF EXISTS FoodItems;
DROP TABLE IF EXISTS Meals;
DROP TABLE IF EXISTS Notes;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	UserID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	Username VARCHAR(50) NOT NULL UNIQUE,
	Email VARCHAR(30) NOT NULL UNIQUE,
	Firstname VARCHAR(30) NOT NULL,
	Lastname VARCHAR(30) NOT NULL,
	DoB DATE NOT NULL,
	Sex BIT(1) NOT NULL,
	Describe VARCHAR(200) NULL,
	Pic VARCHAR(50) NULL,
	DefaultMeals VARCHAR(100) NOT NULL DEFAULT 'Breakfast,Lunch,Dinner',
	Access VARCHAR(6) NOT NULL,
	Pass VARCHAR(30) NOT NULL,
	CONSTRAINT CH_Access CHECK(Access IN('Guest', 'User', 'Admin', 'SV'))
);

CREATE TABLE Notes(
	NoteID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	UserID INT NOT NULL,
	Title VARCHAR(20) NOT NULL DEFAULT 'Untitled',
	Score INT NOT NULL DEFAULT 0,
	NoteText VARCHAR(200) NULL,
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
	IsDish BOOL NOT NULL,
	NoteID INT NULL,
	CONSTRAINT FK_FoodItems_MadeBy FOREIGN KEY(UserID) REFERENCES Users(UserID),
	CONSTRAINT FK_FoodItems_Note FOREIGN KEY(NoteID) REFERENCES Notes(NoteID)
);

CREATE TABLE MealData(
	EntryID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	MealID INT NOT NULL,
	FoodID INT NOT NULL DEFAULT 1,
	Amount FLOAT NOT NULL,
	Measure VARCHAR(6) NOT NULL,
	CONSTRAINT CH_MealMeasure CHECK(Measure IN('Grams', 'Pieces')),
	CONSTRAINT FK_MealData_Meal FOREIGN KEY(MealID) REFERENCES Meals(MealID) ON DELETE CASCADE,
	CONSTRAINT FK_MealData_Food FOREIGN KEY(FoodID) REFERENCES FoodItems(FoodID) ON DELETE SET DEFAULT
);

CREATE TABLE DishData(
	EntryID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	DishID INT NOT NULL,
	IngredientID INT NOT NULL DEFAULT 1,
	Amount FLOAT NOT NULL,
	Measure VARCHAR(6) NOT NULL,
	CONSTRAINT CH_DishMeasure CHECK(Measure IN('Grams', 'Pieces')),
	CONSTRAINT FK_DishData_Dish FOREIGN KEY(DishID) REFERENCES FoodItems(FoodID) ON DELETE CASCADE,
	CONSTRAINT FK_DishData_Food FOREIGN KEY(IngredientID) REFERENCES FoodItems(FoodID) ON DELETE SET DEFAULT
);

CREATE TABLE DayNotes(
	DayDate DATE NOT NULL PRIMARY KEY,
	NoteID INT NOT NULL,
	CONSTRAINT FK_DayNotes_Note FOREIGN KEY(NoteID) REFERENCES Notes(NoteID)
);

INSERT INTO Users VALUES (default, 'StravoS', 'stravos11@gmail.com', 'Stefan', 'Rotariu', '1987/12/17', B'1', 'Da Owner!', null, default, 'SV', 'svpass');
INSERT INTO Users VALUES (default, 'Mama', 'mama@email.com', 'Rodica', 'Rotariu', '1960/03/29', B'0', 'Da Mother!', null, 'Breakfast,Lunch,Dinner', 'User', 'mamapass');
INSERT INTO Users VALUES (default, 'Gori', 'gori@email.com', 'Alexandru', 'Mircea', '1988/08/03', B'1', 'Da Lag!', null, 'Lag1,Lag2', 'Admin', 'goripass');

INSERT INTO Notes (UserID, Title, Score, NoteText)
SELECT u.UserID, 'Magic', 5, 'Omg it''s magical'
FROM Users u
WHERE u.Username='StravoS';
INSERT INTO Notes (UserID, Title, Score, NoteText)
SELECT u.UserID, 'Meh', 0, 'Whatever...'
FROM Users u
WHERE u.Username='StravoS';
INSERT INTO Notes (UserID, Title, Score, NoteText)
SELECT u.UserID, 'Bad', -5, 'Ouch...'
FROM Users u
WHERE u.Username='StravoS';

INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal1Sv', '2020/02/22', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='StravoS' AND n.Title='Magic';
INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal2Sv', '2020/02/22', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='StravoS' AND n.Title='Meh';
INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal1Gr', '2020/02/23', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='Gori' AND n.Title='Bad';
INSERT INTO Meals (MealName, TimeEaten, Portion, UserID, NoteID)
SELECT '_Meal2Gr', '2020/02/23', 1, u.UserID, n.NoteID
FROM Users u, Notes n
WHERE u.Username='Gori' AND n.Title='Meh';

INSERT INTO FoodItems VALUES (default, '_Vrajeala', 'Sv', 11, 11, 11, 11, (SELECT UserID FROM Users WHERE Username='StravoS'), null, -11, false, (SELECT NoteID FROM Notes WHERE Title='Magic'));
INSERT INTO FoodItems VALUES (default, '_Crap', 'Bodega', 1, 99, 1, 0, (SELECT UserID FROM Users WHERE Username='Gori'), null, 99, false, (SELECT NoteID FROM Notes WHERE Title='Bad'));
INSERT INTO FoodItems VALUES (default, '_CevaCeva', 'Mama', 25, 1, 24, null, (SELECT UserID FROM Users WHERE Username='Mama'), null, 23, true, (SELECT NoteID FROM Notes WHERE Title='Meh'));

INSERT INTO MealData (MealID, FoodID, Amount, Measure)
VALUES (1, 1, 2, 'Pieces'),
	(1, 3, 80, 'Grams'),
	(2, 1, 1, 'Pieces'),
	(2, 2, 1, 'Pieces'),
	(3, 2, 2, 'Pieces'),
	(3, 3, 120, 'Grams'),
	(4, 2, 1, 'Pieces'),
	(4, 1, 100, 'Grams');

INSERT INTO DishData (DishID, IngredientID, Amount, Measure)
VALUES (3,1,100,'Grams'),
	(3,2,1,'Pieces');
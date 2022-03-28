CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE drinks (
  ID SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INT,
  ingredients TEXT,
  volume TEXT,
  available BOOLEAN
  -- category INT NOT NULL REFERENCES categories (ID),
);

CREATE TABLE category_drinks (
  category INT NOT NULL REFERENCES categories(ID),
  drink INT NOT NULL REFERENCES drinks(ID)
);

CREATE TABLE categories (
  ID SERIAL PRIMARY KEY,
  name TEXT UNIQUE
);

INSERT INTO users (username, password)
  VALUES
    ('Espen', '1234');
    
INSERT INTO drinks (name, price, ingredients, available)
    VALUES ('Margarita', 158, 'Tequila, Cointreau, Lime juice, Salt', true);

INSERT INTO drinks (name, price, ingredients, available)
    VALUES ('Paloma', 158, 'Tequila, Grape Fruit', true);

INSERT INTO drinks (name, price, volume, available)
    VALUES ('Brooklyn IPA', 128, '33Cl', true);

INSERT INTO drinks (name, price, volume, available)
    VALUES ('Frydenlund', 98, '50CL', true);

INSERT INTO category_drinks (category, drink)
  VALUES (1, 1), (1, 2), (4, 3), (3, 4);


INSERT INTO categories (name)
VALUES 
  ('Classic Cocktails'),
  ('Drinks'),
  ('Draft Beer'),
  ('Bottle Beer');


SELECT * FROM drinks AS d
JOIN category_drinks AS cd ON d.id = cd.drink;
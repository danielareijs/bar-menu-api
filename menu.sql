CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE drinks (
  ID SERIAL PRIMARY KEY,
  category INT NOT NULL REFERENCES categories (ID),
  name TEXT NOT NULL,
  price INT,
  ingredients TEXT[],
  volume TEXT,
  available BOOLEAN
);

CREATE TABLE categories (
  ID SERIAL PRIMARY KEY,
  name TEXT UNIQUE
);

INSERT INTO users (username, password)
  VALUES
    ('Espen', '1234');
    
INSERT INTO drinks (name, category, price, ingredients, available)
    VALUES ('Margarita', 1, 158, '{"Tequila", "Cointreau", "Lime juice", "Salt"}', true);

INSERT INTO categories (name)
VALUES 
  ('Classic Cocktails'),
  ('Drinks'),
  ('Draft Beer'),
  ('Bottle Beer');

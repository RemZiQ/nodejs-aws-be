CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE IF NOT EXISTS products (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               text NOT NULL,
  description         text,
  price               integer,
  image               text NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
  products_id         uuid,
  count               integer NOT NULL
  FOREIGN KEY(products_id) REFERENCES products(id),
);

INSERT INTO products (title, description, price, image) values 
('Kona Operator', 'dh bike', 6849, 'https://images.konaworld.com/2021/med/operator_cr.jpg'),
('Kona Remote 160', 'electro bike', 9849,  'https://images.konaworld.com/2021/med/remote_160.jpg'),
('Kona Hei Hei', 'bike bike', 4449, 'https://images.konaworld.com/2021/med/hei_hei.jpg'),
('Kona Hei Hei CR', 'bike bike', 4449, 'https://images.konaworld.com/2021/med/hei_hei_cr_dl.jpg'),
('Kona Shonky', 'dirt bike', 3179, 'https://images.konaworld.com/2021/med/shonky.jpg'),
('Kona Honzo', 'kid bike', 899, 'https://images.konaworld.com/2021/med/honzo_24.jpg')

INSERT INTO stocks (products_id, count) values 
('a3593202-144d-4574-bf9c-417873467eb5', 3),
('88c5eb5e-4c17-430b-bc2a-505933c52707', 1),
('b04cf4d3-cc57-4a9b-b4eb-20b060bcc28c', 2),
('f4724ef8-3e3e-4b11-9923-e7103f4b6e17', 3),
('782e574e-089e-44a6-90b7-84838c6f3263', 7),
('8b6b1d4f-5e69-4153-b4a9-187f4ba20329', 4)

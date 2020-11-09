export const insertProductQuery = `INSERT INTO products (title, description, price, image) VALUES($1, $2, $3, $4) RETURNING id`;

export const insertStocksQuery = `INSERT INTO stocks (products_id, count) VALUES($1, $2)`;
export const getAllProductsQuery = 'SELECT * FROM products p LEFT JOIN stocks s ON p.id = s.products_id';

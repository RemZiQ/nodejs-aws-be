import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client, ClientConfig } from 'pg';
import 'source-map-support/register';
import { insertProductQuery, insertStocksQuery } from './constants';
import { getCorsHeaders } from '../../helpers/getCorsHeaders';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions: ClientConfig = {
  host: PG_HOST,
  port: parseInt(PG_PORT, 10),
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const addProduct: APIGatewayProxyHandler = async (event, _context) => {
  // emulate lambda calling logging
  console.log(event);
  const corsHeaders = getCorsHeaders();
  const product = event?.body && JSON.parse(event.body);

  if (!(product && product.title && product.description
    && product.price && product.image && product.count
  )) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Bad Request' }),
    }
  }

  const client = new Client(dbOptions);
  await client.connect();

  try {
    await client.query('BEGIN');
    const { title, description, price, image, count } = product;
    const { rows } = await client.query(insertProductQuery, [title, description, price, image]);
    const [{ id }] = rows;
    await client.query(insertStocksQuery, [id, count]);
    await client.query('COMMIT');
    return {
      statusCode: 201,
      headers: getCorsHeaders(),
      body: JSON.stringify({ message: `${title} created success` }),
    };
  } catch (e) {
    // emulate error logging
    console.error(e);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: `Internal server error` }),
    }

  } finally {
    client.end();
  }
}

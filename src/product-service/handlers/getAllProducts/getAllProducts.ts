import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client, ClientConfig } from 'pg';
import 'source-map-support/register';
import { getAllProductsQuery } from './constants';
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

export const getAllProducts: APIGatewayProxyHandler = async (event, _context) => {
  // emulate lambda calling logging
  console.log(event);
  const client = new Client(dbOptions);
  await client.connect();
  const corsHeaders = getCorsHeaders();
  try {
    const { rows: products } = await client.query(getAllProductsQuery);
    console.log('___products', products);
    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify(products),
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

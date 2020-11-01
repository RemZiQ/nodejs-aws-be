import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import products from '../../mocks/products.json';
import { getCorsHeaders } from '../../helpers/getCorsHeaders';

export const getAllProducts: APIGatewayProxyHandler = async (_, _context) => {
  return {
    statusCode: 200,
    headers: getCorsHeaders(),
    body: JSON.stringify(products),
  };
}

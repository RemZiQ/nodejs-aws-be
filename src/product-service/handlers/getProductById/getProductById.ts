import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import productsMock from '../../mocks/products.json';
import { Product } from '../../mocks/types';
import { getCorsHeaders } from '../../helpers/getCorsHeaders';

// emulate async fetching
const asyncGetProductById = (id: string): Promise<Product | undefined> => {
  return new Promise(res => {
    setTimeout(() => {
      res(productsMock.find(product => product.id === id));
    }, 0);
  })
}

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const { productId } = event.pathParameters;
  const corsHeaders = getCorsHeaders();
  try {
    const product = await asyncGetProductById(productId);
    if (!product) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ message: `Product ${productId} isn't found` }),
      }
    }
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(product),
    };
  } catch (e) {
    // log error
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: `Internal server error` }),
    }
  }
}

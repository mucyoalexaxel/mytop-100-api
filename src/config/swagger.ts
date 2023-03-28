import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import FastifySwagger from '@fastify/swagger';
import * as dotenv from 'dotenv';

dotenv.config();
const { CLIENT_URL } = process.env;

export async function setupSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('My Top 100 Movies API')
    .setDescription('API for managing the top 100 movies of users')
    .setVersion('1.0')
    .addTag('movies')
    .addBearerAuth() // Add authentication support
    .setContact(
      'Alex Axel Mucyo',
      'your.website.com',
      'mucyoalexaxel@gmail.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    // .addServer('https://{environment}.api.example.com', 'API server with environment-based URL') // Add server information
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const fastifyInstance = app.getHttpAdapter().getInstance() as FastifyAdapter;
  console.log(CLIENT_URL);
  await fastifyInstance.register(FastifySwagger, {
    mode: 'static',
    specification: {
      document,
    },
    exposeRoute: true,
    routePrefix: '/api/docs',
    uiConfig: {
      deepLinking: true,
      displayOperationId: true,
      displayRequestDuration: true,
    },
    swaggerOptions: {
      info: config,
      servers: [{ url: `${CLIENT_URL}` }],
      schemes: ['http', 'https'],
      components: document.components,
      paths: document.paths,
      tags: config.tags,
    },
  });
}

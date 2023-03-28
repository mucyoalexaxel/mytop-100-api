import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';

dotenv.config();
const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  setupSwagger(app);
  await app.listen(PORT);
  console.log(`🍏 Server 🏃 running on ${await app.getUrl()} ... 🚢`);
}
bootstrap();

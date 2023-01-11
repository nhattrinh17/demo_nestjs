import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './models';

const PORT = process.env.SERVER_HOST || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'https://facebook.com' });
    await app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
}
bootstrap();

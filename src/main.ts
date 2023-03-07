import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: false,
      exceptionFactory: (errors) => {
        const errorsForResponse = [];
        errors.map((e) => {
          const constraintsKeys = Object.keys(e.constraints);
          constraintsKeys.forEach((k) =>
            errorsForResponse.push({
              field: e.property,
              message: e.constraints[k],
            }),
          );
        });
        throw new BadRequestException(errorsForResponse);
      },
    }),
  );

  await app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
  });
}
bootstrap();

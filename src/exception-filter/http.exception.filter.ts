import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 400 || status === 401) {
      const responseBody: any = exception.getResponse();
      if (typeof responseBody.message === 'string') {
        return response.status(status).send({
          errorsMessages: [
            {
              message: `${responseBody.message}`,
            },
          ],
        });
      }
      return response
        .status(status)
        .json({ errorsMessages: responseBody.message });
    }

    response.status(status).json({
      statusCode: status,
    });
  }
}

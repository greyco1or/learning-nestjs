import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NestJS!';
  }

  getHi(): string {
    return 'Hi NestJS!';
  }
}

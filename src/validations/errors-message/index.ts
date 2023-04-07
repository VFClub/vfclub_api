import { HttpException, HttpStatus } from '@nestjs/common';

export function notFoundMessage(message: string): string {
  throw new HttpException(message, HttpStatus.NOT_FOUND);
}

export function badRequestMessage(message: string): string {
  throw new HttpException(message, HttpStatus.BAD_REQUEST);
}

import { LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export class CustomLoggerService implements LoggerService {
  private readonly winstonLogger;

  constructor() {
    const logDir = './logs';
    if (!existsSync(logDir)) {
      mkdirSync(logDir);
    }

    this.winstonLogger = createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf((info) => `${info.timestamp} ${JSON.stringify(info)}`),
      ),
      transports: [
        new transports.File({
          filename: join(logDir, 'application.log'),
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
    });
  }

  log(message: string) {
    this.winstonLogger.log({
      level: 'info',
      message,
    });
  }

  error(message: string, trace: string) {
    this.winstonLogger.log({
      level: 'error',
      message,
      stack: trace,
    });
  }

  warn(message: string) {
    this.winstonLogger.log({
      level: 'warn',
      message,
    });
  }

  debug(message: string) {
    this.winstonLogger.log({
      level: 'debug',
      message,
    });
  }

  verbose(message: string) {
    this.winstonLogger.log({
      level: 'verbose',
      message,
    });
  }
}

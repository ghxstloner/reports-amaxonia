import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

// Configuración del Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(), // Log en la consola
    new winston.transports.DailyRotateFile({
      dirname: path.join(__dirname, '../../logs'), // Carpeta de logs
      filename: 'application-%DATE%.log', // Formato del nombre de archivo
      datePattern: 'YYYY-MM-DD', // Patron diario de archivo
      maxFiles: '1d',
    }),
  ],
});

export const logInfo = (message: string) => {
  logger.info(message);
};

export const logError = (message: string) => {
  logger.error(message);
};

export const logDebug = (message: string) => {
  logger.debug(message);
};

export default logger;

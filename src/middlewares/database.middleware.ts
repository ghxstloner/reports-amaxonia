import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from 'src/entities';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  private dataSources: { [key: string]: DataSource } = {};

  async use(req: Request, res: Response, next: NextFunction) {
    const databaseName = req.headers['x-database-name'] as string;

    if (!databaseName) {
      return res.status(400).json({ message: 'No database name provided in the header' });
    }

    try {
      if (!this.dataSources[databaseName]) {
        const newDataSource = new DataSource({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: databaseName,
          entities: Object.values(entities),          
          synchronize: false,
          logging: false,
        } as DataSourceOptions);

        await newDataSource.initialize();
        this.dataSources[databaseName] = newDataSource;
      }

      req['dbConnection'] = this.dataSources[databaseName].manager;

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error connecting to database', error });
    }
  }
}

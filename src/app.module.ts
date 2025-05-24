import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjs',
      password: 'nestjs',
      database: 'nestjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}

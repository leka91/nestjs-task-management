import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [TasksModule, DbModule],
})
export class AppModule {}

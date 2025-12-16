import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/';

@Module({
  imports: [ModulesModule],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { ModulesRepository } from './modules.repository';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, ModulesRepository],
})
export class ModulesModule { }

import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { LearningModulesService } from './learning-modules.service';
import type { LearningModule } from './learning-module.interface';

@Controller('api/modules')
export class LearningModulesController {
  constructor(private readonly modulesService: LearningModulesService) { }

  // GET /api/modules/stats 
  @Get('stats')
  getStats() {
    return this.modulesService.getStatistics();
  }

  // GET /api/modules
  @Get()
  getAllModules(): LearningModule[] {
    return this.modulesService.getAllModules();
  }

  // PATCH /api/modules/:id
  @Patch(':id')
  updateModule(
    @Param('id') id: string,
    @Body() body: { completed?: boolean },
  ): LearningModule {
    // If completed is provided, set it; otherwise toggle
    let updatedModule: LearningModule | null;

    if (body.completed !== undefined) {
      updatedModule = this.modulesService.updateModuleCompleted(
        id,
        body.completed,
      );
    } else {
      updatedModule = this.modulesService.toggleModuleCompleted(id);
    }

    if (!updatedModule) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return updatedModule;
  }

}

import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import type { LearningModule, UpdateModuleDto } from '../../../shared/src';

// NOTE: Service (HTTP Layer)

@Controller('api/modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) { }

  // PUT SPECIFIC ROUTES FIRST
  // GET /api/modules/stats
  @Get('stats')
  getStats() {
    return this.modulesService.getStatistics();
  }

  // THEN PUT DYNAMIC ROUTES
  // GET /api/modules
  @Get()
  getAllModules(): LearningModule[] {
    return this.modulesService.getAllModules();
  }

  // PATCH /api/modules/:id
  @Patch(':id')
  updateModule(
    @Param('id') id: string,
    @Body() body: UpdateModuleDto,
  ): LearningModule {
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

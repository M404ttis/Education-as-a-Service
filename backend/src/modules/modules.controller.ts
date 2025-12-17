import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import type { UpdateModuleDto } from '../../../shared/src';
import type { LearningModule } from '../../../shared/src';

@Controller('api/modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) { }

  // GET /api/modules?search=keyword&category=AI
  @Get()
  getAllModules(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ): LearningModule[] {
    return this.modulesService.searchModules(search, category);
  }

  // GET /api/modules/stats
  @Get('stats')
  getStats() {
    return this.modulesService.getStatistics();
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

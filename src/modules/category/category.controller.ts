import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { Roles } from '@/decorators';

import { JwtAuthGuard, RoleGuard } from '../auth';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import {
  CategoryConflictResponse,
  CategoryCreateBadRequestResponse,
  CategoryMessageResponse,
  CategoryNotFoundResponse,
  CategoryOkResponse,
  CategoryWithMessageResponse,
} from './types/category.responses';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CategoryWithMessageResponse })
  @ApiBadRequestResponse({ type: CategoryCreateBadRequestResponse })
  @ApiConflictResponse({ type: CategoryConflictResponse })
  public async create(@Body() dto: CreateCategoryDto) {
    const category = await this._categoryService.create(dto);

    return category;
  }

  @Get()
  @ApiOkResponse({ type: CategoryOkResponse, isArray: true })
  public async getAll() {
    const category = await this._categoryService.getAll();

    return category;
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: CategoryWithMessageResponse })
  @ApiBadRequestResponse({ type: CategoryNotFoundResponse })
  @ApiConflictResponse({ type: CategoryConflictResponse })
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const category = await this._categoryService.update(id, dto);

    return category;
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: CategoryMessageResponse })
  @ApiBadRequestResponse({ type: CategoryNotFoundResponse })
  public async delete(@Param('id') id: string) {
    const category = await this._categoryService.delete(id);

    return category;
  }
}

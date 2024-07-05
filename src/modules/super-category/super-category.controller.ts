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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { Roles } from '@/decorators';

import { JwtAuthGuard, RoleGuard } from '../auth';
import './dto';
import {
  AddSubcategoryDto,
  CreateSuperCategoryDto,
  RemoveSubcategoryDto,
  UpdateSuperCategoryDto,
} from './dto';
import { SuperCategoryService } from './super-category.service';
import {
  SuperCategoryBadRequestResponse,
  SuperCategoryConflictResponse,
  SuperCategoryFullResponse,
  SuperCategoryMessageResponse,
  SuperCategoryNotFoundResponse,
  SuperCategoryResponse,
  SuperCategoryWithMessageResponse,
  SuperCategoryWithSubcategoriesResponse,
} from './types/super-category.responses';

@Controller('super-category')
@ApiTags('super category')
export class SuperCategoryController {
  constructor(private readonly _superCategoryService: SuperCategoryService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SuperCategoryResponse })
  @ApiConflictResponse({ type: SuperCategoryConflictResponse })
  @ApiBadRequestResponse({ type: SuperCategoryBadRequestResponse })
  public async create(@Body() dto: CreateSuperCategoryDto) {
    const superSubcategory = await this._superCategoryService.create(dto);

    return superSubcategory;
  }

  @Post('add/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SuperCategoryMessageResponse })
  @ApiNotFoundResponse({ type: SuperCategoryNotFoundResponse })
  @ApiBadRequestResponse({ type: SuperCategoryBadRequestResponse })
  public async addCategory(
    @Param('id') id: string,
    @Body() dto: AddSubcategoryDto,
  ) {
    const superCategory =
      await this._superCategoryService.addCategoryToSuperSubcategory(id, dto);

    return superCategory;
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    type: SuperCategoryWithSubcategoriesResponse,
    isArray: true,
  })
  public async getAll() {
    const superCategories = await this._superCategoryService.getAll();

    return superCategories;
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: SuperCategoryFullResponse,
  })
  @ApiNotFoundResponse({ type: SuperCategoryNotFoundResponse })
  public async getOne(@Param('id') id: string) {
    const superCategory = await this._superCategoryService.getOne(id);

    return superCategory;
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuperCategoryWithMessageResponse })
  @ApiNotFoundResponse({ type: SuperCategoryNotFoundResponse })
  @ApiConflictResponse({ type: SuperCategoryConflictResponse })
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateSuperCategoryDto,
  ) {
    const superSubcategory = await this._superCategoryService.update(id, dto);

    return superSubcategory;
  }

  @Delete(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuperCategoryMessageResponse })
  @ApiNotFoundResponse({ type: SuperCategoryNotFoundResponse })
  public async delete(@Param('id') id: string) {
    const message = await this._superCategoryService.delete(id);

    return message;
  }

  @Delete('remove/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuperCategoryMessageResponse })
  @ApiNotFoundResponse({ type: SuperCategoryNotFoundResponse })
  @ApiBadRequestResponse({ type: SuperCategoryBadRequestResponse })
  public async removeCategory(
    @Param('id') id: string,
    @Body() dto: RemoveSubcategoryDto,
  ) {
    const message =
      await this._superCategoryService.removeCategoryFromSuperSubcategory(
        id,
        dto,
      );

    return message;
  }
}

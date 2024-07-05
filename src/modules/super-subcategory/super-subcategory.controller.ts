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
import {
  AddCategoryDto,
  CreateSuperSubcategoryDto,
  UpdateSuperSubcategoryDto,
} from './dto';
import { RemoveCategoryDto } from './dto/remove-category.dto';
import { SuperSubcategoryService } from './super-subcategory.service';
import {
  SuperSubcategoryBadRequestResponse,
  SuperSubcategoryConflictResponse,
  SuperSubcategoryMessageResponse,
  SuperSubcategoryNotFoundResponse,
  SuperSubcategoryResponse,
  SuperSubcategoryWithCategoriesResponse,
  SuperSubcategoryWithMessageResponse,
} from './types/super-subcategory.responses';

@Controller('super-subcategory')
@ApiTags('super subcategory')
export class SuperSubcategoryController {
  constructor(
    private readonly _superSubcategoryService: SuperSubcategoryService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SuperSubcategoryResponse })
  @ApiConflictResponse({ type: SuperSubcategoryConflictResponse })
  @ApiBadRequestResponse({ type: SuperSubcategoryBadRequestResponse })
  public async create(@Body() dto: CreateSuperSubcategoryDto) {
    const superSubcategory = await this._superSubcategoryService.create(dto);

    return superSubcategory;
  }

  @Post('add/:id')
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SuperSubcategoryMessageResponse })
  @ApiNotFoundResponse({ type: SuperSubcategoryNotFoundResponse })
  public async addCategory(
    @Param('id') id: string,
    @Body() dto: AddCategoryDto,
  ) {
    const superSubcategory =
      await this._superSubcategoryService.addCategoryToSuperSubcategory(
        id,
        dto,
      );

    return superSubcategory;
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    type: SuperSubcategoryWithCategoriesResponse,
    isArray: true,
  })
  public async getAll() {
    const superSubcategories = await this._superSubcategoryService.getAll();

    return superSubcategories;
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuperSubcategoryWithMessageResponse })
  @ApiNotFoundResponse({ type: SuperSubcategoryNotFoundResponse })
  @ApiConflictResponse({ type: SuperSubcategoryConflictResponse })
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateSuperSubcategoryDto,
  ) {
    const superSubcategory = await this._superSubcategoryService.update(
      id,
      dto,
    );

    return superSubcategory;
  }

  @Delete(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuperSubcategoryMessageResponse })
  @ApiNotFoundResponse({ type: SuperSubcategoryNotFoundResponse })
  public async delete(@Param('id') id: string) {
    const message = await this._superSubcategoryService.delete(id);

    return message;
  }

  @Delete('remove/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuperSubcategoryMessageResponse })
  @ApiNotFoundResponse({ type: SuperSubcategoryNotFoundResponse })
  public async removeCategory(
    @Param('id') id: string,
    @Body() dto: RemoveCategoryDto,
  ) {
    const message =
      await this._superSubcategoryService.removeCategoryFromSuperSubcategory(
        id,
        dto,
      );

    return message;
  }
}

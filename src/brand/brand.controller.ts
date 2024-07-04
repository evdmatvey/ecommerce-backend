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

import { JwtAuthGuard, RoleGuard } from '@/auth';
import { Roles } from '@/decorators';

import { BrandService } from './brand.service';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import {
  BrandConflictResponse,
  BrandCreateBadRequestResponse,
  BrandCreateResponse,
  BrandMessageResponse,
  BrandNotFoundResponse,
  BrandResponse,
  BrandUpdateResponse,
} from './types/brand.responses';

@Controller('brand')
@ApiTags('brand')
export class BrandController {
  constructor(private readonly _brandService: BrandService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BrandCreateResponse })
  @ApiBadRequestResponse({ type: BrandCreateBadRequestResponse })
  @ApiConflictResponse({ type: BrandConflictResponse })
  public async create(@Body() dto: CreateBrandDto) {
    const category = await this._brandService.create(dto);

    return category;
  }

  @Get()
  @ApiOkResponse({ type: BrandResponse, isArray: true })
  public async getAll() {
    const category = await this._brandService.getAll();

    return category;
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: BrandUpdateResponse })
  @ApiNotFoundResponse({ type: BrandNotFoundResponse })
  @ApiConflictResponse({ type: BrandConflictResponse })
  public async update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    const category = await this._brandService.update(id, dto);

    return category;
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiOkResponse({ type: BrandMessageResponse })
  @ApiNotFoundResponse({ type: BrandNotFoundResponse })
  public async delete(@Param('id') id: string) {
    const category = await this._brandService.delete(id);

    return category;
  }
}

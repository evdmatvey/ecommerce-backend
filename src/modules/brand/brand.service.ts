import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Brand } from '@prisma/client';

import { IntlService, PrismaService } from '@/services';

import { CreateBrandDto, UpdateBrandDto } from './dto';

@Injectable()
export class BrandService {
  constructor(
    private readonly _intl: IntlService,
    private readonly _client: PrismaService,
  ) {}

  public async getById(id: string): Promise<Brand> {
    const brand = await this._client.brand.findFirst({ where: { id } });

    return brand;
  }

  public async getByTitle(title: string): Promise<Brand> {
    const brand = await this._client.brand.findFirst({ where: { title } });

    return brand;
  }

  public async getAll(): Promise<Brand[]> {
    const brands = await this._client.brand.findMany();

    return brands;
  }

  public async create(
    dto: CreateBrandDto,
  ): Promise<{ brand: Brand; message: string }> {
    const existedBrand = await this.getByTitle(dto.title);

    if (existedBrand)
      throw new ConflictException(
        this._intl.translate('errors.BRAND_ALREADY_EXIST'),
      );

    const brand = await this._client.brand.create({ data: dto });

    return {
      brand,
      message: this._intl.translate('messages.BRAND_CREATE_SUCCESS'),
    };
  }

  public async update(
    id: string,
    dto: UpdateBrandDto,
  ): Promise<{ brand: Brand; message: string }> {
    const existedBrand = await this.getById(id);

    if (!existedBrand)
      throw new NotFoundException(
        this._intl.translate('errors.BRAND_NOT_FOUND'),
      );

    const isTitleAlreadyUse = await this.getByTitle(dto.title);

    if (isTitleAlreadyUse)
      throw new ConflictException(
        this._intl.translate('errors.BRAND_ALREADY_EXIST'),
      );

    const updatedBrand = await this._client.brand.update({
      where: { id },
      data: dto,
    });

    return {
      brand: updatedBrand,
      message: this._intl.translate('messages.BRAND_UPDATE_SUCCESS'),
    };
  }

  public async delete(id: string): Promise<{ message: string }> {
    const existedBrand = await this.getById(id);

    if (!existedBrand)
      throw new NotFoundException(
        this._intl.translate('errors.BRAND_NOT_FOUND'),
      );

    await this._client.brand.delete({ where: { id } });

    return { message: this._intl.translate('messages.BRAND_DELETE_SUCCESS') };
  }
}

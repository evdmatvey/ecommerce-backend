import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryErrors, CategoryMessages } from '@/constants';
import { PrismaService } from '@/services';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly _client: PrismaService) {}

  public async getById(id: string) {
    const category = await this._client.category.findFirst({ where: { id } });

    return category;
  }

  public async getAll() {
    const categories = await this._client.category.findMany();

    return categories;
  }

  public async getByTitle(title: string) {
    const category = await this._client.category.findFirst({
      where: { title },
    });

    return category;
  }

  public async create(dto: CreateCategoryDto) {
    const existedCategory = await this.getByTitle(dto.title);

    if (existedCategory)
      throw new ConflictException(CategoryErrors.CATEGORY_ALREADY_EXIST);

    const category = await this._client.category.create({ data: dto });

    return { category, message: CategoryMessages.CATEGORY_CREATE_SUCCESS };
  }

  public async update(id: string, dto: UpdateCategoryDto) {
    const isCategoryExist = await this._client.category.findFirst({
      where: { id },
    });

    if (!isCategoryExist)
      throw new NotFoundException(CategoryErrors.CATEGORY_NOT_FOUND);

    const isTitleAlreadyUse = await this.getByTitle(dto.title);

    if (isTitleAlreadyUse)
      throw new ConflictException(CategoryErrors.CATEGORY_ALREADY_EXIST);

    const updatedCategory = await this._client.category.update({
      where: { id },
      data: dto,
    });

    return {
      category: updatedCategory,
      message: CategoryMessages.CATEGORY_UPDATE_SUCCESS,
    };
  }

  public async delete(id: string) {
    const isCategoryExist = await this._client.category.findFirst({
      where: { id },
    });

    if (!isCategoryExist)
      throw new NotFoundException(CategoryErrors.CATEGORY_NOT_FOUND);

    await this._client.category.delete({ where: { id } });

    return { message: CategoryMessages.CATEGORY_DELETE_SUCCESS };
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IntlService, PrismaService } from '@/services';

import { CategoryService } from '../category';
import {
  AddCategoryDto,
  CreateSuperSubcategoryDto,
  UpdateSuperSubcategoryDto,
} from './dto';
import { RemoveCategoryDto } from './dto/remove-category.dto';

@Injectable()
export class SuperSubcategoryService {
  constructor(
    private readonly _intl: IntlService,
    private readonly _client: PrismaService,
    private readonly _categoryService: CategoryService,
  ) {}

  public async getByTitle(title: string) {
    const superSubcategory = await this._client.superSubcategory.findFirst({
      where: { title },
    });

    return superSubcategory;
  }

  public async getById(id: string) {
    const superSubcategory = await this._client.superSubcategory.findFirst({
      where: { id },
    });

    return superSubcategory;
  }

  public async getCategoryInSuperSubcategoryById(
    superSubcategoryId: string,
    categoryId: string,
  ) {
    const categoryOnSuperSubcategory =
      await this._client.categoriesOnSuperSubcategory.findFirst({
        where: { categoryId, superSubcategoryId },
      });

    return categoryOnSuperSubcategory;
  }

  public async create(dto: CreateSuperSubcategoryDto) {
    const existedSuperSubcategory = await this.getByTitle(dto.title);

    if (existedSuperSubcategory)
      throw new ConflictException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_ALREADY_EXIST'),
      );

    const superSubcategory = await this._client.superSubcategory.create({
      data: dto,
    });

    return {
      superSubcategory,
      message: this._intl.translate(
        'messages.SUPER_SUBCATEGORY_CREATE_SUCCESS',
      ),
    };
  }

  public async getAll() {
    const superSubcategories = await this._client.superSubcategory.findMany({
      select: {
        id: true,
        title: true,
        categoriesOnSuperSubcategory: { select: { category: true } },
      },
    });

    const result = superSubcategories.map((superSubcategory) => ({
      id: superSubcategory.id,
      title: superSubcategory.title,
      categories: superSubcategory.categoriesOnSuperSubcategory.map(
        (item) => item.category,
      ),
    }));

    return result;
  }

  public async addCategoryToSuperSubcategory(id: string, dto: AddCategoryDto) {
    const isSuperSubcategoryExist = await this.getById(id);

    if (!isSuperSubcategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_NOT_FOUND'),
      );

    const isCategoryExist = await this._categoryService.getById(dto.id);

    if (!isCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.CATEGORY_NOT_FOUND'),
      );

    await this._client.categoriesOnSuperSubcategory.create({
      data: { categoryId: dto.id, superSubcategoryId: id },
    });

    return {
      message: this._intl.translate(
        'messages.SUPER_SUBCATEGORY_ADD_CATEGORY_SUCCESS',
      ),
    };
  }

  public async removeCategoryFromSuperSubcategory(
    id: string,
    dto: RemoveCategoryDto,
  ) {
    const isSuperSubcategoryExist = await this.getById(id);

    if (!isSuperSubcategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_NOT_FOUND'),
      );

    const isCategoryExist = await this.getCategoryInSuperSubcategoryById(
      id,
      dto.id,
    );

    if (!isCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_CATEGORY_NOT_FOUND'),
      );

    await this._client.categoriesOnSuperSubcategory.deleteMany({
      where: { categoryId: dto.id, superSubcategoryId: id },
    });

    return {
      message: this._intl.translate(
        'messages.SUPER_SUBCATEGORY_REMOVE_CATEGORY_SUCCESS',
      ),
    };
  }

  public async update(id: string, dto: UpdateSuperSubcategoryDto) {
    const isSuperSubcategoryExist = await this.getById(id);

    if (!isSuperSubcategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_NOT_FOUND'),
      );

    const isSuperSubcategoryWithSameTitleExist = await this.getByTitle(
      dto.title,
    );

    if (isSuperSubcategoryWithSameTitleExist)
      throw new ConflictException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_ALREADY_EXIST'),
      );

    const updatedSuperSubcategory = await this._client.superSubcategory.update({
      where: { id },
      data: dto,
    });

    return {
      message: this._intl.translate(
        'messages.SUPER_SUBCATEGORY_UPDATE_SUCCESS',
      ),
      updatedSuperSubcategory,
    };
  }

  public async delete(id: string) {
    const isSubcategoryExist = await this.getById(id);

    if (!isSubcategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_SUBCATEGORY_NOT_FOUND'),
      );

    await this._client.superSubcategory.delete({ where: { id } });

    return {
      message: this._intl.translate(
        'messages.SUPER_SUBCATEGORY_DELETE_SUCCESS',
      ),
    };
  }
}

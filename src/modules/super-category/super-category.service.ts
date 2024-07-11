import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { I18nService } from 'nestjs-i18n';

import { I18nTranslations } from '@/generated/i18n.generated';
import { IntlService, PrismaService } from '@/services';

import { SuperSubcategoryService } from '../super-subcategory';
import {
  AddSubcategoryDto,
  CreateSuperCategoryDto,
  RemoveSubcategoryDto,
  UpdateSuperCategoryDto,
} from './dto';

@Injectable()
export class SuperCategoryService {
  constructor(
    private readonly _intl: IntlService,
    private readonly _client: PrismaService,
    private readonly _superSubcategoryService: SuperSubcategoryService,
  ) {}

  public async getByTitle(title: string) {
    const superCategory = await this._client.superCategory.findFirst({
      where: { title },
    });

    return superCategory;
  }

  public async getById(id: string) {
    const superCategory = await this._client.superCategory.findFirst({
      where: { id },
    });

    return superCategory;
  }

  public async getSubcategoryInSuperCategoryById(
    superCategoryId: string,
    superSubcategoryId: string,
  ) {
    const superSubcategoriesOnSuperCategory =
      await this._client.superSubcategoriesOnSuperCategory.findFirst({
        where: { superCategoryId, superSubcategoryId },
      });

    return superSubcategoriesOnSuperCategory;
  }

  public async create(dto: CreateSuperCategoryDto) {
    const existedSuperCategory = await this.getByTitle(dto.title);

    if (existedSuperCategory)
      throw new ConflictException(
        this._intl.translate('errors.SUPER_CATEGORY_ALREADY_EXIST'),
      );

    const superCategory = await this._client.superCategory.create({
      data: dto,
    });

    return {
      superCategory,
      message: this._intl.translate('messages.SUPER_CATEGORY_CREATE_SUCCESS'),
    };
  }

  public async getAll() {
    const superCategories = await this._client.superCategory.findMany({
      select: {
        id: true,
        title: true,
        superSubcategoriesOnSuperCategory: {
          select: { superSubcategory: true },
        },
      },
    });

    const result = superCategories.map((superSubcategory) => ({
      id: superSubcategory.id,
      title: superSubcategory.title,
      subcategories: superSubcategory.superSubcategoriesOnSuperCategory.map(
        (item) => item.superSubcategory,
      ),
    }));

    return result;
  }

  public async getOne(id: string) {
    const isSuperCategoryExist = await this.getById(id);

    if (!isSuperCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_NOT_FOUND'),
      );

    const superCategory = await this._client.superCategory.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        superSubcategoriesOnSuperCategory: {
          select: {
            superSubcategory: {
              select: {
                id: true,
                title: true,
                categoriesOnSuperSubcategory: { select: { category: true } },
              },
            },
          },
        },
      },
    });

    const result = {
      id: superCategory.id,
      title: superCategory.title,
      subcategories: superCategory.superSubcategoriesOnSuperCategory.map(
        ({ superSubcategory }) => ({
          id: superSubcategory.id,
          title: superSubcategory.title,
          categories: superSubcategory.categoriesOnSuperSubcategory.map(
            (item) => item.category,
          ),
        }),
      ),
    };

    return result;
  }

  public async addCategoryToSuperSubcategory(
    id: string,
    dto: AddSubcategoryDto,
  ) {
    const isSuperCategoryExist = await this.getById(id);

    if (!isSuperCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_NOT_FOUND'),
      );

    const isSuperSubcategoryExist = await this._superSubcategoryService.getById(
      dto.id,
    );

    if (!isSuperSubcategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_NOT_FOUND'),
      );

    await this._client.superSubcategoriesOnSuperCategory.create({
      data: { superCategoryId: id, superSubcategoryId: dto.id },
    });

    return {
      message: this._intl.translate(
        'messages.SUPER_CATEGORY_ADD_SUBCATEGORY_SUCCESS',
      ),
    };
  }

  public async removeCategoryFromSuperSubcategory(
    id: string,
    dto: RemoveSubcategoryDto,
  ) {
    const isSuperCategoryExist = await this.getById(id);

    if (!isSuperCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_NOT_FOUND'),
      );

    const isSubcategoryExist = await this.getSubcategoryInSuperCategoryById(
      id,
      dto.id,
    );

    if (!isSubcategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_SUB_CATEGORY_NOT_FOUND'),
      );

    await this._client.superSubcategoriesOnSuperCategory.deleteMany({
      where: { superCategoryId: id, superSubcategoryId: dto.id },
    });

    return {
      message: this._intl.translate(
        'messages.SUPER_CATEGORY_REMOVE_SUBCATEGORY_SUCCESS',
      ),
    };
  }

  public async update(id: string, dto: UpdateSuperCategoryDto) {
    const isSuperCategoryExist = await this.getById(id);

    if (!isSuperCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_NOT_FOUND'),
      );

    const isSuperCategoryWithSameTitleExist = await this.getByTitle(dto.title);

    if (isSuperCategoryWithSameTitleExist)
      throw new ConflictException(
        this._intl.translate('errors.SUPER_CATEGORY_ALREADY_EXIST'),
      );

    const updatedSuperCategory = await this._client.superCategory.update({
      where: { id },
      data: dto,
    });

    return {
      message: this._intl.translate('messages.SUPER_CATEGORY_UPDATE_SUCCESS'),
      updatedSuperCategory,
    };
  }

  public async delete(id: string) {
    const isCategoryExist = await this.getById(id);

    if (!isCategoryExist)
      throw new NotFoundException(
        this._intl.translate('errors.SUPER_CATEGORY_NOT_FOUND'),
      );

    await this._client.superCategory.delete({ where: { id } });

    return {
      message: this._intl.translate('messages.SUPER_CATEGORY_DELETE_SUCCESS'),
    };
  }
}

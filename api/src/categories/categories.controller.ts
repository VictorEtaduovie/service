import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create category
  @Post()
  async create(@Body('name') name: string): Promise<Category> {
    return this.categoriesService.create(name);
  }

  // Get all categories
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
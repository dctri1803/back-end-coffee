import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/products.entity";
import { DataSource, Repository } from "typeorm";
import { ProductImage } from "src/database/entities/product-images.entity";
import { ProductCategory } from "src/database/entities/product-category.entity";
import * as path from 'path';
import * as fs from 'fs';
import { CreateProductsDto } from "../dto/create-product.dto";
import { UpdateProductsDto } from "../dto/update-product.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";

Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource,

  ) { }

  async findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;
    // return this.productRepository.find({
    //   relations: { productImages: true }
    // }
    // );
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategories', 'categories')
      .leftJoinAndSelect('product.productImages', 'images')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: { productImages: true, }
    });
  }

  async findProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.productCategories', 'productCategory')
      .where('productCategory.category_id = :categoryId', { categoryId })
      .getMany();
  }

  async create(
    product: CreateProductsDto,
    files: Express.Multer.File[],
  ): Promise<Product> {
    let newProduct;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      newProduct = await queryRunner.manager.save(Product, {
        ...product,
      });

      const subFolderDir = `products/${newProduct.id.toString()}`;
      const folderDir = path.join('public', subFolderDir);

      if (!fs.existsSync(folderDir)) {
        fs.mkdirSync(folderDir, { recursive: true });
      }

      const productImages = files.map((file) => {
        const filePath = `${folderDir}/${file.originalname}`;
        fs.writeFileSync(filePath, file.buffer);

        return {
          image_url: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
          product_id: newProduct.id,
        };
      });

      const newProductImages = await queryRunner.manager.save(
        ProductImage,
        productImages,
      );
      // Liên kết danh mục (categories) nếu có
      if (product.category_ids && product.category_ids.length > 0) {
        const productCategories = product.category_ids.map((categoryId) => ({
          product_id: newProduct.id,
          category_id: categoryId,
        }));
        await queryRunner.manager.save(ProductCategory, productCategories);
      }

      newProduct.productImages = newProductImages;
      await queryRunner.commitTransaction();
      return newProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

  }

  async update(
    productId: number,
    updateProductDto: UpdateProductsDto,
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Lấy sản phẩm hiện tại
      const existingProduct = await queryRunner.manager.findOne(Product, {
        where: { id: productId },
      });
  
      if (!existingProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }
  
      // Cập nhật thông tin sản phẩm
      Object.assign(existingProduct, updateProductDto);
      const updatedProduct = await queryRunner.manager.save(existingProduct);
  
      // Cập nhật categories nếu có
      if (updateProductDto.category_ids && updateProductDto.category_ids.length > 0) {
        await queryRunner.manager.delete(ProductCategory, { product_id: productId });
        const updatedCategories = updateProductDto.category_ids.map((categoryId) => ({
          product_id: productId,
          category_id: categoryId,
        }));
        await queryRunner.manager.save(ProductCategory, updatedCategories);
      }
  
      await queryRunner.commitTransaction();
      return updatedProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async updateWithImages(
    productId: number,
    updateProductDto: UpdateProductsDto,
    files?: Express.Multer.File[],
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const existingProduct = await queryRunner.manager.findOne(Product, {
        where: { id: productId },
        relations: ['productImages'],
      });
  
      if (!existingProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }
  
      // Cập nhật thông tin sản phẩm (không thay đổi ảnh nếu không có ảnh mới)
      Object.assign(existingProduct, updateProductDto);
      const updatedProduct = await queryRunner.manager.save(existingProduct);
  
      // Nếu có ảnh mới, xử lý ảnh
      if (files && files.length > 0) {
        // Xóa các ảnh cũ nếu có
        const existingImages = existingProduct.productImages;
        for (const image of existingImages) {
          const oldFilePath = path.join('public', image.image_url.replace(`${process.env.HOST}/`, ''));
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
  
        // Xóa các ảnh cũ trong database
        await queryRunner.manager.delete(ProductImage, { product_id: productId });
  
        // Tạo thư mục mới và lưu hình ảnh
        const subFolderDir = `products/${productId.toString()}`;
        const folderDir = path.join('public', subFolderDir);
  
        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir, { recursive: true });
        }
  
        // Lưu ảnh mới vào thư mục và cơ sở dữ liệu
        const newProductImages = files.map((file) => {
          const filePath = `${folderDir}/${file.originalname}`;
          fs.writeFileSync(filePath, file.buffer);
  
          return {
            image_url: `${process.env.HOST}/${subFolderDir}/${file.originalname}`,
            product_id: productId,
          };
        });
  
        await queryRunner.manager.save(ProductImage, newProductImages);
      }
  
      // Cập nhật categories nếu có
      if (updateProductDto.category_ids && updateProductDto.category_ids.length > 0) {
        await queryRunner.manager.delete(ProductCategory, { product_id: productId });
        const updatedCategories = updateProductDto.category_ids.map((categoryId) => ({
          product_id: productId,
          category_id: categoryId,
        }));
        await queryRunner.manager.save(ProductCategory, updatedCategories);
      }
  
      await queryRunner.commitTransaction();
      return updatedProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id) {
    const product = await this.productRepository.findOneBy(id)
    await this.productRepository.remove(product)
    return `Delete product with ${id} successfully `
  }

}
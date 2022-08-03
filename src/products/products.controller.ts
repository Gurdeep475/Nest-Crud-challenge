/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param, Patch } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }

    @Post()
    addProduct(
        @Body('title') productTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number) {
        const generatedId = this.productsService.insertProduct(
            productTitle,
            prodDesc,
            prodPrice,
        );

        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        return this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice);
    }

    @delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        return this.productsService.deleteProduct(prodId);
    }
}
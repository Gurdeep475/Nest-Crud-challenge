/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Product } from "./products.model";
import {v4 as uuidv4} from "uuid";

@Injectable({})
export class ProductService {
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = uuidv4();
        const newProduct = new Product(prodId,title, desc, price);
        this.products.push(newProduct);
        return prodId
    }

    getAllProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(prodId: string,prodTitle: string, prodDesc: string, prodPrince: number){
        const [product,index] = this.findProduct(prodId);
        const updatedProduct = {...product};
        if(prodTitle) {
            updatedProduct.title = prodTitle;
        }
        if(prodDesc) {
            updatedProduct.description = prodDesc;
        }
        if(prodPrince) {
            updatedProduct.price = prodPrince;
        }
        this.products[index] = updatedProduct;
    }

    private findProduct(productId: string): [Product,number] {
        const productIndex = this.products.findIndex(prod => prod.id === productId);
        const product = this.products[productIndex];
        if(!product) {
            throw new Error("Product not found");
        }
        return [product,productIndex];
    }

    deleteProduct(productId: string) {
        const [product,index] = this.findProduct(productId);
        this.products.splice(index,1);
    }
}
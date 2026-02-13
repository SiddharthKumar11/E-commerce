import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import Logger from '../../core/Logger';

const productService = new ProductService();

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = {
            page: parseInt(req.query.page as string) || 1,
            limit: parseInt(req.query.limit as string) || 20,
            category: req.query.category as string,
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
            tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
            search: req.query.search as string,
            sort: req.query.sort as string,
        };

        const result = await productService.getProducts(query);

        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        res.status(200).json({
            status: 'success',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;

        const product = await productService.getProductBySlug(slug);

        res.status(200).json({
            status: 'success',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.createProduct(req.body);

        Logger.info(`Product created: ${product.name}`);

        res.status(201).json({
            status: 'success',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const product = await productService.updateProduct(id, req.body);

        Logger.info(`Product updated: ${product.name}`);

        res.status(200).json({
            status: 'success',
            data: { product },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await productService.deleteProduct(id);

        Logger.info(`Product deleted: ${id}`);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

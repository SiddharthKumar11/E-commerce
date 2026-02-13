import Product, { IProduct } from './product.model';
import { AppError } from '../../core/AppError';
import redisClient from '../../config/redis';

interface ProductQuery {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    search?: string;
    sort?: string;
}

export class ProductService {
    private readonly CACHE_TTL = 300; // 5 minutes

    async getProducts(query: ProductQuery) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;

        // Build cache key
        const cacheKey = `products:${JSON.stringify(query)}`;

        // Check cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Build filter
        const filter: any = { isActive: true };

        if (query.category) {
            filter.category = query.category;
        }

        if (query.minPrice || query.maxPrice) {
            filter.price = {};
            if (query.minPrice) filter.price.$gte = query.minPrice;
            if (query.maxPrice) filter.price.$lte = query.maxPrice;
        }

        if (query.tags && query.tags.length > 0) {
            filter.tags = { $in: query.tags };
        }

        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } },
            ];
        }

        // Build sort
        let sort: any = { createdAt: -1 };
        if (query.sort === 'price_asc') sort = { price: 1 };
        if (query.sort === 'price_desc') sort = { price: -1 };
        if (query.sort === 'rating') sort = { 'rating.average': -1 };

        const [products, total] = await Promise.all([
            Product.find(filter).sort(sort).skip(skip).limit(limit).populate('category', 'name slug'),
            Product.countDocuments(filter),
        ]);

        const result = {
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };

        // Cache the result
        await redisClient.setex(cacheKey, this.CACHE_TTL, JSON.stringify(result));

        return result;
    }

    async getProductById(id: string): Promise<IProduct> {
        const cacheKey = `product:${id}`;

        const cachedProduct = await redisClient.get(cacheKey);
        if (cachedProduct) {
            return JSON.parse(cachedProduct);
        }

        const product = await Product.findById(id).populate('category', 'name slug');

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        await redisClient.setex(cacheKey, this.CACHE_TTL, JSON.stringify(product));

        return product;
    }

    async getProductBySlug(slug: string): Promise<IProduct> {
        const cacheKey = `product:slug:${slug}`;

        const cachedProduct = await redisClient.get(cacheKey);
        if (cachedProduct) {
            return JSON.parse(cachedProduct);
        }

        const product = await Product.findOne({ slug }).populate('category', 'name slug');

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        await redisClient.setex(cacheKey, this.CACHE_TTL, JSON.stringify(product));

        return product;
    }

    async createProduct(data: Partial<IProduct>): Promise<IProduct> {
        const product = await Product.create(data);

        // Invalidate products list cache
        await this.invalidateProductsCache();

        return product;
    }

    async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
        const product = await Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        // Invalidate cache
        await redisClient.del(`product:${id}`);
        await redisClient.del(`product:slug:${product.slug}`);
        await this.invalidateProductsCache();

        return product;
    }

    async deleteProduct(id: string): Promise<void> {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        // Invalidate cache
        await redisClient.del(`product:${id}`);
        await redisClient.del(`product:slug:${product.slug}`);
        await this.invalidateProductsCache();
    }

    private async invalidateProductsCache(): Promise<void> {
        const keys = await redisClient.keys('products:*');
        if (keys.length > 0) {
            await redisClient.del(...keys);
        }
    }
}

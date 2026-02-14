import mongoose, { Document, Schema } from 'mongoose';
import './category.model'; // Ensure Schema is registered

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: mongoose.Types.ObjectId;
    brand?: string;
    images: string[];
    inventory: number;
    sku: string;
    attributes: {
        color?: string;
        size?: string;
        material?: string;
        [key: string]: any;
    };
    tags: string[];
    isActive: boolean;
    isFeatured: boolean;
    rating: {
        average: number;
        count: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [200, 'Product name cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [5000, 'Description cannot exceed 5000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative'],
        },
        compareAtPrice: {
            type: Number,
            min: [0, 'Compare price cannot be negative'],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Product category is required'],
        },
        brand: {
            type: String,
            trim: true,
        },
        images: {
            type: [String],
            validate: {
                validator: function (v: string[]) {
                    return v && v.length > 0;
                },
                message: 'At least one product image is required',
            },
        },
        inventory: {
            type: Number,
            required: [true, 'Inventory count is required'],
            min: [0, 'Inventory cannot be negative'],
            default: 0,
        },
        sku: {
            type: String,
            required: [true, 'SKU is required'],
            unique: true,
            uppercase: true,
        },
        attributes: {
            type: Schema.Types.Mixed,
            default: {},
        },
        tags: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        rating: {
            average: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },
            count: {
                type: Number,
                default: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for performance
productSchema.index({ category: 1 });

productSchema.index({ price: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ tags: 1 });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;

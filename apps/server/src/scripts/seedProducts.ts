import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Product model schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    category: { type: String, required: true },
    images: [String],
    inventory: {
        stock: { type: Number, default: 0 },
        lowStockThreshold: { type: Number, default: 10 }
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    sku: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Sample products data
const sampleProducts = [
    {
        name: 'Premium Wireless Headphones',
        slug: 'premium-wireless-headphones',
        description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
        price: 299,
        compareAtPrice: 399,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
        inventory: { stock: 50, lowStockThreshold: 10 },
        rating: { average: 4.8, count: 124 },
        sku: 'ELEC-HEAD-001',
        isActive: true
    },
    {
        name: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and 7-day battery life. Compatible with iOS and Android.',
        price: 399,
        compareAtPrice: 499,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
        inventory: { stock: 35, lowStockThreshold: 10 },
        rating: { average: 4.9, count: 89 },
        sku: 'ELEC-WATCH-001',
        isActive: true
    },
    {
        name: 'Wireless Bluetooth Speaker',
        slug: 'wireless-bluetooth-speaker',
        description: '360-degree sound, waterproof design, 20-hour battery life. Perfect for outdoor adventures and home entertainment.',
        price: 199,
        compareAtPrice: 249,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'],
        inventory: { stock: 60, lowStockThreshold: 15 },
        rating: { average: 4.7, count: 156 },
        sku: 'ELEC-SPEAK-001',
        isActive: true
    },
    {
        name: 'Classic Leather Backpack',
        slug: 'classic-leather-backpack',
        description: 'Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and adjustable straps. Timeless style meets functionality.',
        price: 159,
        compareAtPrice: 199,
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'],
        inventory: { stock: 25, lowStockThreshold: 5 },
        rating: { average: 4.6, count: 78 },
        sku: 'FASH-BAG-001',
        isActive: true
    },
    {
        name: 'Designer Sunglasses',
        slug: 'designer-sunglasses',
        description: 'UV400 protection, polarized lenses, lightweight frame. Stylish and protective eyewear for all occasions.',
        price: 129,
        compareAtPrice: 179,
        category: 'Fashion',
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'],
        inventory: { stock: 45, lowStockThreshold: 10 },
        rating: { average: 4.5, count: 92 },
        sku: 'FASH-SUNG-001',
        isActive: true
    },
    {
        name: 'Premium Running Shoes',
        slug: 'premium-running-shoes',
        description: 'Lightweight, breathable, with advanced cushioning technology. Designed for comfort and performance during long runs.',
        price: 149,
        compareAtPrice: 199,
        category: 'Sports',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
        inventory: { stock: 40, lowStockThreshold: 10 },
        rating: { average: 4.8, count: 203 },
        sku: 'SPORT-SHOE-001',
        isActive: true
    },
    {
        name: 'Yoga Mat Pro',
        slug: 'yoga-mat-pro',
        description: 'Extra thick, non-slip surface, eco-friendly materials. Includes carrying strap. Perfect for yoga, pilates, and stretching.',
        price: 49,
        compareAtPrice: 69,
        category: 'Sports',
        images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'],
        inventory: { stock: 80, lowStockThreshold: 20 },
        rating: { average: 4.7, count: 167 },
        sku: 'SPORT-YOGA-001',
        isActive: true
    },
    {
        name: 'Modern Table Lamp',
        slug: 'modern-table-lamp',
        description: 'Minimalist design, adjustable brightness, energy-efficient LED. Perfect for bedroom, office, or living room.',
        price: 79,
        compareAtPrice: 99,
        category: 'Home & Living',
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600'],
        inventory: { stock: 55, lowStockThreshold: 10 },
        rating: { average: 4.6, count: 134 },
        sku: 'HOME-LAMP-001',
        isActive: true
    },
    {
        name: 'Ceramic Coffee Mug Set',
        slug: 'ceramic-coffee-mug-set',
        description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Beautiful design for your morning coffee.',
        price: 39,
        compareAtPrice: 49,
        category: 'Home & Living',
        images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'],
        inventory: { stock: 70, lowStockThreshold: 15 },
        rating: { average: 4.8, count: 98 },
        sku: 'HOME-MUG-001',
        isActive: true
    },
    {
        name: 'Wireless Gaming Mouse',
        slug: 'wireless-gaming-mouse',
        description: 'High-precision sensor, customizable RGB lighting, 6 programmable buttons. 70-hour battery life for extended gaming sessions.',
        price: 89,
        compareAtPrice: 119,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'],
        inventory: { stock: 42, lowStockThreshold: 10 },
        rating: { average: 4.7, count: 145 },
        sku: 'ELEC-MOUSE-001',
        isActive: true
    },
    {
        name: 'Portable Phone Charger',
        slug: 'portable-phone-charger',
        description: '20000mAh capacity, fast charging, dual USB ports. Charge multiple devices on the go.',
        price: 45,
        compareAtPrice: 59,
        category: 'Electronics',
        images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600'],
        inventory: { stock: 90, lowStockThreshold: 20 },
        rating: { average: 4.6, count: 187 },
        sku: 'ELEC-CHAR-001',
        isActive: true
    },
    {
        name: 'Stainless Steel Water Bottle',
        slug: 'stainless-steel-water-bottle',
        description: 'Insulated, keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design. 750ml capacity.',
        price: 29,
        compareAtPrice: 39,
        category: 'Sports',
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'],
        inventory: { stock: 100, lowStockThreshold: 25 },
        rating: { average: 4.9, count: 221 },
        sku: 'SPORT-BOTT-001',
        isActive: true
    }
];

async function seedProducts() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_mern';
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        const insertedProducts = await Product.insertMany(sampleProducts);
        console.log(`✅ Successfully added ${insertedProducts.length} products`);

        // Display summary
        console.log('\n📦 Products by Category:');
        const categories = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        categories.forEach(cat => {
            console.log(`   - ${cat._id}: ${cat.count} products`);
        });

        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedProducts();

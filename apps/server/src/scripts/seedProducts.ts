import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Product from '../modules/products/product.model';
import Category from '../modules/products/category.model';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Sample categories
const categories = [
    { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets' },
    { name: 'Fashion', slug: 'fashion', description: 'Clothing, accessories, and footwear' },
    { name: 'Home & Living', slug: 'home-living', description: 'Home decor and living essentials' },
    { name: 'Sports', slug: 'sports', description: 'Sports equipment and fitness gear' }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_mern';
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('🗑️  Cleared existing products and categories');

        // Create categories
        const createdCategories = await Category.insertMany(categories);
        console.log(`✅ Created ${createdCategories.length} categories`);

        // Map category names to IDs
        const categoryMap: { [key: string]: mongoose.Types.ObjectId } = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id as mongoose.Types.ObjectId;
        });

        // Sample products
        const products = [
            {
                name: 'Premium Wireless Headphones',
                slug: 'premium-wireless-headphones',
                description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
                price: 299,
                compareAtPrice: 399,
                category: categoryMap['Electronics'],
                images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
                inventory: 50,
                sku: 'ELEC-HEAD-001',
                rating: { average: 4.8, count: 124 },
                isActive: true,
                isFeatured: true
            },
            {
                name: 'Smart Watch Pro',
                slug: 'smart-watch-pro',
                description: 'Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and 7-day battery life. Compatible with iOS and Android.',
                price: 399,
                compareAtPrice: 499,
                category: categoryMap['Electronics'],
                images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
                inventory: 35,
                sku: 'ELEC-WATCH-001',
                rating: { average: 4.9, count: 89 },
                isActive: true,
                isFeatured: true
            },
            {
                name: 'Wireless Bluetooth Speaker',
                slug: 'wireless-bluetooth-speaker',
                description: '360-degree sound, waterproof design, 20-hour battery life. Perfect for outdoor adventures and home entertainment.',
                price: 199,
                compareAtPrice: 249,
                category: categoryMap['Electronics'],
                images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'],
                inventory: 60,
                sku: 'ELEC-SPEAK-001',
                rating: { average: 4.7, count: 156 },
                isActive: true
            },
            {
                name: 'Wireless Gaming Mouse',
                slug: 'wireless-gaming-mouse',
                description: 'High-precision sensor, customizable RGB lighting, 6 programmable buttons. 70-hour battery life for extended gaming sessions.',
                price: 89,
                compareAtPrice: 119,
                category: categoryMap['Electronics'],
                images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'],
                inventory: 42,
                sku: 'ELEC-MOUSE-001',
                rating: { average: 4.7, count: 145 },
                isActive: true
            },
            {
                name: 'Portable Phone Charger',
                slug: 'portable-phone-charger',
                description: '20000mAh capacity, fast charging, dual USB ports. Charge multiple devices on the go.',
                price: 45,
                compareAtPrice: 59,
                category: categoryMap['Electronics'],
                images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600'],
                inventory: 90,
                sku: 'ELEC-CHAR-001',
                rating: { average: 4.6, count: 187 },
                isActive: true
            },
            {
                name: 'Classic Leather Backpack',
                slug: 'classic-leather-backpack',
                description: 'Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and adjustable straps. Timeless style meets functionality.',
                price: 159,
                compareAtPrice: 199,
                category: categoryMap['Fashion'],
                images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'],
                inventory: 25,
                sku: 'FASH-BAG-001',
                rating: { average: 4.6, count: 78 },
                isActive: true
            },
            {
                name: 'Designer Sunglasses',
                slug: 'designer-sunglasses',
                description: 'UV400 protection, polarized lenses, lightweight frame. Stylish and protective eyewear for all occasions.',
                price: 129,
                compareAtPrice: 179,
                category: categoryMap['Fashion'],
                images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'],
                inventory: 45,
                sku: 'FASH-SUNG-001',
                rating: { average: 4.5, count: 92 },
                isActive: true,
                isFeatured: true
            },
            {
                name: 'Premium Running Shoes',
                slug: 'premium-running-shoes',
                description: 'Lightweight, breathable, with advanced cushioning technology. Designed for comfort and performance during long runs.',
                price: 149,
                compareAtPrice: 199,
                category: categoryMap['Sports'],
                images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'],
                inventory: 40,
                sku: 'SPORT-SHOE-001',
                rating: { average: 4.8, count: 203 },
                isActive: true,
                isFeatured: true
            },
            {
                name: 'Yoga Mat Pro',
                slug: 'yoga-mat-pro',
                description: 'Extra thick, non-slip surface, eco-friendly materials. Includes carrying strap. Perfect for yoga, pilates, and stretching.',
                price: 49,
                compareAtPrice: 69,
                category: categoryMap['Sports'],
                images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'],
                inventory: 80,
                sku: 'SPORT-YOGA-001',
                rating: { average: 4.7, count: 167 },
                isActive: true
            },
            {
                name: 'Stainless Steel Water Bottle',
                slug: 'stainless-steel-water-bottle',
                description: 'Insulated, keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design. 750ml capacity.',
                price: 29,
                compareAtPrice: 39,
                category: categoryMap['Sports'],
                images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'],
                inventory: 100,
                sku: 'SPORT-BOTT-001',
                rating: { average: 4.9, count: 221 },
                isActive: true
            },
            {
                name: 'Modern Table Lamp',
                slug: 'modern-table-lamp',
                description: 'Minimalist design, adjustable brightness, energy-efficient LED. Perfect for bedroom, office, or living room.',
                price: 79,
                compareAtPrice: 99,
                category: categoryMap['Home & Living'],
                images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600'],
                inventory: 55,
                sku: 'HOME-LAMP-001',
                rating: { average: 4.6, count: 134 },
                isActive: true
            },
            {
                name: 'Ceramic Coffee Mug Set',
                slug: 'ceramic-coffee-mug-set',
                description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Beautiful design for your morning coffee.',
                price: 39,
                compareAtPrice: 49,
                category: categoryMap['Home & Living'],
                images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600'],
                inventory: 70,
                sku: 'HOME-MUG-001',
                rating: { average: 4.8, count: 98 },
                isActive: true
            }
        ];

        // Insert products
        const insertedProducts = await Product.insertMany(products);
        console.log(`✅ Successfully added ${insertedProducts.length} products`);

        // Display summary
        console.log('\n📦 Products by Category:');
        for (const cat of createdCategories) {
            const count = products.filter(p => p.category.toString() === cat._id.toString()).length;
            console.log(`   - ${cat.name}: ${count} products`);
        }

        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();

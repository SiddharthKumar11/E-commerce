// Quick test script to check if products API is working
// Run this with: node test-products-api.js

const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/products',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log('Testing products API endpoint...\n');

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('\nResponse:');
        try {
            const jsonData = JSON.parse(data);
            console.log(JSON.stringify(jsonData, null, 2));

            if (jsonData.data && jsonData.data.products) {
                console.log(`\n✅ Found ${jsonData.data.products.length} products`);
            } else {
                console.log('\n⚠️  No products found in response');
            }
        } catch (e) {
            console.log('Raw response:', data);
            console.log('\n❌ Error parsing JSON:', e.message);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure the backend server is running on port 5000');
});

req.end();

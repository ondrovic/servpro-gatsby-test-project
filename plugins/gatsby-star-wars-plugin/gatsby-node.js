try {
    // Try to load the compiled version first
    module.exports = require('./dist/gatsby-node');
} catch (e) {
    // If compiled version doesn't exist, try to load the source directly
    try {
        require('ts-node').register();
        module.exports = require('./src/gatsby-node');
    } catch (e) {
        console.error('Failed to load gatsby-star-wars-plugin:', e);
        module.exports = {};
    }
}
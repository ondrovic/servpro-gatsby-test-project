try {
    require('ts-node').register({
        transpileOnly: true,
        compilerOptions: {
            module: 'commonjs',
            target: 'es2017',
        },
    });
    module.exports = require('./src/gatsby-node.ts');
} catch (error) {
    console.error('Error loading the plugin:', error);
    throw error;
}
import path from 'path';
import type { GatsbyNode } from 'gatsby';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@extensions': path.resolve(__dirname, 'src/extensions'),
      }
    }
  });
};

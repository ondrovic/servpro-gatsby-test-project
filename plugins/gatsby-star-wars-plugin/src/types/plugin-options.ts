import { PluginOptions as GatsbyPluginOptions } from 'gatsby';

export interface PluginOptions extends GatsbyPluginOptions {
    apiUrl: string;
}
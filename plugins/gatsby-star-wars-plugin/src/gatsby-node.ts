import type { GatsbyNode, PluginCallback, SourceNodesArgs } from "gatsby";

import {
    characterResolvers,
    filmResolvers,
    planetResolvers,
    queryResolvers,
    speciesResolvers,
    starshipResolvers,
    vehicleResolvers
} from "./resolvers";

import { typeDefs } from "./schema/type-defs";
import type { PluginOptions } from "./types/plugin-options";

/**
 * Customize the GraphQL schema by adding custom type definitions.
 * 
 * @param {Object} param0 - The arguments object.
 * @param {Object} param0.actions - Gatsby actions.
 */
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(typeDefs)
};

/**
 * Create custom resolvers for the GraphQL schema.
 * 
 * @param {Object} param0 - The arguments object.
 * @param {Function} param0.createResolvers - Function to create resolvers.
 */
export const createResolvers: GatsbyNode['createResolvers'] = ({ createResolvers }) => {
    createResolvers({
        ...queryResolvers,
        Character: characterResolvers,
        Film: filmResolvers,
        Starship: starshipResolvers,
        Vehicle: vehicleResolvers,
        Species: speciesResolvers,
        Planet: planetResolvers,
    });
};

/**
 * Source nodes from the Star Wars API.
 * 
 * @param {Object} param0 - The arguments object.
 * @param {PluginOptions} options - Plugin options.
 * @param {PluginCallback} callback - Callback function.
 */
export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ }: SourceNodesArgs, options: PluginOptions, callback: PluginCallback) => {
    const { apiUrl } = options as PluginOptions;

    if (!apiUrl) {
        callback(new Error('apiUrl is required in plugin options'));
        return;
    }

    try {
        // Note: Moved to on demand so no longer pre-fetching
        callback(null);
    } catch (error) {
        console.error('Error during source nodes:', error);
        callback(error instanceof Error ? error : new Error(String(error)));
    }
};

/**
 * Define the schema for plugin options.
 * 
 * @param {Object} param0 - The arguments object.
 * @param {Object} param0.Joi - Joi schema validation library.
 * @returns {Object} Joi schema object.
 */
export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({ Joi }) => {
    return Joi.object({
        apiUrl: Joi.string()
            .required()
            .description('The URL of the Star Wars API endpoint'),
    });
};
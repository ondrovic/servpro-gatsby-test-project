import { APIResponse } from "./types/api-response"
import { Character } from "./types/character";
import { GatsbyNode, SourceNodesArgs, PluginCallback } from "gatsby";
import { PluginOptions } from "./types/plugin-options";

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
    const { createTypes } = actions;

    const typeDefs = `
        type Character implements Node {
            id: ID!
            birth_year: String
            created: String
            edited: String
            eye_color: String
            films: [String]
            gender: String
            hair_color: String
            height: String
            homeworld: String
            mass: String
            name: String!
            skin_color: String
            species: [String]
            starships: [String]
            url: String
            vehicles: [String]
        }

        type Query {
            allCharacter(limit: Int): CharacterConnection!
            character(id: ID!): Character
        }

        type CharacterConnection {
            nodes: [Character!]!
        }
    `;

    createTypes(typeDefs);
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId, createContentDigest }: SourceNodesArgs, options: PluginOptions, callback: PluginCallback) => {
    const { createNode } = actions;
    const { apiUrl } = options as PluginOptions;

    if (!apiUrl) {
        callback(new Error('apiUrl is required in plugin options'));
        return;
    }

    try {
        let currentUrl: string | null = apiUrl;
        let allCharacters: Character[] = [];

        // Fetch all available characters
        while (currentUrl) {
            const response = await fetch(currentUrl);
            if (!response.ok) {
                throw new Error(`API response was not ok: ${response.status}`);
            }

            const data: APIResponse = await response.json();
            allCharacters = [...allCharacters, ...data.results];

            // Get the next page URL
            currentUrl = data.next;
        }

        // Create nodes for all characters
        allCharacters.forEach((character) => {
            const nodeId = createNodeId(`character-${character.name}`);

            createNode({
                ...character,
                id: nodeId,
                parent: null,
                children: [],
                internal: {
                    type: 'Character',
                    content: JSON.stringify(character),
                    contentDigest: createContentDigest(character)
                }
            });
        });

        callback(null);
    } catch (error) {
        const errorToReport = error instanceof Error
            ? error
            : new Error(typeof error === 'string' ? error : JSON.stringify(error));
        callback(errorToReport);
    }
};

export const createResolvers: GatsbyNode['createResolvers'] = ({ createResolvers }) => {
    const resolvers = {
        Query: {
            allCharacter: {
                resolve: async (source: any, args: { limit?: number }, context: any, info: any) => {
                    const { limit } = args;
                    const { entries } = await context.nodeModel.findAll({
                        type: 'Character',
                    });

                    const nodes = limit ? Array.from(entries).slice(0, limit) : Array.from(entries);

                    return {
                        nodes,
                    };
                },
            },
        },
    };

    createResolvers(resolvers);
};

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({ Joi }) => {
    return Joi.object({
        apiUrl: Joi.string()
            .required()
            .description('The URL of the Star Wars API endpoint'),
    });
};
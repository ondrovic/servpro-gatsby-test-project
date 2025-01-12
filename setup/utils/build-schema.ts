import {GraphQLSchema} from "graphql-compose/lib/graphql";
import {SchemaComposer} from "graphql-compose";
import {toCamelCase, toPascalCase} from "js-convert-case";
import objectHash from "object-hash";

export type NodeDefinition<TNode> = {
    id: string,
    parent: null,
    children: [],
    internal: {
        type: string,
        content: string,
        contentDigest: string
    }
} & TNode

export type GatsbySourceNodes = {
    createNodeId(this: void, input: string): string
    createContentDigest(this: void, input: string | Record<string, unknown>): string
    createNode<TNode = Record<string, unknown>>(
        this: void,
        node: NodeDefinition<TNode>,
    ): void | Promise<void>
};

export type GatsbyCreateTypes = {
    createTypes: (typeString: string) => void
}

type SourceNodesFunc = (args: GatsbySourceNodes) => Promise<void>

type CreateTypesFunc = (args: GatsbyCreateTypes) => Promise<void>

export interface GatsbyPlugin {
    sourceNodes: SourceNodesFunc
    createTypes: CreateTypesFunc
}

const PLUGINS = import.meta.glob<{ default: GatsbyPlugin }>('/src/plugin/index.(js|ts)', {
    eager: true
})

let nodes = []

const graphQlSchema = async (): Promise<GraphQLSchema> => {
    nodes = []

    const composer = new SchemaComposer();
    const plugin = Object.values(PLUGINS)[0]

    const rootTypes = []

    composer.createInterfaceTC({
        name: "Node",
        fields: {
            id: "String"
        }
    })

    const createTypes = (typeData: string) => {
        const exporter = composer.createTC(typeData)
        const type = exporter._gqType.name
        composer.createObjectTC({
            name: `${type}Connection`,
            fields: {
                nodes: {
                    type: `[${type}]`,
                },
            },
        })
        rootTypes.push(type)
    }

    await plugin.default.createTypes({createTypes})

    const createNode = (node: any) => {
        nodes.push(node)
    }
    const createContentDigest = (data: any) => {
        return JSON.stringify(data)
    }

    const createNodeId = (data: string) => {
        return objectHash(data)
    }

    await plugin.default.sourceNodes({
        createNodeId,
        createContentDigest,
        createNode
    })

    composer.Query.addFields({
        ...(rootTypes.map((typeName) => {
            return {
                [`${toCamelCase(typeName)}`]: {
                    type: typeName,
                    resolve: () => {
                        return nodes[0] || null
                    }
                },
                [`all${toPascalCase(typeName)}`]: {
                    type: `${typeName}Connection`,
                    resolve: () => {
                        return {
                            nodes: nodes
                        }
                    }
                }
            }
        }).reduce((acc, val) => {
            return {
                ...acc,
                ...val,
            }
        }, {})),
    })

    return composer.buildSchema()
}

export default graphQlSchema;

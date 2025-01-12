import {RequestHandler} from "express-serve-static-core";
import {createHandler} from "graphql-http/lib/use/express"
import {graphqlSync as graphqlRunner} from "graphql-compose/lib/graphql";
import {GraphQLSchema, GraphQLError} from "graphql-compose/lib/graphql";
import {parse, print, visit} from "graphql-compose/lib/graphql";

type Props = {
    graphqlSchema: GraphQLSchema
    internalFragments: string
};

export const createGraphQlServer =  ({ graphqlSchema }: Props): RequestHandler =>
    async (req, res, next) => {
        return createHandler({
            schema: graphqlSchema,
            onOperation(_req, _args, result) {
                if (result.errors) {
                    result.errors = result.errors.map(
                        err =>
                            ({
                                ...err.toJSON(),
                                extensions: {
                                    stack: err.stack ? err.stack.split(`\n`) : [],
                                },
                            } as unknown as GraphQLError)
                    )
                }

                result.extensions = {
                    enableRefresh: false,
                    refreshToken: "",
                }

                return result
            },
        })(req, res, next)
}

const unusedFragRemover = (data: string) => {
    const document = parse(data);
    const usedFragmentSet1 = new Set<string>();
    const usedFragmentSet2 = new Set<string>();

    // mark used
    visit(document, {
        FragmentSpread(node) {
            usedFragmentSet1.add(node.name.value);
        }
    });

    // sweep 1
    const sweep1 = visit(document, {
        FragmentDefinition(node) {
            if (usedFragmentSet1.has(node.name.value)) return;
            return null;
        }
    });

    visit(sweep1, {
        FragmentSpread(node) {
            usedFragmentSet2.add(node.name.value);
        }
    });

    const sweep2 = visit(sweep1, {
        FragmentDefinition(node) {
            if (usedFragmentSet2.has(node.name.value)) return;
            return null;
        }
    });

    return print(sweep2)
}

const runGraphQl = ({ graphqlSchema, internalFragments }: Props) => (graphql: string, args?: Record<string, string|number|boolean>) => {

    const res = graphqlRunner({
        schema: graphqlSchema,
        source: unusedFragRemover(unusedFragRemover(`
            ${internalFragments}
            ${graphql}
        `)),
        variableValues: args,
    })

    if (res.errors) {
        throw res.errors
    }

    return res?.data
}

export default runGraphQl;

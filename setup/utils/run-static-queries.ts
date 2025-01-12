import {print} from "graphql-compose/lib/graphql";
import {DocumentNode} from "graphql-compose/lib/graphql";
import {GraphQLSchema} from "graphql-compose/lib/graphql";
import runGraphQl from "./run-graphql";


const runStaticQueries = (
    graphqlAstHashes: Record<string, [DocumentNode, string]>,
    graphqlSchema: GraphQLSchema,
    allCombinedFragments: string,
): Record<string, Record<string, unknown>> => {


    const allPossibleStaticQueries = Object
        .entries(graphqlAstHashes)
        .filter(x => x[1][0].definitions.find(x => x.kind === 'OperationDefinition' && x.variableDefinitions?.length === 0))

    const storedGraphqlResults: Record<string, Record<string, unknown>> = {};

    for (const [key, [ast]] of allPossibleStaticQueries) {
        storedGraphqlResults[key] = runGraphQl({
            graphqlSchema,
            internalFragments: allCombinedFragments,
        })(print(ast))

        if (storedGraphqlResults[key] === undefined) {
            throw new Error("GraphQL result could not be fetched for a static query")
        }
    }


    return storedGraphqlResults
}

export default runStaticQueries;

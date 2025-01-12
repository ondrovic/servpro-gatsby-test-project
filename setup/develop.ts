import express from "express";
import {createServer as createViteServer} from "vite";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import babel from 'vite-plugin-babel';
import objectHash from "object-hash";
import {DocumentNode, GraphQLSchema, Kind, OperationDefinitionNode} from "graphql-compose/lib/graphql";
import {print} from 'graphql-compose/lib/graphql'
import runStaticQueries from "./utils/run-static-queries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const portNumber = 8000
process.env.REAL_BASE_URL = process.env.URL || process.env.DEPLOYED_SITE_URL || process.env.DEPLOY_PRIME_URL || process.env.RENDER_EXTERNAL_URL || 'http://localhost:8000';


const developCommand = async () => {
    const app = express();

    let graphqlAstHashes: Record<string, [DocumentNode, string]> = {} // hash: [ast, source string]

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
        plugins: [
            babel({
                filter: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                loader: (pathName) => {
                    const extName = path.extname(pathName)
                    if (extName === '.jsx') {
                        return 'jsx';
                    }
                    if (extName === '.tsx') {
                        return 'tsx'
                    }
                },
                babelConfig: {
                    babelrc: false,
                    configFile: false,
                    plugins: [
                        [
                            "@babel/plugin-syntax-typescript",
                            {
                                isTSX: true
                            }
                        ],
                        "babel-plugin-syntax-jsx",
                        [
                            "babel-plugin-graphql-tag",
                            {
                                importSources: ["plugin"],
                                onlyMatchImportSuffix: true,
                                gqlTagIdentifiers: ["graphql"],
                                strip: true,
                                transform: (source, ast) => {
                                    const staticQueries = ast
                                        .definitions
                                        .filter(x => x.kind !== 'FragmentDefinition')
                                        .filter((x: OperationDefinitionNode) => x.variableDefinitions?.length === 0);

                                    if (staticQueries.length === 1) {
                                        const h = objectHash(source); // use your favorite hashing method
                                        graphqlAstHashes[h] = [ast, source]; // write this to a file when compilation is complete
                                        return {
                                            queryId: h
                                        };

                                    } else {
                                        const h = objectHash(source); // use your favorite hashing method
                                        graphqlAstHashes[h] = [ast, source]; // write this to a file when compilation is complete
                                        return {
                                            queryId: h
                                        };
                                    }
                                },
                            }
                        ],
                        "@emotion/babel-plugin"
                    ],
                    "presets": [
                        [
                            "@babel/preset-react",
                            { "runtime": "automatic", "importSource": "@emotion/react" }
                        ]
                    ],
                }
            }),
        ],
        esbuild: {},
        build: {
            minify: false,
        },
    });

    // use vite's connect instance as middleware
    app.use(vite.middlewares);
    app.use(express.json())

    const getAllFragmentAsts = () => {
        return [
            ...Object.values(graphqlAstHashes).flatMap(x => x[0].definitions).filter(x => x.kind === 'FragmentDefinition'),
        ]
    }


    let storedGraphqlResults: Record<string, Record<string, unknown>> = {};
    let allCombinedFragments: string = "";

    app.use("*", async (req, res, next) => {
        if (req.originalUrl.includes("socket.io")) {
            next()
            return;
        }

        try {
            graphqlAstHashes = {}
            await vite.ssrLoadModule(path.join(__dirname, "/utils/entry-server.ts"))

            const { default: graphqlSchemaBuilder } = await vite.ssrLoadModule(path.join(__dirname, "/utils/build-schema.ts"))

            const graphqlSchema = await graphqlSchemaBuilder() as GraphQLSchema

            allCombinedFragments = print({
                kind: Kind.DOCUMENT,
                definitions: getAllFragmentAsts()
            })
            storedGraphqlResults = runStaticQueries(
                graphqlAstHashes,
                graphqlSchema,
                allCombinedFragments
            )

            let renderingHtml = fs.readFileSync(
                path.join(__dirname, "/utils/index.html"),
                "utf-8"
            );

            // 2. Apply vite HTML transforms. This injects the vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react-refresh
            renderingHtml = await vite.transformIndexHtml(req.originalUrl, renderingHtml);
            // 3. Load the server entry. vite.ssrLoadModule automatically transforms
            //    your ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.

            const { default: entryServer } = await vite.ssrLoadModule(path.join(__dirname, "/utils/entry-server.ts"))

            const result = entryServer(renderingHtml, storedGraphqlResults) as string
            res.status(200).send(result)

        } catch (e) {
            vite.ssrFixStacktrace(e as any);
            console.error(e);
            res.status(500).end((e as any).message as any);
        }
    })
    app.listen(portNumber, () => console.log(`listening on :${portNumber}`));
}

developCommand()

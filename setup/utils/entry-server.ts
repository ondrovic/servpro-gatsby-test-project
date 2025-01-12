import {createElement, FunctionComponent, ReactElement} from "react";
import {renderToString} from "react-dom/server";
import DataContext from "./data-context";

const ESCAPE_LOOKUP: { [match: string]: string } = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
};

const ESCAPE_REGEX = /[&><\u2028\u2029]/g;

const htmlEscape = (str: string): string => {
    return str.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}


const IMPORTS = import.meta.glob<{ default: FunctionComponent }>('/src/main.(jsx|tsx)', {
    eager: true
})

const entryServer = (renderingHtml: string, storedGraphqlResults: Record<string, Record<string, unknown>>): string => {


    const appContent = createElement(
        DataContext,
        {
            storedGraphqlResults: storedGraphqlResults,
        },
        createElement(Object.values(IMPORTS)[0].default, { })
    )

    const appHtml = renderToString(appContent)

    let json = htmlEscape(JSON.stringify(JSON.stringify(storedGraphqlResults)))

    let constructed = appHtml;
    constructed += `\r\n<script>window.__routerData = JSON.parse(${json})</script>`
    const finalized = renderingHtml
        .replace(`<!--app-html-->`, constructed)

    return finalized
}

export default entryServer

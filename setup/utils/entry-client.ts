import {createElement, FunctionComponent, ReactElement} from "react";
import {hydrateRoot} from "react-dom/client";
import DataContext from "./data-context";


const IMPORTS = import.meta.glob<{ default: FunctionComponent }>('/src/main.(jsx|tsx)', {
    eager: true
})

const startApp = async () => {
    if ("__routerData" in window) {
        const storedGraphqlResults = window.__routerData as Record<string, Record<string, unknown>>;

        hydrateRoot(
            document.getElementById("app"),
            createElement(
                DataContext,
                {
                    storedGraphqlResults: storedGraphqlResults,
                },
                createElement(Object.values(IMPORTS)[0].default)
            )
        );
    }
}

startApp().then(() => {
    console.log("app started")
});

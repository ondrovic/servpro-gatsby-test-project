import React from "react";
import {RouterContext} from "./data-context";

export interface StaticQueryDocument {
    queryId: string
}

const useStaticQuery = (query: StaticQueryDocument) => {
    const ctx = React.useContext(RouterContext)
    return ctx.storedGraphqlResults[query.queryId]
}

export default useStaticQuery;

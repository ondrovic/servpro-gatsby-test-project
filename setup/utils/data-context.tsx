import React from "react";
import "./reset.css"

interface IRouterContext {
    storedGraphqlResults: Record<string, Record<string, unknown>>
}

export const RouterContext = React.createContext<IRouterContext>({
    storedGraphqlResults: {},
})

const DataContext = ({ storedGraphqlResults, children }: React.PropsWithChildren<{ storedGraphqlResults: Record<string, Record<string, unknown>> }>) => {

    const value = React.useMemo<IRouterContext>(() => ({
        storedGraphqlResults
    }), [
        storedGraphqlResults
    ])

    return (
        <RouterContext.Provider value={value}>
            {children}
        </RouterContext.Provider>
    )
}

export default DataContext

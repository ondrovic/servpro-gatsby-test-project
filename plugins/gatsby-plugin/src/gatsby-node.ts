import {GatsbyNode} from "gatsby";

export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] = ({ actions }) => {
    const { createTypes } = actions

}

export const sourceNodes: GatsbyNode[`sourceNodes`] = async (gatsbyApi) => {
    const {actions, createNodeId, createContentDigest} = gatsbyApi
    const {createNode} = actions
}

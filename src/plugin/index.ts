import { GatsbyPlugin } from "../../setup";

const plugin: GatsbyPlugin = {
  sourceNodes: async ({ createNode, createNodeId, createContentDigest }) => {},
  createTypes: async ({ createTypes }) => {},
};

export default plugin;

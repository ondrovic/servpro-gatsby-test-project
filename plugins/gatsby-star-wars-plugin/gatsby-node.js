const fs = require("node:fs")
if (fs.existsSync("./dist/gatsby-node")) {
    module.exports = require(`./dist/gatsby-node`)
} else {
    module.exports = {}
}

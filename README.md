Concept
=======

* * *

**SERVPRO uses Gatsby to power a portion of its front-end.**

A member on your team has asked you to build a small dashboard based on a new endpoint. This new dashboard, which uses the Star Wars API, should take a small portion of the data when the Gatsby site builds and present it in a useful format - so your team member can see this data at a glance.

You are to build a Gatsby plugin, which will fetch this data and add it to Gatsby's internal store using the [Source Nodes API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes). You will then need to consume it in the front end using Gatsby's [useStaticQuery](https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/) hook.

You will then need to style this new dashboard based on the design [found here](https://www.figma.com/design/8jb3IaVwO6nGC6rDTrcLCl/SERVPRO-Dashboard-Take-Home). You should style this dashboard with `@emotion/react`, using the `css` prop's object styles. You can read about the `css` prop [here](https://emotion.sh/docs/css-prop#object-styles).

Files
=====

* * *

`plugins/gatsby-plugin/src/gatsby-node.ts` - This is where you should code your Gatsby Plugin. You will need to run `yarn run develop` to start the Typescript complation.

`src/pages/index.tsx` - This is where you should build your dashboard front-end. Please create additional components and group them inside the components folder as necessary.

Data Source to Implement
========================

* * *

*   `https://swapi.py4e.com/api/people/` - This will provide you with a list of people. Please limit the amount you source to exactly **12**.

Project Completion notes
========================

* * *

*   You will have 72 hours to complete this task from the time that we share it with you.
*   Please publicly fork this project on Github, complete it, and then email back a link to your completed work on your fork. **Make sure the link is public!**
*   The design implementation is important, but the logic implementation is more important. Please compromise on the design if you are running short on time.

const Instructions = () => {
  return (
    <div
      css={{
        maxWidth: "1440px",
        padding: "40px",
        margin: "auto",
        ul: {
          listStyleType: "initial",
        },
        li: {
          marginBottom: "8px",
          maxWidth: "1200px",
        },
        p: {
          marginBottom: "12px",
          maxWidth: "600px",
        },
        code: {
          backgroundColor: "#eee",
          borderRadius: "4px",
          padding: "2px",
        },
        a: {
          color: "orange",
        },
      }}
    >
      <h1
        css={{
          fontSize: "24px",
          fontWeight: "medium",
          marginBottom: "12px",
          marginTop: "24px",
        }}
      >
        Concept
      </h1>
      <hr
        css={{
          marginBottom: "24px",
        }}
      />
      <p>
        <strong>
          SERVPRO uses Gatsby to power a portion of its front-end.
        </strong>
      </p>
      <p>
        A member on your team has asked you to build a small dashboard based on
        a new endpoint. This new dashboard, which uses the Star Wars API, should
        take a small portion of the data when the Gatsby site builds and present
        it in a useful format - so your team member can see this data at a
        glance.
      </p>
      <p>
        You are to build a Gatsby plugin, which will fetch this data and add it
        to Gatsby's internal store using the{" "}
        <a
          target="_blank"
          href="https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes"
        >
          Source Nodes API
        </a>
        . You will then need to consume it in the front end using Gatsby's{" "}
        <a
          target="_blank"
          href="https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/"
        >
          useStaticQuery
        </a>{" "}
        hook.
      </p>
      <p>
        You will then need to style this new dashboard based on the design{" "}
        <a
          target="_blank"
          href="https://www.figma.com/design/8jb3IaVwO6nGC6rDTrcLCl/SERVPRO-Dashboard-Take-Home"
        >
          found here
        </a>
        . You should style this dashboard with <code>@emotion/react</code>,
        using the <code>css</code> prop's object styles. You can read about the{" "}
        <code>css</code> prop{" "}
        <a
          target="_blank"
          href="https://emotion.sh/docs/css-prop#object-styles"
        >
          here
        </a>
        .
      </p>
      <h1
        css={{
          fontSize: "24px",
          fontWeight: "medium",
          marginBottom: "12px",
          marginTop: "24px",
        }}
      >
        Setup Notes
      </h1>
      <hr
        css={{
          marginBottom: "24px",
        }}
      />
      <p>
        <strong>
          This project will run on port <code>dev:8000</code>
        </strong>
      </p>
      <p>
        This repo is a minimal reproduction of the Gatsby features required for
        this project, formulated to run on CodeSandbox.
      </p>
      <p>
        You will be able to create a plugin inside{" "}
        <code>src/plugin/index.ts</code>, and the most used APIs from Gatsby's
        Plugin System are supported.
      </p>
      <p>
        On the front-end you will be able to use the <code>useStaticQuery</code>{" "}
        hook (with the <code>graphql</code> tag) to query for your data.
      </p>
      <p>All other APIs are unsupported.</p>
      <h1
        css={{
          fontSize: "24px",
          fontWeight: "medium",
          marginBottom: "12px",
          marginTop: "24px",
        }}
      >
        Files
      </h1>
      <hr
        css={{
          marginBottom: "24px",
        }}
      />
      <p>
        <code>src/plugin/index.ts</code> - This is where you should code your
        Gatsby Plugin
      </p>
      <p>
        <code>src/plugin/main.tsx</code> - This is where you should build your
        dashboard front-end
      </p>
      <h1
        css={{
          fontSize: "24px",
          fontWeight: "medium",
          marginBottom: "12px",
          marginTop: "24px",
        }}
      >
        Data Source to Implement
      </h1>
      <hr
        css={{
          marginBottom: "24px",
        }}
      />
      <ul>
        <li>
          <code>https://swapi.py4e.com/api/people/</code> - This will provide
          you with a list of people. Please limit the amount you source to{" "}
          <strong>12</strong>.
        </li>
      </ul>
      <h1
        css={{
          fontSize: "24px",
          fontWeight: "medium",
          marginBottom: "12px",
          marginTop: "24px",
        }}
      >
        Project Completion notes
      </h1>
      <hr
        css={{
          marginBottom: "24px",
        }}
      />
      <ul>
        <li>
          You will have 72 hours to complete this task from the time that we
          share it with you.
        </li>
        <li>
          Please fork this project on CodeSandbox, complete it, and then email
          back the forked sandbox link to your completed work.{" "}
          <strong>Please make sure the link is public!</strong>
        </li>
        <li>
          The design implementation is important, but the logic implementation
          is more important. Please compromise on the design if you are running
          short on time.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;

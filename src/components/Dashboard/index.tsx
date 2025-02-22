import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Character } from "../../../plugins/gatsby-star-wars-plugin/src/types/character";
import CharacterCard from "../CharacterCard";
import { dashboardStyles } from "../Styles";

const Dashboard: React.FC = () => {
  /*
    NOTES:
      * You can uncomment the items (or add any that are avaiable) to see them in the ui
      * You can change teh limit to increase / decrease the results
  */
  const data = useStaticQuery(graphql`
    query {
      allCharacter(limit: 12) {
        nodes {
          name
          hair_color
          eye_color
          height
          birth_year
          # films {
          #   title
          #   release_date
          # }
          # species {
          #   name
          #   classification
          # }
          # vehicles {
          #   name
          #   model
          # }
          # homeworld {
          #   name
          #   population
          # }
        }
      }
    }
  `);

  const characters: Character[] = data.allCharacter.nodes;

  return (
    <div css={[dashboardStyles.container]}>
      <header css={dashboardStyles.header}>
        <h1 css={dashboardStyles.title}>Galatic Employees Dashboard</h1>
      </header>
      <div css={[dashboardStyles.grid]}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

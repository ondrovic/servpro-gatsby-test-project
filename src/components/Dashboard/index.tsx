import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import CharacterCard from "../CharacterCard";
import { Character } from "../../../plugins/gatsby-star-wars-plugin/src/types/character";
import { dashboardStyles } from "../Styles";

const Dashboard: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allCharacter(limit: 12) {
        nodes {
          id
          name
          hair_color
          eye_color
          height
          birth_year
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

      {/* NOTE: you can add dashboardStyles.scroll here to make it so the cards scroll and not the whole page */}
      <div css={[dashboardStyles.grid]}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Character } from "../../../plugins/gatsby-star-wars-plugin/src/types/character";
import { dashboardStyles } from "../Styles";
import {
  formatFieldName,
  formatFieldValue,
  Label,
  NestedFields,
  Value,
} from "../utils";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const excludedFields = ["created", "edited", "url", "name", "id"];

  const renderField = (key: string, value: any) => {
    // Handle arrays of objects
    if (Array.isArray(value)) {
      return (
        <>
          <Label>{formatFieldName(key)}:</Label>
          <Value>{value.length > 0 ? "" : "None"}</Value>
          {value.map((item, index) => (
            typeof item === "object" && item !== null ? (
              <NestedFields key={index} data={item} />
            ) : (
              <React.Fragment key={index}>
                <Label nested>Item {index + 1}:</Label>
                <Value>{formatFieldValue(item)}</Value>
              </React.Fragment>
            )
          ))}
        </>
      );
    }

    // Handle single objects
    if (typeof value === "object" && value !== null) {
      return (
        <>
          <Label>{formatFieldName(key)}:</Label>
          <Value>{'\u200B'}</Value>
          <NestedFields data={value} />
        </>
      );
    }

    // Handle primitive values
    return (
      <>
        <Label>{formatFieldName(key)}:</Label>
        <Value>{formatFieldValue(value)}</Value>
      </>
    );
  };

  const renderFields = () => {
    return Object.entries(character)
      .filter(([key]) => !excludedFields.includes(key))
      .map(([key, value]) => (
        <React.Fragment key={key}>
          {renderField(key, value)}
        </React.Fragment>
      ));
  };

  return (
    <div css={dashboardStyles.card}>
      <h2 css={dashboardStyles.cardTitle}>{character.name}</h2>
      <div css={dashboardStyles.infoGrid}>
        {renderFields()}
      </div>
    </div>
  );
};

export default CharacterCard;
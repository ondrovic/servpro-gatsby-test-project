import React from "react";
import { Character } from "../../../plugins/gatsby-star-wars-plugin/src/types/character";
import { dashboardStyles } from "../Styles";

interface CharacterCardProps {
  character: Character
}

const Label: React.FC<{ children: React.ReactNode}> = ({children}) => {
    return <span css={dashboardStyles.label}>{children}</span>
}

const Value: React.FC<{ children: React.ReactNode}> = ({children}) => {
    return <span css={dashboardStyles.value}>{children}</span>
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    // Fields to exclude from being displayed
    const excludedFields = ["created", "edited", "url", "name", "id"]

    // format the field name
    const formatFieldName = (field: string): string => {
        return field
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    };

    // format the field value
    const formatFieldValue = (value: any): string => {
        if (Array.isArray(value)) {
            return value.length > 0 ? `{value.length} items`: "None";
        }

        if (typeof value === "string" && value === "n/a") {
            return "N/A"
        }

        if (typeof value === "string" && value.startsWith("http")) {
            return "Link available"
        }

        return value.toString();
    };

    // render the fields
    const renderFields = () => {
        return Object.entries(character)
          .filter(([key]) => !excludedFields.includes(key))
          .map(([key, value]) => (
            <React.Fragment key={key}>
              <Label>{formatFieldName(key)}:</Label>
              <Value>{formatFieldValue(value)}</Value>
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
    )
}

export default CharacterCard;

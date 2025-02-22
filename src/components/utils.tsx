import React from "react";
import { dashboardStyles } from "../components/Styles";

/**
 * Label component to display a label with optional nested styling.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the label.
 * @param {boolean} [props.nested] - Whether the label is nested or not.
 * @returns {JSX.Element} The rendered Label component.
 */
export const Label: React.FC<{
  children: React.ReactNode;
  nested?: boolean;
}> = ({ children, nested }) => {
  return (
    <span css={nested ? dashboardStyles.labelNested : dashboardStyles.label}>
      {children}
    </span>
  );
};

/**
 * Value component to display a value with specific styling.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the value.
 * @returns {JSX.Element} The rendered Value component.
 */
export const Value: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return <span css={dashboardStyles.value}>{children}</span>;
};

/**
 * Format a field name by converting underscores to spaces and capitalizing each word.
 *
 * @param {string} field - The field name to format.
 * @returns {string} The formatted field name.
 */
export const formatFieldName = (field: string): string => {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format a field value based on its type.
 *
 * @param {any} value - The field value to format.
 * @returns {string} The formatted field value.
 */
export const formatFieldValue = (value: any): string => {
  if (typeof value === "string") {
    if (value === "n/a") return "N/A";
    if (value.startsWith("http")) return "Link available";
    return value;
  }
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  return "";
};

/**
 * NestedFields component to display nested fields with labels and values.
 *
 * @param {Object} props - The component props.
 * @param {Record<string, any>} props.data - The data object containing fields to display.
 * @param {string[]} [props.excludeKeys] - The keys to exclude from displaying.
 * @returns {JSX.Element} The rendered NestedFields component.
 */
export const NestedFields: React.FC<{
  data: Record<string, any>;
  excludeKeys?: string[];
}> = ({ data, excludeKeys = [] }) => {
  return (
    <>
      {Object.entries(data)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value]) => (
          <React.Fragment key={key}>
            <Label nested>{formatFieldName(key)}:</Label>
            <Value>{formatFieldValue(value)}</Value>
          </React.Fragment>
        ))}
    </>
  );
};

import { css } from "@emotion/react";

export const dashboardStyles = {
  container: css`
    padding: 1rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    transition: background-color 0.3s ease;
  `,

  header: css`
    margin-bottom: 2rem;
    justify-content: space-between;
    align-items: center;
  `,

  title: css`
    font-family: Montserrat, roboto, sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: #111827;
    background: linear-gradient(to right, #FFFFFF, #f8f8f8);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 1.5rem;
  `,

  grid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    height: 600px;
    padding-right: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 769px) and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,

  scroll: css`
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #666;
    }
  `,

  card: css`
    background: #fcfcfc;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  `,

  cardTitle: css`
    font-family: Montserrat, roboto, sans-serif;
    font-size: 2rem;
    font-weight: 500;
    color: #111827;
    margin-bottom: 0.5rem;
  `,

  // NOTE: I reduced the gap here to make it all fit in a single view
  infoGrid: css`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.15rem;
    align-items: center;
  `,

  label: css`
    color: #4b5563;
    font-weight: 500;
  `,

  value: css`
    color: #22c55e;
    text-align: right;
    text-transform: capitalize;
  `,
};
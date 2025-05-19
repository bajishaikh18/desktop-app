import React from "react";
import "../styles/formStyles.scss";

interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
  <h2 className="mb-3 section-heading-custom fw-bold">{children}</h2>
);

export default SectionHeading;

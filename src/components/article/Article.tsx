import React from "react";
import styles from "./Article.module.scss";

const Articles: React.FC = () => {
  return (
    <div className={styles["article-container"]}>
      <h1 className={styles["article-title"]}>Articles</h1>
      <div className={styles["article-content"]}>
        <div className={styles["sidebar"]}>
        <button className={styles["sidebar-button"]}>
            How to apply overseas
            <i className="fas fa-chevron-right"></i>
          </button>
          <button className={styles["sidebar-button"]}>
            Documents needed for gulf visa
            <i className="fas fa-chevron-right"></i>
          </button>
          <button className={styles["sidebar-button"]}>
            Documents needed for gulf visa
            <i className="fas fa-chevron-right"></i>
          </button>
          <button className={styles["sidebar-button"]}>
            Documents needed for gulf visa
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className={styles["content"]}>
          <h2 className={styles["content-title"]}>Lorem Ipsum is simply dummy text</h2>
          <p className={styles["content-text"]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
          <button className={styles["back-button"]}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Articles;

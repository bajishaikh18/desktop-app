import React, { useState } from "react";
import styles from "./Article.module.scss";
import Layout from "@/app/TutorialNavbarlayout";
const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string>("How to apply overseas");
  
  const articles = [
    "How to apply overseas",
    "Documents needed for gulf visa",
    "Top career opportunities in Dubai",
    "How to build a career in the Middle East"
  ];

  const articleContent: { [key: string]: string } = {
    "How to apply overseas": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    "Documents needed for gulf visa": `In order to apply for a Gulf visa, you will need the following documents: a valid passport, a completed visa application form, a recent passport-size photograph, proof of employment or an offer letter, and a medical certificate from an approved hospital.`,
    "Top career opportunities in Dubai": `Dubai offers a wide range of career opportunities in sectors such as construction, hospitality, finance, healthcare, and technology. Professionals in these fields can expect competitive salaries and opportunities for career growth.`,
    "How to build a career in the Middle East": `Building a successful career in the Middle East requires strategic networking, staying informed about local industry trends, and adapting to cultural differences. Key sectors in the region include oil and gas, construction, education, and technology.`
  };

  const handleButtonClick = (article: string) => {
    setSelectedArticle(article);
  };

  return (
    <Layout>
    <div className={styles["article-container"]}>
      <h1 className={styles["article-title"]}>Articles</h1>
      <div className={styles["article-content"]}>
        <div className={styles["sidebar"]}>
          {articles.map((article, index) => (
            <button
              key={index}
              className={`${styles["sidebar-button"]} ${selectedArticle === article ? styles.active : ""}`}
              onClick={() => handleButtonClick(article)}
            >
              {article}
              <i className="fas fa-chevron-right"></i>
            </button>
          ))}
        </div>
        <div className={styles["content"]}>
          <h2 className={styles["content-title"]}>{selectedArticle}</h2>
          <p className={styles["content-text"]}>
            {articleContent[selectedArticle]}
          </p>
          <button className={styles["back-button"]}>Back</button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Articles;

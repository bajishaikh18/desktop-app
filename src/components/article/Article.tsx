import React, { useState } from "react";
import styles from "./Article.module.scss";
import Layout from "@/app/TutorialNavbarlayout";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string>("How to apply overseas");
  const router = useRouter();
  const t = useTranslations("Articles");

  const articles = [
    t("How to apply overseas"),
    t("Documents needed for gulf visa"),
    t("Top career opportunities in Dubai"),
    t("How to build a career in the Middle East")
  ];

  const articleContent: { [key: string]: string } = {
    [t("How to apply overseas")]: t("How to apply overseas content"),
    [t("Documents needed for gulf visa")]: t("Documents needed for gulf visa content"),
    [t("Top career opportunities in Dubai")]: t("Top career opportunities in Dubai content"),
    [t("How to build a career in the Middle East")]: t("How to build a career in the Middle East content")
  };

  const handleButtonClick = (article: string) => {
    setSelectedArticle(article);
  };

  return (
    <Layout>
      <Container>
        <div className={styles["article-container"]}>
          <h1 className={styles["article-title"]}>{t("articles")}</h1>
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
              <p className={styles["content-text"]}>{articleContent[selectedArticle]}</p>
              <button className={styles["back-button"]} onClick={() => router.back()}>
                {t("back")}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Articles;

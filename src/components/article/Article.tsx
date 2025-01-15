import React, { useState } from "react";
import styles from "./Article.module.scss";
import Layout from "@/app/TutorialNavbarlayout";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Articles: React.FC = () => {
  const t = useTranslations("Articles");
  const [selectedArticle, setSelectedArticle] = useState<string>(t("apply_overseas"));
  const router = useRouter();
 

  const articles = [
    t("apply_overseas"),
    t("documents_gulf_visa"),
    t("opportunities_in_dubai"),
    t("career_in_middle_east")
  ];

  const articleContent: { [key: string]: string } = {
    [t("apply_overseas")]: t("overseas_content"),
    [t("documents_gulf_visa")]: t("gulf_visa_content"),
    [t("opportunities_in_dubai")]: t("dubai_content"),
    [t("career_in_middle_east")]: t("middle_east_content")
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

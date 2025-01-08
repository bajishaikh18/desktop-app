import React from "react";
import styles from "./Tutorial.module.scss";

const videos = [
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 10, 2024",
    watchTime: "5 mins watch time",
    featured: true, 
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 18, 2024",
    watchTime: "4 mins watch time",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 20, 2024",
    watchTime: "6 mins watch time",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 25, 2024",
    watchTime: "5 mins watch time",
  },
];
const extraVideos = [
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 18, 2024",
    watchTime: "4 mins watch time",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 20, 2024",
    watchTime: "6 mins watch time",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 25, 2024",
    watchTime: "5 mins watch time",
  },
];

const Tutorial = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Watch Videos</h1>
      <div className={styles.grid}>
        {videos.map((video, index) => (
          <div
            key={index}
            className={`${styles.cardContainer} ${
              video.featured ? styles.featured : ""
            }`}
          >
            <div className={styles.card}>
              <div className={styles.thumbnail}>
               
              </div>
            </div>
            <div className={styles.details}>
              <h2 className={styles.title}>{video.title}</h2>
              <div className={styles.meta}>
  <span>{video.date}</span>
  <span className={styles.separator}></span>
  <span>
    <img
      src="/clock.png"
      alt="Clock"
      className={styles.clockIcon}
    />
    {video.watchTime}
  </span>
</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {extraVideos.map((video, index) => (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.thumbnail}>
                
              </div>
            </div>
            <div className={styles.details}>
              <h2 className={styles.title}>{video.title}</h2>
              <div className={styles.meta}>
  <span>{video.date}</span>
  <span className={styles.separator}></span>
  <span>
    <img
      src="/clock.png"
      alt="Clock"
      className={styles.clockIcon}
    />
    {video.watchTime}
    </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
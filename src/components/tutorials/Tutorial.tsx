import React, { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./Tutorial.module.scss";

import Layout from "@/app/TutorialNavbarlayout";
import { Container } from "react-bootstrap";
import { IMAGE_BASE_URL } from "@/helpers/constants";
import Image from "next/image";

interface Video {
  title: string;
  date: string;
  watchTime: string;
  featured?: boolean;
  thumbnail?:string;
  videoUrl: string;
}

const videos: Video[] = [
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 10, 2024",
    watchTime: "5 mins watch time",
    thumbnail: `${IMAGE_BASE_URL}/tutorials/thumbnail.png`,
    featured: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    thumbnail: `${IMAGE_BASE_URL}/tutorials/thumbnail.png`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    thumbnail: `${IMAGE_BASE_URL}/tutorials/thumbnail.png`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    thumbnail: `${IMAGE_BASE_URL}/tutorials/thumbnail.png`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    thumbnail: `${IMAGE_BASE_URL}/tutorials/thumbnail.png`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const extraVideos: Video[] = [
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 10, 2024",
    watchTime: "4 mins watch time",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "High paying jobs in Dubai for Construction workers",
    date: "Jan 15, 2024",
    watchTime: "3 mins watch time",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const Tutorial: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); 
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const openPopup = (video: Video) => {
    setSelectedVideo(video);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Layout>
     <Container>
      <h1 className={styles.heading}>Watch Videos</h1>

     
      <div className={`row align-items-stretch ${styles.gridLayout}`}>
       
        <div className="col-lg-6 col-md-12 mb-6">
          <div
            className={`${styles.cardContainer} ${styles.featured}`}
            onClick={() => openPopup(videos[0])}
          >
            <div className={`${styles.card}`}>
              <div className={`${styles.thumbnail} ${styles.largeThumbnail}`} style={{backgroundImage:`url(${videos[0].thumbnail})`}}>
               <Image src="icons/play.svg" width={48} height={48} alt="play"/>
              </div>
            </div>
            <div className={styles.details}>
              <h2 className={styles.title}>{videos[0].title}</h2>
              <div className={styles.meta}>
                <span>{videos[0].date}</span>
                <span className={styles.videoTime}>
                  <img src="/clock.png" alt="Clock" className={styles.clockIcon} />
                  {videos[0].watchTime}
                </span>
              </div>
            </div>
          </div>
        </div>

      
        <div className="col-lg-6 col-md-12">
          <div className="row h-100">
            {videos.slice(1).map((video, index) => (
              <div
                key={index}
                className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex"
                onClick={() => openPopup(video)}
              >
                <div className={styles.cardContainer}>
                  <div className={styles.card}>
                    <div className={styles.thumbnail} style={{backgroundImage:`url(${videos[0].thumbnail})`}}>
                    <Image src="icons/play.svg" width={48} height={48} alt="play"/>

                    </div>
                  </div>
                  <div className={styles.details}>
                    <h2 className={styles.title}>{video.title}</h2>
                    <div className={styles.meta}>
                      <span>{video.date}</span>
                      <span  className={styles.videoTime}>
                        <img src="/clock.png" alt="Clock" className={styles.clockIcon} />
                        {video.watchTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div className="row" style={{ marginTop: '30px' }}>
        {extraVideos.map((video, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-6 col-sm-12 mb-4"
            onClick={() => openPopup(video)}
          >
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <div className={styles.thumbnail} style={{backgroundImage:`url(${videos[0].thumbnail})`}}>
                <Image src="icons/play.svg" width={48} height={48} alt="play"/>

                </div>
              </div>
              <div className={styles.details}>
                <h2 className={styles.title}>{video.title}</h2>
                <div className={styles.meta}>
                  <span>{video.date}</span>
                  <span className={styles.separator}></span>
                  <span className={styles.videoTime}>
                    <img src="/clock.png" alt="Clock" className={styles.clockIcon} />
                    {video.watchTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {isPopupOpen && selectedVideo && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              ×
            </button>
            <ReactPlayer
              url={selectedVideo.videoUrl}
              width="100%"
              height="400px"
              controls
            />
            <h2 className={styles.popupTitle}>{selectedVideo.title}</h2>
          </div>
        </div>
      )}
    </Container>
    </Layout>
  );
};

export default Tutorial;

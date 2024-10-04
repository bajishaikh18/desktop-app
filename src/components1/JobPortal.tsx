"use client";
import React from 'react';
import Image from 'next/image'; 
import { Row, Col } from 'react-bootstrap'; 
import styles from './common/Slider.module.scss';

const jobData = [
  {
    title: 'Continental Holdings',
    location: 'Bahrain',
    imgSrc: '/Bahrain.png',
    salary: 'BD 150-250 + OT',
    contact: 'hiring@continentalholdings.net',
    icons: ['Food', 'Stay', 'Transport', 'Recruitment'],
    posted: '2 Days ago',
    validtill: '25-Aug-2024',
  },
  {
    title: 'AL Arab Arafa',
    location: 'Abu Dhabi',
    imgSrc: '/abudhabi.png',
    salary: '1600 + FOOD + OT',
    contact: 'resume4@alarabarafa.com',
    posted: '2 Days ago',
    validtill: '25-Aug-2024',
    icons: ['Food', 'Stay', 'Transport', 'Recruitment'],
  },
  {
    title: 'Smart Consultancy',
    location: 'Saudi Arabia',
    imgSrc: '/saudi.png',
    salary: '',
    contact: 'hr2smartconsultancy@gmail.com',
    posted: '2 Days ago',
    validtill: '25-Aug-2024',
    icons: ['Food', 'Stay', 'Transport', 'Recruitment'],
  },
  {
    title: 'Dynamic Staffing Services',
    location: 'Europe',
    imgSrc: '/europe.png',
    salary: '',
    contact: 'vrushali@dss-hr.com',
    posted: '2 Days ago',
    validtill: '25-Aug-2024',
    icons: ['Food', 'Stay', 'Transport', 'Recruitment'],
  },
];

// Mapping icon names to their image paths
const iconMap: { [key: string]: string } = {
  Food: '/food.png',
  Stay: '/stay.png',
  Transport: '/transport.png',
  Recruitment: '/recruitment.png',
  Clock: '/clock.png',
  Alarm: '/alarm-clock-check.png',
};

const JobPortal: React.FC = () => {
  return (
    <div className={styles.cardsContainer}>
      <Row className="g-4">
        {jobData.map((job, index) => (
          <Col key={index} className="col-3"> 
            <div className={styles.card}>
              <Image src={job.imgSrc} alt={job.title} className={styles.cardImage} width={301} height={378} />

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{job.title}</h3>
                <div className={styles.iconsContainer}>
                  <div className={styles.topIcons}>
                    {job.icons.slice(0, 2).map((icon, idx) => (
                      <div 
                        key={idx} 
                        className={`${styles.iconWithText} ${icon === 'Stay' ? styles.stayIcon : ''}`} 
                      >
                        <Image src={iconMap[icon]} alt={icon} className={styles.icon} width={16} height={16} />
                        <span>{icon}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.bottomIcons}>
                    {job.icons.slice(2).map((icon, idx) => (
                      <div key={idx} className={styles.iconWithText}>
                        <Image src={iconMap[icon]} alt={icon} className={styles.icon} width={16} height={16} />
                        <span>{icon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.jobDetails}>
                  <div className={styles.iconWithText}>
                    <Image src={iconMap['Clock']} alt="Posted" className={styles.icon} width={16} height={16} />
                    <span>{job.posted}</span>
                  </div>
                  <div className={styles.iconWithText}>
                    <Image src={iconMap['Alarm']} alt="Valid Till" className={styles.icon} width={16} height={16} />
                    <span>valid till: {job.validtill}</span>
                  </div>
                </div>  
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobPortal;

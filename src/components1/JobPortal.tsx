"use client";
import React from 'react';
import Image from 'next/image'; 
import { Row, Col, Card, Container } from 'react-bootstrap'; 
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
   <Container className={`py-4 ${styles.CardContainer}`}> 
     <Row className="g-4">
        {jobData.map((job, index) => (
          <Col key={index} md={6} lg={4} xl={3}> 
     <Card className={`h-100 shadow-sm p-3 ${styles.jobCard}`}> 
              <Image 
                src={job.imgSrc} 
                alt={job.title} 
                className="card-img-top" width={301} height={378} layout="responsive" />
               <Card.Body>
              <Card.Title className="mb-3">{job.title}</Card.Title>
             <div className="icon-container top-icons">
             {/* Top Icons */}
           {job.icons.slice(0, 2).map((icon, idx) => {
          console.log(icon); 
       return (
    <div 
      key={idx} 
      className={`icon-wrapper ${icon === "Stay" ? 'stay-icon' : ''}`} 
    >
      <Image src={iconMap[icon]} alt={icon} width={16} height={16} />
      <span>{icon}</span>
    </div>
      );
      })}
    </div>
 <div className="icon-container bottom-icons">
  {/* Bottom Icons */}
  {job.icons.slice(2).map((icon, idx) => (
    <div key={idx} className="icon-wrapper">
      <Image src={iconMap[icon]} alt={icon} width={16} height={16} />
      <span>{icon}</span>
    </div>
  ))}
</div>

 <div className="d-flex align-items-center gap-3 w-100">
  <div className="d-flex align-items-center flex-nowrap" style={{ marginLeft: '-25px' }} > 
    <Image src={iconMap['Clock']} alt="Posted" className="me-1" width={16} height={16} />
    <span className="text-muted" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{job.posted}</span>
  </div>
  <div className="d-flex align-items-center flex-nowrap"> 
    <Image src={iconMap['Alarm']} alt="Valid Till" className="me-1" width={16} height={16} />
    <span className="text-muted" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>valid till: {job.validtill}</span>
  </div>
</div>

              </Card.Body>
             </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobPortal;

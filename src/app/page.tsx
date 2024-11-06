import Image from "next/image";
import JobSlider from "@/components/jobs/JobSlider"; // Updated path for JobSlider
import styles from "./page.module.scss";
import JobPortal from "@/components/jobs/JobPortal";






export default function Home() {
  return (
    <main className={styles.main}>
      {/* Include the JobSlider component */}
      <JobSlider />

     
     
    </main>
  );
}

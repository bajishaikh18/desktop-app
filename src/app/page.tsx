
import JobSlider from "@/components/jobs/JobSlider"; // Updated path for JobSlider
import styles from "./page.module.scss";







export default function Home() {
  return (
    <main className={styles.main}>
          <div className='main-list-section'>

      {/* Include the JobSlider component */}
      <JobSlider />
</div>
     
     
    </main>
  );
}

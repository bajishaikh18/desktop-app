import Image from "next/image";
import JobSlider from "@/components1/common/JobSlider"; // Updated path for JobSlider
import JobPortal from "@/components1/JobPortal"; // Updated path for JobPortal
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Include the JobSlider component */}
      <JobSlider />

      {/* Include the JobPortal component */}
      <JobPortal />
    </main>
  );
}

import Image from "next/image";
import styles from "./container-image.module.css";

export default function ContainerImage({ src, height = "100vh", width = "100vw", alt = "", title = "", layout = "responsive", children }) {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={src} layout={layout} height={height} width={width} alt={alt} />

        <div className={styles.imageOverlay} />

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

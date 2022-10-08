import Image from "next/image";
import styles from "./container-image.module.css";

export default function ContainerImage({ src, alt = "", title = "", quality = 60, layout = "fill", children }) {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image className={styles.image} src={src} layout={layout} alt={alt} title={title} quality={quality} />

        <div className={styles.imageOverlay} />

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

import Image from "next/image";
import styles from "./container-image.module.css";
import cn from "classnames";

export default function ContainerImage({ src, alt = "", title = "", quality = 60, layout = "fill", classNameContent, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image className={styles.image} src={src} layout={layout} alt={alt} title={title} quality={quality} />

        <div className={styles.imageOverlay} />

        <div className={cn(styles.content, classNameContent)}>{children}</div>
      </div>
    </div>
  );
}

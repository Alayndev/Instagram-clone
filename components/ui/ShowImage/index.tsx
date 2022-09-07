import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function ShowImage({ src, alt, className }: any) {
  return (
    <>
      <LazyLoadImage
        effect="blur"
        src={src}
        alt={alt}
        className={className}
      />
    </>
  );
}
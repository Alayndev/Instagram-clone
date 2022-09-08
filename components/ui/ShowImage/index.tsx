import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ShowImageProps } from "lib/types";

export function ShowImage({ src, alt, className }: ShowImageProps) {
  return (
    <>
      <LazyLoadImage effect="blur" src={src} alt={alt} className={className} />
    </>
  );
}

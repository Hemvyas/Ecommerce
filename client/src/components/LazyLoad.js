import React, { useState, useEffect, useRef } from "react";

const LazyLoadImage = ({ src, alt, srcSet, sizes, ...props }) => {
  const imgRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isIntersecting ? src : ""}
      srcSet={isIntersecting ? srcSet : ""}
      sizes={sizes}
      alt={alt}
      {...props}
    />
  );
};

export default LazyLoadImage;

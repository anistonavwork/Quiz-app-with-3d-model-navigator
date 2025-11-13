import { useEffect, useRef } from "react";

export default function RPMAvatar({ url }) {
  const containerRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!url || !containerRef.current || !window.RPMLoader) return;

    if (loaderRef.current) loaderRef.current.dispose();

    loaderRef.current = new window.RPMLoader({
      container: containerRef.current,
      transparent: true,
      autoRotate: false,
      scale: 1.5,
    });

    loaderRef.current.load(url);

    return () => {
      if (loaderRef.current) loaderRef.current.dispose();
    };
  }, [url]);

  if (!url) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "350px",
        height: "500px",
        pointerEvents: "none",
        zIndex: 999,
      }}
    ></div>
  );
}

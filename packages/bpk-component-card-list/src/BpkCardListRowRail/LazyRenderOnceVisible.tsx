import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  placeholder: React.ReactNode;
  height: number;
  width: number;
};

const LazyRenderOnceVisible = ({
  children,
  height,
  placeholder,
  width,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (!hasBeenVisible) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasBeenVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      if (ref.current) observer.observe(ref.current);

      // Cleanup observer on unmount
      return () => {
        observer.disconnect();
      };
    }
    return undefined;
  }, [hasBeenVisible]);

  return <div ref={ref}>{hasBeenVisible ? children : placeholder}</div>;
};

export default LazyRenderOnceVisible;

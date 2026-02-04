import { Carousel } from 'antd';
import type { ReactNode } from 'react';

export default function CarouselComponent({ children }: { children: ReactNode }) {
  return (
    <Carousel arrows infinite={false}>
      {children}
    </Carousel>
  );
}

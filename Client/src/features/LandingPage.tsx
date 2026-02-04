
import { Button, Typography, Space } from 'antd';
import CarouselComponent from './CarouselComponent';

const { Title, Paragraph } = Typography;
const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '260px',
  objectFit: 'contain', 
  borderRadius: '12px',
};

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '48px',
        gap: '32px',
        backgroundColor: '#d195c2',
      }}
    >
      
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <CarouselComponent>
          <div>
            <img src="./images/book1.jpg" alt="Book 1" style={imageStyle} />
          </div>
          <div>
            <img src="./images/book2.jpg" alt="Book 2" style={imageStyle} />
          </div>
          <div>
            <img src="./images/book3.jpg" alt="Book 3" style={imageStyle} />
          </div>
        </CarouselComponent>
      </div>

      
      <Title level={1}>Welcome to BOOK</Title>
      <Paragraph>
        Discover and explore top books curated for you.
      </Paragraph>

      
      <Space size="large">
        <Button type="primary" size="large">
          Get Started
        </Button>
        <Button size="large">
          Already have an account
        </Button>
      </Space>
    </div>
  );
}

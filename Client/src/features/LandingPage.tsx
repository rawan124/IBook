import { Button, Typography, Row, Col } from 'antd';

 import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;


export default function LandingPage() {
    const navigate= useNavigate();



 return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
      <Row align="middle" gutter={[48, 48]}>
        <Col xs={24} md={12}>
          <Title style={{ fontSize: 48, lineHeight: 1.2, color: "#1F2937", fontFamily: "Playfair Display" }}>
            Discover stories that feel like home.
          </Title>

          <Paragraph style={{ fontSize: 20 , fontFamily:"Inter"}}>
            A curated space for readers who love beauty, depth, and elegance.
          </Paragraph>

          <div style={{ marginTop: 24 }}>
            <Button type="primary" size="large" onClick={()=> navigate('/books')}
            style={{boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)", fontFamily:"Inter"}} >
              Explore Books
            </Button>

            <Button
            type="primary"
              size="large"

              style={{ marginLeft: 16, boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)", fontFamily:"Inter" }}
              //onClick={() => navigate('/about')}
            >
              Join iBook
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

import { Card, Divider, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AboutSection = () => (
  <section style={{ padding: "40px 60px" }}>
    <Card
      style={{
        border: 'none',
        background: "#e1edf0",
        boxShadow: "0 2px 8px rgba(0,0,0,.04)",
        padding: "32px 40px",
      }}
    >
      <Title level={2} style={{ marginBottom: 16, textAlign: 'left' }}>
        About us
      </Title>
      <Divider/>

      <Paragraph style={{ fontSize: 16, maxWidth: 760, textAlign: 'left' }}>
        MovieBase is a lightweight catalogue built on&nbsp;
        <strong>The Movie Database</strong>. Our goal is to give you
        the essentials—trailers, ratings, cast and crew—without the ads or
        clutter you find on larger portals. Think of it as the fastest way to
        decide <em>what to watch tonight</em>.
      </Paragraph>
    </Card>
  </section>
);

export default AboutSection;

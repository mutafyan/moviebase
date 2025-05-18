import { Card, Divider, Typography, Grid } from "antd";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const AboutSection = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <section style={{ padding: isMobile ? "24px 16px" : "40px 60px" }}>
      <Card
        style={{
          border: "none",
          background: "#e1edf0",
          boxShadow: "0 2px 8px rgba(0,0,0,.04)",
          padding: isMobile ? 24 : 40,
        }}
      >
        <Title
          level={isMobile ? 3 : 2}
          style={{ marginBottom: 16, textAlign: "left" }}
        >
          About us
        </Title>
        <Divider />
        <Paragraph style={{ fontSize: 16, maxWidth: 760, textAlign: "left" }}>
          MovieBase is a lightweight catalogue built on
          <strong> The Movie Database</strong>. Our goal is to give you the
          essentials—trailers, ratings, cast and crew—without the ads or clutter
          you find on larger portals. Think of it as the fastest way to decide
          <em> what to watch tonight</em>.
        </Paragraph>
      </Card>
    </section>
  );
};

export default AboutSection;

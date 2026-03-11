import { Card, Avatar, Tag } from "antd";
import { useNavigate } from "react-router";

interface Props {
  id: string;
  fullName: string;
  country: string;
  isActive: boolean;
}

export default function AuthorCard({
  id,
  fullName,
  country,
  isActive
}: Props) {
  const navigate = useNavigate();

  const initials = fullName
    .split(" ")
    .map(n => n[0])
    .join("");

  return (
    <Card
      hoverable
      onClick={() => navigate(`/authors/${id}`)}
      style={{
        borderRadius: 20,
        textAlign: "center",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        height:"100%"
      }}
      styles={{ body: { padding: 28 } }}
    >

      <Avatar
        size={72}
        
        style={{
          backgroundColor: "#2563EB",
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 16
        }}
      >
        {initials}
      </Avatar>

      <h3
        style={{
          marginBottom: 4,
          fontWeight: 600,
          color: "#2C2C2C"
        }}
      >
        {fullName}
      </h3>

    
      <p
        style={{
          margin: 0,
          color: "#6B6B6B",
          fontSize: 14
        }}
      >
        {country}
      </p>

  
      <div style={{ marginTop: 18 }}>
        <Tag
          style={{
            borderRadius: 999,
            padding: "4px 14px",
            fontWeight: 500
          }}
          color={isActive ? "success" : "default"}
        >
          {isActive ? "Active" : "Inactive"}
        </Tag>
      </div>
    </Card>
  );
}

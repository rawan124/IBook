import { Tabs, Typography } from "antd";
import WishlistSection from "./WishlistSection";
import FavoritesSection from "./FavoritesSection";
import MyBooksSection from "./MyBooksSection";


const { Title } = Typography;

const ProfilePage = () => {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 40 }}>
      <Title  style={{color:" #2563EB"}} level={2}>My Profile</Title>

      <Tabs
        defaultActiveKey="wishlist"
        size="large"
        items={[
          {
            key: "wishlist",
            label: "📖 Wishlist",
            children: <WishlistSection />,
          },
          {
            key: "favorites",
            label: "❤️ Favorites",
            children: <FavoritesSection />,
          },
          {
            key: "books",
            label: "📚 My Books",
            children: <MyBooksSection />,
          },

        ]}
      />
    </div>
  );
};

export default ProfilePage;
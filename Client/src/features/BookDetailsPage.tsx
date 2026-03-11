import { Row, Col, Typography, Card, Divider, Button, Modal, Space } from "antd";
import { useNavigate, useParams } from "react-router";
import { useBookDetails } from "../lib/hooks/useBookDetails";
import { useAuth } from "../lib/hooks/useAuth";
import { ReviewsList } from "./ReviewsList";
import { ReviewForm } from "./ReviewForm";
import { useState } from "react";
import { useBookReviews } from "../lib/hooks/useReview";
import { useWishListActions } from "../lib/hooks/useWishListActions";
import { HeartOutlined, BookOutlined } from "@ant-design/icons";
import type { ReviewDto } from "../types/ReviewDto";
import { useWishList } from "../lib/hooks/useWishList";
import BookForm from "../app/components/BookForm";
import { useBookActions } from "../lib/hooks/useBookActions";
import type { BookFormValues } from "../types/BookDetails";
import { useFavoriteActions } from "../lib/hooks/useFavoriteActions";
const { Title, Paragraph, Text } = Typography;

export default function BookDetailsPage() {
  const { id } = useParams();
  const bookId = Number(id);
  const { data: book, isLoading } = useBookDetails(bookId);
  const { isAuthenticated, user } = useAuth();
  const wishlistQuery = useWishList();
  const {AddToFavorites}=useFavoriteActions();
  const navigate = useNavigate();
  //const [showReviewForm, setShowReviewForm] = useState(false);
  const reviewsQuery = useBookReviews(bookId);
  //const [editingReview, setEditingReview] = useState<ReviewDto | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewDto | null>(null);
  //const [selectedReview, setSelectedReview] = useState<ReviewDto | null>(null);
  //const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  //const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const {updateBook}=useBookActions();
  const canEdit = book?.createdByUserId===user?.id;
 const userAlreadyReviewed =
  (reviewsQuery.data ?? []).some(r => r.userName === user?.username);

  const { AddToWishlist } = useWishListActions();
  const inWishlist =
  (wishlistQuery.data ?? []).some(
    item => item.bookId === book?.id 
  );

  if (isLoading || !book) return null;

  const handleWishList = () => {
    if (!inWishlist) {
      AddToWishlist.mutate(bookId)
    }

  }
  const handleAddToFavorites=()=>{
    AddToFavorites.mutate(bookId);
  }
  const initialFormValues: BookFormValues = {
  title: book.title,
  name: book.name,
  summary: book.summary,
  description: book.description,
  imageUrl: book.imageUrl,
  authorIds: book.authors.map(a => Number(a.id))
};

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 48px" }}>
      <Card>
      <Row gutter={[48, 48]}>

        <Col xs={24} md={8}>
          <Card

            style={{ borderRadius: 16, overflow: "hidden" }}
            styles={{ body: { padding: 0 } }}
            cover={
              <img
                src={`http://localhost:5294${book.imageUrl}`}
                alt={book.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/book-placeholder.png";
                }}
                style={{
                  width: "100%",
                  height: 360,
                  objectFit: "cover",
                  display: "block"
                }}
              />
            }
          />
        </Col>


        <Col xs={24} md={16}>
          <Title level={2}>{book.title}</Title>

          <Text type="secondary">
            By{" "}
            {book.authors
              .map((a) => `${a.fullName}`)
              .join(", ")}
          </Text>

          <Divider style={{ margin: "32px 0" }} />

          <Paragraph strong style={{ fontSize: 16 }}>
            {book.summary}
          </Paragraph>
          <Space>
            
            
    
  <Button
    type={inWishlist ? "default" : "primary"}
    size="large"
    onClick={handleWishList}
  >
    {inWishlist ? "✓ In Wishlist" : "Add to Wishlist"}
  </Button>
  <Button onClick={handleAddToFavorites}>
    Add to favorites
  </Button>
   { canEdit && 
              <Button type="primary" size="large" onClick={()=> setIsUpdateModalOpen(true)}>
                Edit
                </Button>
              }
</Space>
        </Col>
      </Row>

      <Divider style={{ margin: "32px 0" }} />


      <Card variant="borderless" style={{ marginTop: 24 }}>
        <Title level={4}>About this book</Title>
        <Paragraph>{book.description}</Paragraph>
        <Text>
          <HeartOutlined /> {book.favoritedCount} Favorites </Text>
        <Text>
          <BookOutlined /> {book.wishlistedCount} people added this book to their Wishlist
        </Text>
      </Card>
      </Card>
      

      <Modal
  open={isUpdateModalOpen}
  onCancel={() => setIsUpdateModalOpen(false)}
  footer={null}
  destroyOnHidden
  title="Edit Book"
>
  <BookForm
    initialValues={initialFormValues}
    submitText="Update Book"
    loading={updateBook.isPending}
    onSubmit={(values) => {
      updateBook.mutate(
        { id: book.id, ...values },
        {
          onSuccess: () => {
            setIsUpdateModalOpen(false);
          },
        }
      );
    }}
  />
</Modal>

      <Card variant="borderless" style={{ marginTop: 24}}>
       
         <Title level={4} style={{ margin: 0 }}>
    Reviews ({reviewsQuery.data?.length ?? 0})
  </Title>
        {isAuthenticated ? (
          <>
            {!userAlreadyReviewed && (
              <>
                <Button
                  type="primary"
                  style={{ marginBottom: 16 }}
                  onClick={() => {
                    setSelectedReview({} as ReviewDto);
                 
                  }}
                >
                  Write a review
                </Button>
               

              </>
              
            )}
            
           
            {userAlreadyReviewed && (
              <Text type="secondary">
                You already reviewed this book.
              </Text>
            )}
            
            
            <Modal
  title={selectedReview?.id ? "Edit Review" : "Write Review"}
  open={!!selectedReview}
  onCancel={() => setSelectedReview(null)}
  footer={null}
  destroyOnHidden
>
  <ReviewForm
    key={selectedReview?.id ?? "create"}
    bookId={bookId}
    reviewId={selectedReview?.id}
    initialRating={selectedReview?.rating}
    initialContent={selectedReview?.content}
    onSuccess={() => 
setSelectedReview(null)}
  />
</Modal>

          </>

        ) : (
          <Button type='primary' onClick={() => navigate('/login')}>
            Sign in to add a Review
          </Button>
        )}
        <ReviewsList
          bookId={bookId}
          onEdit={(review) => {
            console.log(review)
            setSelectedReview(review);
          }}
        />
      </Card>
    </div>
  );
}

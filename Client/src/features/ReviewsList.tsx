import { Avatar, Button, Card, Rate, Typography } from "antd";
import { useBookReviews } from "../lib/hooks/useReview";
import { useState } from "react";
// import { ReviewForm } from "./ReviewForm";
import {EditOutlined} from '@ant-design/icons'
import type { ReviewDto } from "../types/ReviewDto";
import { useAuth } from "../lib/hooks/useAuth";
import { ReviewForm } from "./ReviewForm";

export const ReviewsList = ({
  bookId,
  onEdit,
}: {
  bookId: number;
  onEdit: (review: ReviewDto) => void;
}) => {
  const reviewsQuery = useBookReviews(bookId);
  const [editingReview, setEditingReview] = useState<ReviewDto | null>(null);
  const {user}=useAuth();
  if (reviewsQuery.isLoading) return <p>Loading reviews...</p>;
  if (!reviewsQuery.data?.length) return <p>No reviews yet.</p>;

  return (
    <>
    <div>
      {reviewsQuery.data.map((review) => (
         <Card 
    key={review.id}
    style={{
      marginBottom: 16,
      borderRadius: 16,
      border: "1px solid #E5E7EB",
      //boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    }}
  >
        <div key={review.id} >
            <Avatar style ={{ backgroundColor: "#FB923C", marginRight: 12 }} >
                {review.userName.charAt(0).toUpperCase()}
              </Avatar> 
          { user?.username === review.userName &&
              <Button
  type="text"
  icon={<EditOutlined />}
  onClick={() => onEdit(review)}
/>}
             
          <Typography.Text strong style={{ color: "#1F2937" }}>
            @{review.userName}
            
            </Typography.Text>
          <Rate disabled value={review.rating} />
          <p>{review.content}</p>
        </div>
        </Card>
      ))}
    </div>
   
  {editingReview && (
    <ReviewForm
    key={editingReview.id}
      bookId={bookId}
      reviewId={editingReview.id}
      initialRating={editingReview.rating}
      initialContent={editingReview.content}
      onSuccess={() => setEditingReview(null)}
    />
  )}
</>
  );
};

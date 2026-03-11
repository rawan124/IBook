import { message, Rate, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useAuth } from "../lib/hooks/useAuth";
import { useAddReview, useEditReview } from "../lib/hooks/useReview";
type Props = {
    bookId: number;
    initialRating?: number;
    initialContent?: string;
    reviewId?: number;
    onSuccess?: () => void;
};
export const ReviewForm = ({ bookId, initialRating, initialContent, reviewId, onSuccess }: Props) => {
  const [rating, setRating] = useState(initialRating ?? 0)
const [content, setContent] = useState(initialContent ?? "");

  const { isAuthenticated } = useAuth();
  const addReview = useAddReview(bookId);
  const editReview=useEditReview();

 

  const handleSubmit = () => {
    console.log("Submit clicked", { reviewId, rating, content });
    if (!rating) {
      message.error("Please select a rating");
      return;
    }
    if (reviewId !== undefined) {
      console.log('Edit Review')
         editReview.mutate(
      { rating, content, reviewId, bookId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
    }
    else{

    addReview.mutate(
      { rating, content },
      {
        onSuccess: () => {
     
          setRating(0);
          setContent("");
          onSuccess?.();

        },
      }
    );
  }
  };

  if (!isAuthenticated) {
    return <p>You must be logged in to leave a review.</p>;
  }

  return (
    <div>
      <Rate value={rating} onChange={setRating} />
      <TextArea
        rows={4}
        placeholder="Write your review..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginTop: 12 }}
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={addReview.isPending}
        style={{ marginTop: 12 }}
      >
        Submit Review
      </Button>
    </div>
  );
};

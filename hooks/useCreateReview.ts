import { useState } from 'react';
import axios from 'axios';

interface ReviewData {
  name: string;
  position: string;
  comment: string;
  rating: number;
  image: File;
  lang: 'ar' | 'en' | 'tr';
}

const useCreateReview = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateReview = async (data: ReviewData) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('position', data.position);
    formData.append('comment', data.comment);
    formData.append('rating', data.rating.toString());
    formData.append('image', data.image);
    formData.append('lang', data.lang);

    try {
      await axios.post('/api/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateReview, loading };
};

export default useCreateReview;

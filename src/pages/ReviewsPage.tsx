
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  date: Date;
  rating: number;
  comment: string;
}

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      authorName: 'Aditya M.',
      date: new Date(2023, 11, 10),
      rating: 5,
      comment: 'Great ride! Riapreet was very punctual and a safe driver. The car was clean and comfortable. Would definitely ride with her again!'
    },
    {
      id: '2',
      authorName: 'Priyanka G.',
      authorAvatar: '/lovable-uploads/dcfdc46b-dc19-4942-b1b9-c5435fac5470.png',
      date: new Date(2023, 10, 28),
      rating: 4,
      comment: 'Had a pleasant journey from Bangalore to Mysore. Riapreet is friendly and the journey was smooth.'
    },
    {
      id: '3',
      authorName: 'Rahul K.',
      date: new Date(2023, 10, 15),
      rating: 5,
      comment: 'Very professional and friendly. The car was clean and the ride was smooth. Riapreet is an excellent driver.'
    },
    {
      id: '4',
      authorName: 'Ananya S.',
      date: new Date(2023, 9, 30),
      rating: 4,
      comment: 'Great conversation and made sure I was comfortable throughout the journey. Would recommend!'
    },
    {
      id: '5',
      authorName: 'Vikram J.',
      date: new Date(2023, 9, 12),
      rating: 5,
      comment: 'One of the best carpooling experiences I\'ve had. Riapreet is punctual, friendly and a safe driver.'
    }
  ]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Reviews</h1>
      </div>
      
      {/* Summary */}
      <div className="bg-white p-5 border-b">
        <div className="flex items-center mb-2">
          <div className="text-3xl font-bold text-secondary mr-2">4.8</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className="h-5 w-5 text-yellow-400" 
                fill={star <= 4.8 ? "currentColor" : "none"} 
              />
            ))}
          </div>
        </div>
        <div className="text-gray-500">Based on {reviews.length} reviews</div>
      </div>
      
      {/* Reviews list */}
      <div className="p-4 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {review.authorAvatar ? (
                    <img 
                      src={review.authorAvatar} 
                      alt={review.authorName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-500 bg-gray-200">
                      {review.authorName.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium text-secondary">{review.authorName}</div>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(review.date)}
                  </div>
                </div>
              </div>
              
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-4 w-4 text-yellow-400" 
                    fill={star <= review.rating ? "currentColor" : "none"} 
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;

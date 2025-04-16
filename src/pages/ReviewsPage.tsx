
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

const ReviewsPage = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      name: "Priya Mehta",
      rating: 5.0,
      comment: "Great driver! Very punctual and the car was clean. Would definitely ride with Riapreet again.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Arjun Sharma",
      rating: 4.8,
      comment: "Smooth ride and great conversation. Riapreet is a reliable driver.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 5.0,
      comment: "Very professional and friendly. The car was comfortable.",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      rating: 4.9,
      comment: "Excellent service and very safe driving.",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Anjali Menon",
      rating: 5.0,
      comment: "Perfect ride! On time and very courteous.",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Vikram Singh",
      rating: 4.7,
      comment: "Great experience with Riapreet. Will definitely book again.",
      date: "1 month ago"
    },
    {
      id: 7,
      name: "Neha Gupta",
      rating: 5.0,
      comment: "Very comfortable ride and excellent driving skills.",
      date: "2 months ago"
    },
    {
      id: 8,
      name: "Karan Malhotra",
      rating: 4.9,
      comment: "Punctual, polite and professional. Highly recommended!",
      date: "2 months ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Reviews</h1>
      </div>

      <div className="p-4 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <div className="font-medium">{review.name}</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;

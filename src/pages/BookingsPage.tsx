
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  rating?: number;
}

interface Booking {
  id: string;
  rideId: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  date: Date;
  origin: string;
  destination: string;
  driver: User;
  price: number;
}

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockBookings: Booking[] = [
        {
          id: 'booking-1',
          rideId: 'ride-1',
          status: 'upcoming',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          origin: 'Delhi',
          destination: 'Chandigarh',
          driver: {
            id: 'driver-1',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            rating: 4.8
          },
          price: 349
        },
        {
          id: 'booking-2',
          rideId: 'ride-2',
          status: 'completed',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          origin: 'Mumbai',
          destination: 'Pune',
          driver: {
            id: 'driver-2',
            firstName: 'Priya',
            lastName: 'Sharma',
            rating: 4.9
          },
          price: 299
        },
        {
          id: 'booking-3',
          rideId: 'ride-3',
          status: 'cancelled',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          origin: 'Bangalore',
          destination: 'Mysore',
          driver: {
            id: 'driver-3',
            firstName: 'Amit',
            lastName: 'Patel',
            rating: 4.6
          },
          price: 249
        }
      ];
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter !== 'all' && booking.status !== filter) return false;
    
    if (search) {
      const searchTerm = search.toLowerCase();
      const fullName = `${booking.driver.firstName} ${booking.driver.lastName}`.toLowerCase();
      return (
        booking.origin.toLowerCase().includes(searchTerm) ||
        booking.destination.toLowerCase().includes(searchTerm) ||
        fullName.includes(searchTerm)
      );
    }
    
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming':
        return <Badge variant="default" className="bg-primary">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-green-600 border-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">My Bookings</h1>
      </div>
      
      <div className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search bookings..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex mt-4 space-x-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-full text-sm ${filter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm ${filter === 'completed' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-full text-sm ${filter === 'cancelled' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      <div className="space-y-4 mt-4 px-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
                <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white p-4 rounded-lg shadow-sm"
              onClick={() => navigate(`/rides/${booking.rideId}`)}
            >
              <div className="flex justify-between mb-2">
                <div className="text-gray-500">
                  {booking.date ? format(booking.date, 'EEE, MMM d') : 'Loading date...'}
                </div>
                {getStatusBadge(booking.status)}
              </div>
              
              <div className="font-semibold text-secondary text-lg mb-3">
                {booking.origin} → {booking.destination}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <div className="h-full w-full flex items-center justify-center text-gray-500 bg-gray-200">
                      {booking.driver.firstName.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="text-secondary">
                    {booking.driver.firstName} {booking.driver.lastName}
                  </div>
                </div>
                
                <div className="font-bold text-secondary">
                  ₹{booking.price}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-gray-500">No bookings found</p>
            <button 
              className="mt-4 text-primary font-semibold"
              onClick={() => navigate('/rides')}
            >
              Find a ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

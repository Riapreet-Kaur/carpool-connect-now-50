
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Ride } from '@/types';
import { generateMockRides, formatDate as utilsFormatDate } from '@/lib/utils';

const MyRidesPage = () => {
  const navigate = useNavigate();
  const [upcomingRides, setUpcomingRides] = useState<Ride[]>([]);
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  
  useEffect(() => {
    // In a real app, these would come from an API
    const mockRides = generateMockRides(10);
    
    // Set upcoming rides (future rides)
    const upcoming = mockRides.slice(0, 3).map(ride => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 7) + 1);
      return {...ride, departureDate: date, status: 'active' as 'active'};
    });
    
    // Set completed rides (past rides)
    const completed = mockRides.slice(3, 8).map(ride => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 14) - 1);
      return {...ride, departureDate: date, status: 'completed' as 'active'};
    });
    
    // Check for newly published rides from localStorage
    const publishedRideData = localStorage.getItem('publishedRide');
    if (publishedRideData) {
      try {
        const publishedRide = JSON.parse(publishedRideData);
        
        // Ensure departureDate is a Date object
        if (publishedRide.departureDate && !(publishedRide.departureDate instanceof Date)) {
          publishedRide.departureDate = new Date(publishedRide.departureDate);
        }
        
        // Add the published ride to the upcoming rides
        setUpcomingRides([publishedRide, ...upcoming]);
      } catch (error) {
        console.error('Error parsing published ride:', error);
        setUpcomingRides(upcoming);
      }
    } else {
      setUpcomingRides(upcoming);
    }
    
    setCompletedRides(completed);
  }, []);
  
  const formatDate = (date: Date | string): string => {
    // Ensure we're working with a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    return dateObj.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (time: string) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const m = minutes || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    
    return `${hour}:${m} ${ampm}`;
  };
  
  const RideCard = ({ ride }: { ride: Ride }) => (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
      onClick={() => navigate(`/rides/${ride.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-lg font-semibold text-secondary">
            {ride.origin} → {ride.destination}
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(ride.departureDate)}
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            {formatTime(ride.departureTime)}
          </div>
        </div>
        
        <div className="text-lg font-bold text-secondary">
          ₹{ride.price}
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 overflow-hidden">
          {ride.driver?.profilePicture ? (
            <img 
              src={ride.driver.profilePicture} 
              alt={`${ride.driver.firstName}`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              {ride.driver?.firstName?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <div className="text-sm">
          <span className="text-secondary">{ride.driver?.firstName} {ride.driver?.lastName?.charAt(0) || ''}</span>
          {ride.status === 'active' && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 rounded-full text-green-800 text-xs">
              Upcoming
            </span>
          )}
          {ride.status === 'completed' && (
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-gray-800 text-xs">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-1"
          >
            <ArrowLeft className="h-6 w-6 text-secondary" />
          </button>
          <h1 className="text-xl font-semibold text-secondary ml-4">My Rides</h1>
        </div>
        
        <Button
          variant="outline"
          onClick={() => navigate('/publish')}
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Publish Ride
        </Button>
      </div>
      
      {/* Tab content */}
      <div className="p-4">
        <Tabs defaultValue="upcoming">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingRides.length > 0 ? (
              upcomingRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No upcoming rides</p>
                <Button 
                  onClick={() => navigate('/publish')}
                  className="mt-4"
                >
                  Publish a ride
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedRides.length > 0 ? (
              completedRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No completed rides yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRidesPage;

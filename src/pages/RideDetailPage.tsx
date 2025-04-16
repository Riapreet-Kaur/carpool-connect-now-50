
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ride } from '@/types';
import { generateMockRides } from '@/lib/utils';
import RideDetail from '@/components/rides/RideDetail';
import SOSButton from '@/components/emergency/SOSButton';

// Import the mock rides we already have in RideSearchPage
import { delhiToChandigarhRides } from '@/data/mockRides';

const RideDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ride, setRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Look for the ride in our predefined Delhi to Chandigarh rides first
    const foundInDelhiChandigarh = delhiToChandigarhRides.find(r => r.id === id);
    
    if (foundInDelhiChandigarh) {
      console.log("Found ride in Delhi-Chandigarh dataset:", foundInDelhiChandigarh);
      setRide(foundInDelhiChandigarh);
      setLoading(false);
      return;
    }
    
    // If not found, try in the general mock rides as a fallback
    const timer = setTimeout(() => {
      // Generate some mock rides as fallback
      const mockRides = generateMockRides(10).map(ride => ({
        ...ride,
        status: "active" as "active"
      }));
      
      const foundRide = mockRides.find(r => r.id === id);
      console.log("Looking for ride with id:", id);
      console.log("Found in mock rides:", foundRide);
      
      setRide(foundRide || null);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 flex flex-col">
        <div className="bg-white h-12 w-full animate-pulse rounded-md mb-4"></div>
        <div className="flex-1 space-y-4">
          <div className="bg-white h-40 w-full animate-pulse rounded-lg"></div>
          <div className="bg-white h-32 w-full animate-pulse rounded-lg"></div>
          <div className="bg-white h-48 w-full animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-secondary mb-2">Ride not found</h2>
        <p className="text-gray-500">The ride you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <>
      <RideDetail ride={ride} />
      <SOSButton />
    </>
  );
};

export default RideDetailPage;

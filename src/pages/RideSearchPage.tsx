import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import RideCard from '@/components/rides/RideCard';
import { Ride } from '@/types';
import { Button } from '@/components/ui/button';
import SOSButton from '@/components/emergency/SOSButton';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { delhiToChandigarhRides } from '@/data/mockRides';

const RideSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("none");
  const [showNoRides, setShowNoRides] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get('origin')?.trim().toLowerCase() || '';
  const destination = searchParams.get('destination')?.trim().toLowerCase() || '';
  const dateParam = searchParams.get('date') || '';
  const passengers = Number(searchParams.get('passengers')) || 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      const isDelhi = origin === 'delhi';
      const isChandigarh = destination === 'chandigarh';
      const isToday = !dateParam || new Date(dateParam).toDateString() === new Date().toDateString();
      
      console.log('Search params:', { isDelhi, isChandigarh, isToday, origin, destination });
      
      if (isDelhi && isChandigarh && isToday) {
        const availableRides = delhiToChandigarhRides.filter(ride => 
          passengers <= ride.availableSeats
        );
        
        setRides(availableRides);
        setFilteredRides(availableRides);
        setShowNoRides(availableRides.length === 0);
      } else {
        setRides([]);
        setFilteredRides([]);
        setShowNoRides(true);
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [origin, destination, dateParam, passengers]);

  useEffect(() => {
    let result = [...rides];
    
    if (genderFilter !== "all") {
      result = result.filter(ride => ride.driver?.gender === genderFilter);
    }
    
    if (priceSort === "lowToHigh") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "highToLow") {
      result = result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredRides(result);
  }, [genderFilter, priceSort, rides]);

  const handleResetFilters = () => {
    setGenderFilter("all");
    setPriceSort("none");
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        
        <div className="text-center flex-1 mx-2">
          <div className="text-secondary font-medium">
            {origin} → {destination}
          </div>
          <div className="text-gray-500 text-sm">
            {dateParam || 'Today'}, {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
          </div>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Rides</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div>
                <h3 className="text-base font-semibold mb-3">Driver Gender</h3>
                <RadioGroup 
                  value={genderFilter} 
                  onValueChange={setGenderFilter}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Show all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male driver only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female driver only</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="text-base font-semibold mb-3">Price</h3>
                <Select value={priceSort} onValueChange={setPriceSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No sorting</SelectItem>
                    <SelectItem value="lowToHigh">Low to High</SelectItem>
                    <SelectItem value="highToLow">High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <SheetFooter className="pt-2">
              <Button 
                variant="outline" 
                onClick={handleResetFilters}
                className="w-full mt-2"
              >
                Reset Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="p-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="flex justify-between">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center mt-4 pt-4 border-t">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="ml-3">
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : showNoRides ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
            <h3 className="text-lg font-medium mb-2">No rides found</h3>
            <p>No rides match your search criteria</p>
            <Button 
              className="mt-6"
              onClick={() => navigate('/publish')}
            >
              Publish a ride
            </Button>
          </div>
        ) : filteredRides.length > 0 ? (
          <div>
            <h2 className="text-secondary font-semibold mb-4">
              {filteredRides.length} {filteredRides.length === 1 ? 'ride' : 'rides'} available
            </h2>
            <div className="space-y-4">
              {filteredRides.map((ride) => (
                <RideCard 
                  key={ride.id} 
                  ride={ride}
                  onClick={() => navigate(`/rides/${ride.id}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
            <h3 className="text-lg font-medium mb-2">No rides found with current filters</h3>
            <p>Try adjusting your filters or search criteria</p>
            <Button 
              className="mt-6"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      
      <SOSButton />
    </div>
  );
};

export default RideSearchPage;

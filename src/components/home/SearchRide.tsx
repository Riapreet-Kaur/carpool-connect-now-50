
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { cn } from '@/lib/utils';
import { indianStates } from '@/data/indianStates';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchRide = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState<string>("1");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (origin) searchParams.set('origin', origin);
    if (destination) searchParams.set('destination', destination);
    if (date) searchParams.set('date', date.toISOString());
    if (passengers) searchParams.set('passengers', passengers);
    
    navigate(`/rides?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Leaving from..." />
            </SelectTrigger>
            <SelectContent className="max-h-80 overflow-y-auto">
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Going to..." />
            </SelectTrigger>
            <SelectContent className="max-h-80 overflow-y-auto">
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <DatePicker 
          date={date} 
          setDate={setDate} 
          className={cn("border border-gray-200")}
          placeholder="Select date (optional)"
        />
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Number of passengers" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "passenger" : "passengers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full gap-2">
          <SearchIcon className="h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchRide;


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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchRide = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState<string>("1");
  const [openOrigin, setOpenOrigin] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  
  const filteredOriginLocations = searchOrigin.trim() === "" 
    ? indianStates 
    : indianStates.filter((state) => 
        state.toLowerCase().includes(searchOrigin.toLowerCase())
      );

  const filteredDestinationLocations = searchDestination.trim() === "" 
    ? indianStates 
    : indianStates.filter((state) => 
        state.toLowerCase().includes(searchDestination.toLowerCase())
      );
  
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
        {/* Origin field with combobox */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Popover open={openOrigin} onOpenChange={setOpenOrigin}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openOrigin}
                className="w-full justify-between pl-10 font-normal"
              >
                {origin ? origin : "Leaving from..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search location..." 
                  value={searchOrigin}
                  onValueChange={setSearchOrigin}
                />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-y-auto">
                    {filteredOriginLocations.map((state) => (
                      <CommandItem
                        key={state}
                        value={state}
                        onSelect={(currentValue) => {
                          setOrigin(currentValue);
                          setOpenOrigin(false);
                        }}
                      >
                        {state}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Destination field with combobox */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Popover open={openDestination} onOpenChange={setOpenDestination}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDestination}
                className="w-full justify-between pl-10 font-normal"
              >
                {destination ? destination : "Going to..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search location..." 
                  value={searchDestination}
                  onValueChange={setSearchDestination}
                />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-y-auto">
                    {filteredDestinationLocations.map((state) => (
                      <CommandItem
                        key={state}
                        value={state}
                        onSelect={(currentValue) => {
                          setDestination(currentValue);
                          setOpenDestination(false);
                        }}
                      >
                        {state}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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

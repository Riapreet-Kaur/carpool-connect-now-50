
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background illustration */}
      <div className="flex-1 bg-sky-200 flex flex-col items-center justify-center pt-20">
        <div className="w-32 h-32 flex items-center justify-center mb-12">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xl font-bold">CPC</span>
          </div>
        </div>
        
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-md h-48 bg-primary-50 rounded-lg flex items-center justify-center">
            <div className="text-primary text-lg font-semibold">Car Pool Connect</div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="z-10 bg-white p-8 rounded-t-3xl -mt-8 space-y-8">
        <h1 className="text-center text-secondary text-3xl font-bold">
          Your pick of rides at low prices
        </h1>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/signup')}
            className="btn-primary w-full"
          >
            Sign up
          </Button>
          
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="btn-secondary w-full"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

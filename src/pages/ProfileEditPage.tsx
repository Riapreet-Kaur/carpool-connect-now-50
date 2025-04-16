
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Riapreet',
    lastName: 'Kaur',
    email: '221210086@nitdelhi.ac.in',
    phone: '+918195889329',
    location: 'Delhi, India'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center border-b">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 mr-4"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileEditPage;

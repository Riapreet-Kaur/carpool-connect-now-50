
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { User as UserType } from '@/types';
import { Avatar } from '@/components/ui/avatar';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  // Try to get existing user data from localStorage
  const storedUser = localStorage.getItem('userProfile');
  const initialUser = storedUser ? JSON.parse(storedUser) : {
    id: 'user-1',
    firstName: 'Riapreet',
    lastName: 'Kaur',
    email: '221210086@nitdelhi.ac.in',
    profilePicture: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
    dateOfBirth: '1990-01-01',
    gender: 'female',
    rating: 4.9,
    verified: true,
    createdAt: new Date('2021-01-01')
  };

  const [user, setUser] = useState<UserType>(initialUser);

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    bio: user.bio || 'I enjoy road trips and meeting new people. Love listening to podcasts while driving.',
    phone: user.phoneNumber || '+918195889329',
    location: user.location || 'Delhi, India'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Create updated user object with all form values
    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone,
      bio: formData.bio,
      location: formData.location
    };

    // Update the state
    setUser(updatedUser);
    
    // Store updated information in localStorage for persistence
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    
    // Show success message
    toast.success('Profile updated successfully');
    
    // Navigate back
    navigate('/profile');
  };

  const handleImageUpload = () => {
    // Simulate image upload with a random avatar
    const avatars = [
      '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
      '/lovable-uploads/b63d7144-b3e0-4e03-a033-46a27dad4dba.png',
      '/lovable-uploads/b17b6fab-90bd-4ac0-aa4d-0d79a66be01b.png'
    ];
    
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    // Update user state
    const updatedUser = {
      ...user,
      profilePicture: randomAvatar
    };
    
    setUser(updatedUser);
    
    // Store the full updated user in localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    
    toast.success('Profile picture updated successfully');
  };

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
          <h1 className="text-xl font-semibold text-secondary ml-4">Edit Profile</h1>
        </div>
        <button 
          className="text-primary font-medium"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      
      {/* Profile Picture */}
      <div className="bg-white p-6 flex flex-col items-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={formData.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-3xl text-gray-500 bg-gray-200">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </Avatar>
          <button 
            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md"
            onClick={handleImageUpload}
            aria-label="Upload profile picture"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Edit Form */}
      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="font-medium text-secondary mb-3">Personal Information</h2>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                Tell other users about yourself
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-md">
          <h2 className="font-medium text-secondary mb-3">Contact Information</h2>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BellOff, Bell, User, CalendarClock, MessageSquare, ThumbsUp, Car } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'system' | 'ride' | 'message';
  read: boolean;
  title: string;
  message: string;
  time: Date;
  icon: React.ReactNode;
}

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch notifications
    setTimeout(() => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'ride',
          read: false,
          title: 'Ride request accepted',
          message: 'Ravi K. has accepted your ride request from Delhi to Jaipur on April 20.',
          time: new Date(Date.now() - 1000 * 60 * 30),
          icon: <Car className="h-5 w-5 text-primary" />
        },
        {
          id: '2',
          type: 'message',
          read: false,
          title: 'New message',
          message: 'Deepak M. sent you a message about your ride to Chandigarh.',
          time: new Date(Date.now() - 1000 * 60 * 60 * 2),
          icon: <MessageSquare className="h-5 w-5 text-blue-500" />
        },
        {
          id: '3',
          type: 'system',
          read: true,
          title: 'Welcome to CarPool Connect',
          message: 'Thank you for joining our community. Start by searching for a ride or offering one.',
          time: new Date(Date.now() - 1000 * 60 * 60 * 24),
          icon: <Bell className="h-5 w-5 text-yellow-500" />
        },
        {
          id: '4',
          type: 'ride',
          read: true,
          title: 'Reminder: Upcoming ride',
          message: 'You have a ride with Meera T. from Bangalore to Mysore tomorrow at 9:00 AM.',
          time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          icon: <CalendarClock className="h-5 w-5 text-green-500" />
        },
        {
          id: '5',
          type: 'system',
          read: true,
          title: 'Profile verification',
          message: 'Your profile has been successfully verified. Enjoy more trust from other users!',
          time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          icon: <User className="h-5 w-5 text-primary" />
        },
        {
          id: '6',
          type: 'message',
          read: true,
          title: 'New review',
          message: 'Ananya S. left you a 5-star review for your ride from Chennai to Pondicherry.',
          time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
          icon: <ThumbsUp className="h-5 w-5 text-green-500" />
        }
      ];
      
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);
  
  const filterNotifications = (type: string) => {
    if (type === 'all') return notifications;
    return notifications.filter(n => n.type === type);
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

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
          <h1 className="text-xl font-semibold text-secondary ml-4">Notifications</h1>
        </div>
        
        {unreadCount > 0 && (
          <Badge className="bg-primary">{unreadCount} new</Badge>
        )}
      </div>
      
      {/* Settings */}
      <div className="bg-white p-4 border-b">
        <h2 className="font-medium text-secondary mb-3">Notification Settings</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-500 mr-3" />
              <span>Email notifications</span>
            </div>
            <Switch 
              checked={emailEnabled} 
              onCheckedChange={setEmailEnabled} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BellOff className="h-5 w-5 text-gray-500 mr-3" />
              <span>Push notifications</span>
            </div>
            <Switch 
              checked={pushEnabled} 
              onCheckedChange={setPushEnabled} 
            />
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      <Tabs defaultValue="all" className="w-full">
        <div className="bg-white p-2 border-b">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ride">Rides</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-4">
          <TabsContent value="all">
            {renderNotificationsList(filterNotifications('all'))}
          </TabsContent>
          
          <TabsContent value="ride">
            {renderNotificationsList(filterNotifications('ride'))}
          </TabsContent>
          
          <TabsContent value="message">
            {renderNotificationsList(filterNotifications('message'))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
  
  function renderNotificationsList(filteredNotifications: Notification[]) {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="flex">
                <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (filteredNotifications.length === 0) {
      return (
        <div className="text-center py-10">
          <BellOff className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id}
            className={`bg-white rounded-lg p-4 ${notification.read ? '' : 'border-l-4 border-primary'}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex">
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                {notification.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className={`font-medium ${notification.read ? 'text-secondary' : 'text-primary'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatTime(notification.time)}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default NotificationsPage;

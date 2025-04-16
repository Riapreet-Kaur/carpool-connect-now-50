
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatInterface from '@/components/chat/ChatInterface';
import { User, Message } from '@/types';
import { generateId } from '@/lib/utils';
import { mockRecipients } from '@/data/mockRides';

// Mock current user
const currentUser: User = {
  id: 'current-user',
  firstName: 'Riapreet',
  lastName: 'Kaur',
  email: 'riapreet.kaur@example.com',
  verified: true,
  createdAt: new Date()
};

// Different conversation templates for each user
const conversationTemplates: Record<string, Message[]> = {
  'user-1': [
    {
      id: 'msg-1-1',
      senderId: 'user-1',
      receiverId: 'current-user',
      content: 'Hi Riapreet, I'm interested in your ride from Delhi to Jaipur tomorrow. Is there still space available?',
      read: true,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 'msg-1-2',
      senderId: 'current-user',
      receiverId: 'user-1',
      content: 'Hello Ankit! Yes, I have 2 seats available. Will you be traveling alone?',
      read: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 'msg-1-3',
      senderId: 'user-1',
      receiverId: 'current-user',
      content: 'Just me, and I'll have one medium-sized suitcase. What time are you planning to leave?',
      read: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 'msg-1-4',
      senderId: 'current-user',
      receiverId: 'user-1',
      content: 'I'll be leaving at 7 AM from Connaught Place. Does that work for you?',
      read: true,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: 'msg-1-5',
      senderId: 'user-1',
      receiverId: 'current-user',
      content: 'That's perfect! I'll book the seat now. Do you plan to make any stops in between?',
      read: true,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: 'msg-1-6',
      senderId: 'current-user',
      receiverId: 'user-1',
      content: 'I usually stop once for breakfast at a dhaba near Gurugram. We should reach Jaipur by 12:30 PM.',
      read: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ],
  'user-2': [
    {
      id: 'msg-2-1',
      senderId: 'user-2',
      receiverId: 'current-user',
      content: 'Riapreet, does your ride from Bangalore to Mysore have space for 2 people?',
      read: true,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 'msg-2-2',
      senderId: 'current-user',
      receiverId: 'user-2',
      content: 'Hi Divya! Yes, I have exactly 2 seats available.',
      read: true,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 'msg-2-3',
      senderId: 'user-2',
      receiverId: 'current-user',
      content: 'Great! We need to be at Mysore Palace by 3 PM. Will we make it in time?',
      read: true,
      createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000)
    },
    {
      id: 'msg-2-4',
      senderId: 'current-user',
      receiverId: 'user-2',
      content: 'Definitely! We'll be leaving at 11 AM from Indiranagar and should reach by 1:30 PM, giving you plenty of time.',
      read: true,
      createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000)
    },
    {
      id: 'msg-2-5',
      senderId: 'user-2',
      receiverId: 'current-user',
      content: 'Can we put small luggage in the boot? My friend and I both have backpacks.',
      read: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 'msg-2-6',
      senderId: 'current-user',
      receiverId: 'user-2',
      content: 'Absolutely, there's plenty of space for backpacks. See you tomorrow!',
      read: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ],
  'user-3': [
    {
      id: 'msg-3-1',
      senderId: 'user-3',
      receiverId: 'current-user',
      content: 'Hi, I saw your posting for the ride from Chennai to Pondicherry this weekend.',
      read: true,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3-2',
      senderId: 'current-user',
      receiverId: 'user-3',
      content: 'Hello Kunal! Yes, I'm driving there on Saturday morning.',
      read: true,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3-3',
      senderId: 'user-3',
      receiverId: 'current-user',
      content: 'Perfect! I'm visiting the Auroville community. Where in Chennai are you starting from?',
      read: true,
      createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3-4',
      senderId: 'current-user',
      receiverId: 'user-3',
      content: 'I'll be starting from T. Nagar around 8 AM. I can pick you up if you're nearby.',
      read: true,
      createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3-5',
      senderId: 'user-3',
      receiverId: 'current-user',
      content: 'I'm at Adyar, not too far. Do you know ECR? It's a beautiful coastal route to Pondicherry.',
      read: true,
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3-6',
      senderId: 'current-user',
      receiverId: 'user-3',
      content: 'Yes, I'm planning to take ECR! We can stop at Mahabalipuram temple on the way if you'd like.',
      read: true,
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
    },
    {
      id: 'msg-3-7',
      senderId: 'user-3',
      receiverId: 'current-user',
      content: 'That would be amazing! I'll book the seat now.',
      read: true,
      createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000)
    }
  ]
};

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipient, setRecipient] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    if (id) {
      // Find recipient using the consistent ID from the mockRecipients
      const foundRecipient = mockRecipients.find(r => r.id === id) || null;
      console.log("Looking for recipient with ID:", id);
      console.log("Found recipient:", foundRecipient);
      
      setRecipient(foundRecipient);
      
      // Load the appropriate conversation template based on user ID
      if (foundRecipient && id in conversationTemplates) {
        setMessages(conversationTemplates[id]);
      } else if (foundRecipient) {
        // Fallback to empty conversation
        setMessages([]);
      }
    }
  }, [id]);

  const handleSendMessage = (content: string) => {
    if (!recipient) return;
    
    const newMessage: Message = {
      id: generateId(),
      senderId: currentUser.id,
      receiverId: recipient.id,
      content: content,
      read: false,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  if (!recipient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading chat...</p>
      </div>
    );
  }

  return (
    <ChatInterface
      recipient={recipient}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default ChatPage;

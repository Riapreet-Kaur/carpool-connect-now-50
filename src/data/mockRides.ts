
import { Ride } from '@/types';

// Indian drivers for the rides
const indianDrivers = [
  {
    id: "d1",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.7,
    gender: "male",
  },
  {
    id: "d2",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.9,
    gender: "female",
  },
  {
    id: "d3",
    firstName: "Amit",
    lastName: "Singh",
    email: "amit@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.5,
    gender: "male",
  },
  {
    id: "d4",
    firstName: "Neha",
    lastName: "Patel",
    email: "neha@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.8,
    gender: "female",
  },
  {
    id: "d5",
    firstName: "Vikram",
    lastName: "Malhotra",
    email: "vikram@example.com",
    verified: true,
    createdAt: new Date(),
    rating: 4.6,
    gender: "male",
  },
];

// Consistent Delhi to Chandigarh rides
export const delhiToChandigarhRides: Ride[] = [
  {
    id: "r1",
    driverId: "d1",
    driver: indianDrivers[0],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "07:00",
    estimatedArrival: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(),
    availableSeats: 3,
    price: 349,
    currency: "₹",
    carModel: "Maruti Swift",
    carColor: "White",
    status: "active" as "active",
    createdAt: new Date(),
  },
  {
    id: "r2",
    driverId: "d2",
    driver: indianDrivers[1],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "08:30",
    estimatedArrival: new Date(new Date().getTime() + 4.5 * 60 * 60 * 1000).toISOString(),
    availableSeats: 2,
    price: 299,
    currency: "₹",
    carModel: "Hyundai i20",
    carColor: "Silver",
    status: "active" as "active",
    createdAt: new Date(),
  },
  {
    id: "r3",
    driverId: "d3",
    driver: indianDrivers[2],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "09:15",
    estimatedArrival: new Date(new Date().getTime() + 4.2 * 60 * 60 * 1000).toISOString(),
    availableSeats: 4,
    price: 399,
    currency: "₹",
    carModel: "Honda City",
    carColor: "Blue",
    status: "active" as "active",
    createdAt: new Date(),
  },
  {
    id: "r4",
    driverId: "d4",
    driver: indianDrivers[3],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "10:00",
    estimatedArrival: new Date(new Date().getTime() + 3.8 * 60 * 60 * 1000).toISOString(),
    availableSeats: 1,
    price: 449,
    currency: "₹",
    carModel: "Mahindra XUV300",
    carColor: "Red",
    status: "active" as "active",
    createdAt: new Date(),
  },
  {
    id: "r5",
    driverId: "d5",
    driver: indianDrivers[4],
    origin: "Delhi",
    destination: "Chandigarh",
    departureDate: new Date(),
    departureTime: "11:30",
    estimatedArrival: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(),
    availableSeats: 3,
    price: 249,
    currency: "₹",
    carModel: "Toyota Innova",
    carColor: "Black",
    status: "active" as "active",
    createdAt: new Date(),
  },
];

// Mock recipients for chat with consistent IDs and Indian names
export const mockRecipients = [
  {
    id: 'user-1',
    firstName: 'Ankit',
    lastName: 'Sharma',
    email: 'ankit.sharma@example.com',
    profilePicture: '/assets/user1.png',
    verified: true,
    createdAt: new Date()
  },
  {
    id: 'user-2',
    firstName: 'Divya',
    lastName: 'Patel',
    email: 'divya.patel@example.com',
    profilePicture: '/assets/user2.png',
    verified: true,
    createdAt: new Date()
  },
  {
    id: 'user-3',
    firstName: 'Kunal',
    lastName: 'Verma',
    email: 'kunal.verma@example.com',
    profilePicture: '/assets/user3.png',
    verified: true,
    createdAt: new Date()
  }
];

// Generate mock messages with Indian context
export const generateMockMessages = (senderId: string, receiverId: string) => {
  // Different conversations for each chat
  if (receiverId === 'user-1') {
    return [
      {
        id: '1',
        senderId,
        receiverId,
        content: "Hi Ankit, I'm interested in your ride from Jaipur to Udaipur tomorrow.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        read: true
      },
      {
        id: '2',
        senderId: receiverId,
        receiverId: senderId,
        content: "Hello! Yes, I'll be leaving around 9 AM. How many seats do you need?",
        createdAt: new Date(Date.now() - 1000 * 60 * 25),
        read: true
      },
      {
        id: '3',
        senderId,
        receiverId,
        content: "Just one seat for me. Do you allow medium-sized luggage?",
        createdAt: new Date(Date.now() - 1000 * 60 * 20),
        read: true
      },
      {
        id: '4',
        senderId: receiverId,
        receiverId: senderId,
        content: "Yes, that's fine. I drive a Hyundai Creta, so there's plenty of space in the boot.",
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
        read: true
      }
    ];
  } else if (receiverId === 'user-2') {
    return [
      {
        id: '1',
        senderId,
        receiverId,
        content: "Hello Divya, do you still have 2 seats available for the Pune to Mumbai ride?",
        createdAt: new Date(Date.now() - 1000 * 60 * 45),
        read: true
      },
      {
        id: '2',
        senderId: receiverId,
        receiverId: senderId,
        content: "Hi there! Yes, I do. When are you planning to travel?",
        createdAt: new Date(Date.now() - 1000 * 60 * 40),
        read: true
      },
      {
        id: '3',
        senderId,
        receiverId,
        content: "This Friday. What time will you reach Dadar?",
        createdAt: new Date(Date.now() - 1000 * 60 * 35),
        read: true
      },
      {
        id: '4',
        senderId: receiverId,
        receiverId: senderId,
        content: "I should reach Dadar around 3 PM, traffic permitting. Will that work?",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        read: true
      }
    ];
  } else {
    return [
      {
        id: '1',
        senderId,
        receiverId,
        content: "Kunal, I saw your ride from Chandigarh to Delhi. Is it still available?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
        read: true
      },
      {
        id: '2',
        senderId: receiverId,
        receiverId: senderId,
        content: "Yes, I have 3 seats available. When do you want to travel?",
        createdAt: new Date(Date.now() - 1000 * 60 * 55),
        read: true
      },
      {
        id: '3',
        senderId,
        receiverId,
        content: "I need to be in Delhi by tomorrow evening. Is the pickup point at Sector 17?",
        createdAt: new Date(Date.now() - 1000 * 60 * 50),
        read: true
      },
      {
        id: '4',
        senderId: receiverId,
        receiverId: senderId,
        content: "Yes, Sector 17 is perfect. We'll leave around 2 PM. I drive a white Maruti Swift.",
        createdAt: new Date(Date.now() - 1000 * 60 * 45),
        read: true
      }
    ];
  }
};

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
    profilePicture: "/lovable-uploads/1cebc420-97f9-4f39-af90-5f342327a793.png"
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

// Mock recipients for chat with consistent IDs
export const mockRecipients = [
  {
    id: 'user-1',
    firstName: 'Rajesh',
    lastName: 'Sharma',
    email: 'rajesh.sharma@example.com',
    profilePicture: '/lovable-uploads/8709c341-a273-4678-8345-65a0ccb7e0ec.png',
    verified: true,
    createdAt: new Date()
  },
  {
    id: 'user-2',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    verified: true,
    createdAt: new Date()
  },
  {
    id: 'user-3',
    firstName: 'Amit',
    lastName: 'Kumar',
    profilePicture: '/lovable-uploads/b63d7144-b3e0-4e03-a033-46a27dad4dba.png',
    email: 'amit.kumar@example.com',
    verified: true,
    createdAt: new Date()
  }
];

// Update the mock messages to use Indian cities
export const generateMockMessages = (senderId: string, receiverId: string) => [
  {
    id: '1',
    senderId,
    receiverId,
    content: "I'm interested in your ride from Mumbai to Pune.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    read: true
  },
  {
    id: '2',
    senderId: receiverId,
    receiverId: senderId,
    content: "What time do you need to reach Pune?",
    createdAt: new Date(Date.now() - 1000 * 60 * 25),
    read: true
  },
  // Add more Indian city-specific messages as needed
];

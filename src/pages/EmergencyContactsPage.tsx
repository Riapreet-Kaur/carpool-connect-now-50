
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const EmergencyContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Sakshi', phone: '8130793440', relationship: 'Friend' },
    { id: '2', name: 'Mom', phone: '9872014069', relationship: 'Family' }
  ]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const handleAddContact = () => {
    // Validate input
    if (!newContact.name || !newContact.phone) {
      toast.error('Name and phone number are required');
      return;
    }

    // Add new contact
    setContacts([
      ...contacts,
      {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        relationship: newContact.relationship
      }
    ]);

    // Reset form
    setNewContact({ name: '', phone: '', relationship: '' });
    setIsAddingContact(false);
    toast.success('Emergency contact added');
  };

  const handleDeleteContact = (id: string) => {
    setContactToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      setContacts(contacts.filter(contact => contact.id !== contactToDelete));
      toast.success('Emergency contact removed');
    }
    setDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-1"
        >
          <ArrowLeft className="h-6 w-6 text-secondary" />
        </button>
        <h1 className="text-xl font-semibold text-secondary ml-4">Emergency Contacts</h1>
      </div>
      
      {/* Content */}
      <div className="p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <p className="text-gray-700">
            Emergency contacts will be notified if you activate the SOS feature during a ride.
            Your current location and ride details will be shared with them.
          </p>
        </div>
        
        {/* Contacts list */}
        <div className="space-y-4 mb-6">
          {contacts.map(contact => (
            <div key={contact.id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-secondary">{contact.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </div>
                {contact.relationship && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full mt-2 inline-block">
                    {contact.relationship}
                  </span>
                )}
              </div>
              <button 
                className="text-red-500 p-2"
                onClick={() => handleDeleteContact(contact.id)}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        {/* Add contact form */}
        {isAddingContact ? (
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <h3 className="font-medium text-secondary">Add Emergency Contact</h3>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Name</label>
              <Input
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Full name"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
              <Input
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                placeholder="Phone number"
                type="tel"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Relationship (Optional)</label>
              <Input
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                placeholder="E.g., Family, Friend, Partner"
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsAddingContact(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleAddContact}
              >
                Save Contact
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={() => setIsAddingContact(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Emergency Contact
          </Button>
        )}
      </div>
      
      {/* Delete confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Emergency Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this emergency contact? They will no longer be notified in case of an emergency.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmergencyContactsPage;

import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contacts")
      .then(res => res.json())
      .then(setContacts);
  }, []);

  const addContact = (contact) => {
    setContacts(prev => [contact, ...prev]);
  };

  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "DELETE"
    });
    setContacts(prev => prev.filter(c => c._id !== id));
  };

  return (
    <div className="app-container">
      <h2>Contact Manager</h2>

      <ContactForm onAdd={addContact} />

      <ContactList
        contacts={contacts}
        onDelete={deleteContact}
      />
    </div>
  );
}

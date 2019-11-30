import uuidv4 from 'uuid/v4';

import capitalize from '../utils/capitalize';
import sleep from '../utils/sleep';
import contactList from './mock/contact-list.json';
import randomContact from './mock/random-contact.json';
import userContact from './mock/user-contact.json';

const mapContact = (contact: any) => {
  const { name, picture, phone, cell, email } = contact;

  return {
    id: uuidv4(),
    name: `${capitalize(name.first)} ${capitalize(name.last)}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};

export const fetchContacts = async () => {
  await sleep(500);

  return contactList.results.map(mapContact);
};

// export const fetchContactsById = async (id:string) => {
//   await sleep(500);
//   const contacts = contactList.results.map(mapContact);
//   const selectedContact = contacts.find(c => c.id===id);
//   console.log('selectedContact', selectedContact);
//   return selectedContact;  // return contactList.results.map(mapContact).find(contact => contact.id === id);
// };

export const fetchUserContact = async () => {
  await sleep(500);

  return mapContact(userContact.results[0]);
};

export const fetchRandomContact = async () => {
  await sleep(500);

  return mapContact(randomContact.results[0]);
};
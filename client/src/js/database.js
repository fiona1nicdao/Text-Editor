import { openDB } from 'idb';

// Function initdb() opens an instance in our indexDB called 'jate',update
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method that takes some content and adds it to the IndexDB database using the i db module
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate,1');
  const tx = jateDb.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id:1, value:content});
  const result = await request;
  console.log(':rocket: - data saved to the database', result.value);
}
// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
// Method that gets content from the IndexDB database using the idb module 
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate','readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result 
    ? console.log(':rocket: -data retrieved from the databased', result.value)
    : console.log(':rocket: -data not found in the database');
  // Check if a varible is defined and if it is, return it. (Optional Chaining)
  return result?.value;
};
//  console.error('getDb not implemented');

initdb();

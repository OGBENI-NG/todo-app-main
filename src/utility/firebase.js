// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, remove, child, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa0meD0Oi-POKPNh88pDXQwBYutD_jJzs",
  authDomain: "todo-main-ac9d3.firebaseapp.com",
  projectId: "todo-main-ac9d3",
  storageBucket: "todo-main-ac9d3.appspot.com",
  messagingSenderId: "615241456513",
  appId: "1:615241456513:web:f8ceb9e7568ef97f25e680",
  databaseURL: "https://todo-main-ac9d3-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// Function to add a new todo to Firebase with a negative timestamp as its position
const pushInputValueToFirebase = (inputValue) => {
  // Reference to the 'todo-main' location in the Firebase database
  const todoRef = ref(database, 'todo-main');

  // Generate a new unique reference for the new todo
  const newPostRef = push(todoRef);

  // Use a negative timestamp as a position for new todos
  set(newPostRef, {
    value: inputValue,        // The value of the todo
    isChecked: false,         // Initial state: unchecked
    timestamp: Date.now(),    // Current timestamp for ordering
    position: -Date.now(),    // Use a negative timestamp as a position for new todos
  });
};

// Function to fetch the list of todos from Firebase and invoke a callback
const fetchTodoListFromFirebase = (callback) => {
  // Reference to the 'todo-main' location in the Firebase database
  const todoRef = ref(database, 'todo-main');

  // Listen for changes at the 'todo-main' location in the database
  onValue(todoRef, (snapshot) => {
    // Get the data snapshot from the database
    const data = snapshot.val();

    if (data) {
      // Convert the data into an array of todos with additional properties
      const todoList = Object.keys(data)
        .map((key) => ({
          id: key,                         // Unique identifier for the todo
          value: data[key].value,          // The value of the todo
          isChecked: data[key].isChecked,  // The completion status of the todo
          timestamp: data[key].timestamp || 0,  // The timestamp for ordering (default to 0 if not present)
          position: data[key].position || 0,   // The position for ordering (default to 0 if not present)
        }))
        .sort((a, b) => a.position - b.position); // Sort by position in descending order

      // Invoke the callback with the sorted list of todos
      callback(todoList);
    } else {
      // If there is no data, invoke the callback with an empty array
      callback([]);
    }
  });
};

// Function to remove a todo from Firebase based on its ID
const removeTodoFromFirebase = (todoId) => {
  // Reference to the 'todo-main' location in the Firebase database
  const todoRef = ref(database, 'todo-main');

  // Reference to the specific todo item based on its ID
  const todoItemRef = child(todoRef, todoId);

  // Remove the todo item from the database
  return remove(todoItemRef);
};

//export all the firebase function
export { 
  database, pushInputValueToFirebase, 
  fetchTodoListFromFirebase, ref, remove , 
  removeTodoFromFirebase, update
};
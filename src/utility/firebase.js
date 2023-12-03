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

//send data to firebase
const pushInputValueToFirebase = (inputValue, position) => {
  const todoRef = ref(database, 'todo-main');
  const newPostRef = push(todoRef);

  set(newPostRef, {
    value: inputValue,
    isChecked: false,
    timestamp: Date.now(),
    position: position, // Use the timestamp as position
  });
};

const fetchTodoListFromFirebase = (callback) => {
  const todoRef = ref(database, 'todo-main');

  onValue(todoRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const todoList = Object.keys(data)
        .map((key) => ({
          id: key,
          value: data[key].value,
          isChecked: data[key].isChecked,
          timestamp: data[key].timestamp || 0,
          position: data[key].position || 0,
        }))
        .sort((a, b) => b.position - a.position); // Sort by position in descending order

      callback(todoList);
    } else {
      callback([]);
    }
  });
};



const removeTodoFromFirebase = (todoId) => {
  const todoRef = ref(database, 'todo-main');
  const todoItemRef = child(todoRef, todoId);

  return remove(todoItemRef);
};

export { 
  database, pushInputValueToFirebase, 
  fetchTodoListFromFirebase, ref, remove , 
  removeTodoFromFirebase, update
};
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Todo } from '../models/model';
import { db } from './index';

// Get All tasks for a user
export const getTasksByUserId = async (userId: string) => {
  try {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const active: Todo[] = [];
    const completed: Todo[] = [];

    querySnapshot.docs.forEach((doc) => {
      const todo = {
        id: doc.id,
        ...doc.data(),
      } as Todo;

      if (doc.data().isDone) {
        completed.push(todo);
      } else {
        active.push(todo);
      }
    });

    return { active, completed };
  } catch (error) {
    console.error('ERROR getting tasks', error);
    throw new Error('Error getting tasks');
  }
};

export const addTask = async (todo: Omit<Todo, 'id'>) => {
  try {
    const tasksRef = collection(db, 'tasks');
    const docRef = await addDoc(tasksRef, todo);
    const newTask: Todo = {
      id: docRef.id,
      ...todo,
    };
    return newTask;
  } catch (error) {
    console.error('ERROR adding task', error);
    throw new Error('Error adding task');
  }
};

export const updateTask = async (
  taskId: string,
  options: {
    isDone?: boolean;
    todo?: string;
  }
) => {
  try {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, options);
  } catch (error) {
    console.error('Error updating task: ' + error);
    throw new Error('Error updating task');
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const docRef = doc(db, 'tasks', taskId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('ERROR deleting task', error);
    throw new Error('Error deleting task');
  }
};

export const deleteAllTask = async (tasks: Todo[]) => {
  for (const task of tasks) {
    await deleteTask(task.id);
  }
};

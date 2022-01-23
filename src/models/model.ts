export interface Todo {
  id: string;
  todo: string;
  isDone: boolean;
  userId: string;
}

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  avatar: string | null;
}

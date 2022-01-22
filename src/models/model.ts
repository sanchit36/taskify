export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  avatar: string | null;
}

import {User} from "./User";

export class Task{
  id: number;
  description: string;
  done: boolean;
  users: User[];
  resource: number;

  constructor(partial: Partial<Task>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

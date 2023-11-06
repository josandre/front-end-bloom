import { Role } from './role';

export class User {
  id: number;
  img: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;

  constructor(partial?:Partial<User>) {
    if(partial){
      Object.assign(this,partial)
    }
  }
}

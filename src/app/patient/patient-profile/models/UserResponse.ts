import {User} from "./User";

export class UserResponse{
  statusCode: number;
  objectResponse: User;
  status: string;

  constructor(partial?: Partial<UserResponse>) {
    if(partial){
      Object.assign(this, partial)
    }
  }

}

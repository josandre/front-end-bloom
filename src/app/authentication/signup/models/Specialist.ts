import {User} from "./User";

export class Specialist{
  id: number;
  college: string;
  speciality: string;
  location: string;
  user: User;
  medicalId: string;

  constructor(partial?:Partial<Specialist>) {
    if(partial){
      Object.assign(this, partial);
    }
  }

}

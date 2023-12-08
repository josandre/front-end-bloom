export class Patient {
  id: number;
  lastName: string;
  name: string;
  userName: string;
  active: boolean;
  email: string;

  constructor(partial?: Partial<Patient>) {
    if(partial){
      Object.assign(this, partial)
    }
  }

}

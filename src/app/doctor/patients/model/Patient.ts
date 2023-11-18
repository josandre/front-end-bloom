export class Patient{
  id: number;
  citizenId: number;
  name: string;
  lastName: string;
  address: string;
  phone: string;
  password: string;
  email: string;
  isActive: boolean;
  userName: string;
  photo: string;

  constructor(partial?: Partial<Patient>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

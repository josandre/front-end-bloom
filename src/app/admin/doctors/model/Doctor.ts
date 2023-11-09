export class Doctor {
  id: number;
  citizenId: number;
  name: string;
  lastName: string;
  address: string;
  phone: string;
  password: string;
  email: string;
  active: boolean;
  userName: string;

  constructor(partial?: Partial<Doctor>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

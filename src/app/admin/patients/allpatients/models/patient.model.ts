export class Patient {
  id: number;
  userName: string;
  active: boolean;

  constructor(partial?: Partial<Patient>) {
    if(partial){
      Object.assign(this, partial)
    }
  }

}

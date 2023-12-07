export class Notificaction {
  type: string;
  message: string;
  email: string;

  constructor(partial?: Partial<Notificaction>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

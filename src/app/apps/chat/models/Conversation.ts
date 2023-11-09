export class Conversation{
  id: number;
  date: Date;
  name: String
  lastName: String

  constructor(partial?: Partial<Conversation>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

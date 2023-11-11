export class Conversation{
  id: number;
  date: Date;
  name: String;
  lastName: String;
  senderId: number;
  receiverId: number;

  constructor(partial?: Partial<Conversation>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

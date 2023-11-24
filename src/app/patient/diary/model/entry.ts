export class Entry {
  id: number;
  name: string;
  date: Date;
  content: string;
  //set de tags

  constructor(partial?: Partial<Entry>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

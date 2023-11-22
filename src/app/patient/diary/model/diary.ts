import { Entry } from './entry';

export class Diary {
  id: number;
  title: string;
  entries: Entry[];

  constructor(partial?: Partial<Diary>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

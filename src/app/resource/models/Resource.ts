export class Resource{
  id: number;
  date: Date;
  title: string;
  content: string;
  specialist: string;
  users: string;
  constructor(partial: Partial<Resource>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}

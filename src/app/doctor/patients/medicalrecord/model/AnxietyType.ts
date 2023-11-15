export class AnxietyType {
  id: number;
  anxietyType: string;

  constructor(partial?: Partial<AnxietyType>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}
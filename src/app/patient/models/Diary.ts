export class Diary{
    id?: number;
    title: string;
    user: number;
    entry?:string[];
  

    constructor(partial?:Partial<Diary>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}
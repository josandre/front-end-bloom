export class Diary{
    id?: number;
    date:Date;
    title: string;
    readable:boolean;
    entry?:string[];
  

    constructor(partial?:Partial<Diary>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}
import { User } from "@core";

export class Diary{
    id?: number;
    title: string;
    user: User;
  

    constructor(partial?:Partial<Diary>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}
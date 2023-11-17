import { Tags } from "./Tags";

export class Entry{
    id?: number;
    date:Date;
    text: string;
    readable:boolean;
    tags?:Tags[];
    diary?: number ;

    constructor(partial?:Partial<Entry>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}
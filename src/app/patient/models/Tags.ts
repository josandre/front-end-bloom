export class Tags{
    id?: number;
    text: string;
    

    constructor(partial?:Partial<Tags>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}
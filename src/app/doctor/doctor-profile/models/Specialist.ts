import {User} from "./User";


export class Specialist{
    id: number;
    college:String;
    speciality:String;
    location:String;
    medicalId:String;
    user?:User;

    constructor(partial?:Partial<Specialist>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}

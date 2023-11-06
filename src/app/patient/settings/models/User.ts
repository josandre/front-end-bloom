export class User{
    id: number;
    email: string;
    isActive: boolean;
    lastName: string;
    name: string;
    password: string;
    phone: string;
    userName: string;
    citizenId:number;
    address:string;
    

    constructor(partial?:Partial<User>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}

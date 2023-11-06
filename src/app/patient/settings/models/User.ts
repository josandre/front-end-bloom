export class User{
    id: number;
    canton: string;
    district: string;
    province : string;
    email: string;
    isActive: boolean;
    lastName: string;
    name: string;
    password: string;
    phone: string;
    userName: string;
    citizenId:number;
    

    constructor(partial?:Partial<User>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}

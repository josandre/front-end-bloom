export class Password{
    currentPassword: string;
    newPassword: string;
    

    constructor(partial?:Partial<Password>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}

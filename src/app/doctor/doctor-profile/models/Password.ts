export class Password{
    currentPassword: string;
    newPassword: string;
    confirmPassword?:string;

    constructor(partial?:Partial<Password>) {
        if(partial){
        Object.assign(this, partial);
        }
    }
}

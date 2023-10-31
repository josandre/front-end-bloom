export class Speciality{
  value: string;
  viewValue: string

  constructor(partial: Partial<Speciality>) {
    if(partial){
      Object.assign(this, partial);
    }
  }
}

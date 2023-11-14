export class MedicalRecipe {
  id: number;
  creationDate: Date;
  indications: string;
  name: string;

  constructor(partial?: Partial<MedicalRecipe>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}
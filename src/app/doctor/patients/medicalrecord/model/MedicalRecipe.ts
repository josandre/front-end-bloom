export class MedicalRecipe {
  id: number;
  indications: string;
  name: string;

  constructor(partial?: Partial<MedicalRecipe>) {
    if(partial){
      Object.assign(this, partial)
    }
  }
}

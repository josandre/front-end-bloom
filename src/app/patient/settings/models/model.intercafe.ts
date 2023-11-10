export interface ProvinciaI{
    id:number;
    nombre:string
}
export interface CantonI{
    id:number;
    provinciaId: number;
    nombre:string;

}
export interface DistritoI{
    id:number;
    cantonId: number;
    nombre:string;
    
}
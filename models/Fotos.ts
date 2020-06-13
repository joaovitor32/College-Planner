export class Foto{

    idFoto:number;
    idMateria:number;
    imageUri:string;

    constructor(idFoto:number,idMateria:number,imageUri:string){
        this.idFoto=idFoto,
        this.idMateria=idMateria,
        this.imageUri=imageUri
    }
}
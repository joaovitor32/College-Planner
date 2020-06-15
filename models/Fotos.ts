export class Foto{

    idFoto:number;
    idMateria:number;
    imageUri:string;
    created_at:Date

    constructor(idFoto:number,idMateria:number,imageUri:string,created_at:Date){
        this.idFoto=idFoto,
        this.idMateria=idMateria,
        this.imageUri=imageUri,
        this.created_at=created_at
    }
}
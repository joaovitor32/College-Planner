import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('reboot7.db');

export const initMaterias = () => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS materia (idMateria INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, periodo TEXT NOT NULL,description TEXT NOT NULL)`,
                [],
                () => {
                    resolve()
                },
                (_: any, err: any): any => {
                    console.log(err)
                    reject(err);
                }
            )
        })
    })
    return promise;
}
export const initFotos = () => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS fotos (idFoto INTEGER PRIMARY KEY NOT NULL, imageUri TEXT NOT NULL, created_at DATE ,idMateria INTEGER,FOREIGN KEY(idMateria) REFERENCES materia(idMateria))`,
                [],
                () => {
                    resolve()
                },
                (_: any, err: any): any => {
                    reject(err);
                }
            )
        })
    })
    return promise;
}


export const insertMateria = (title: string, periodo: string, description: string) => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `   
                    INSERT INTO materia(title,periodo,description) VALUES (?,?,?)
                `,
                [title, periodo, description],
                (_, result) => {
                    resolve(result)
                },
                (_, err): any => {
                    reject(err)
                },
            )
        })
    })
    return promise;
}

export const insertFoto = (idMateria: number, imageUri: string,data:string) => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `   
                    INSERT INTO fotos(imageUri,idMateria,created_at) VALUES (?,?,?)
                `,
                [imageUri, idMateria,data],
                (_, result) => {
                    resolve(result)
                },
                (_, err): any => {
                    reject(err)
                },
            )
        })
    })
    return promise;
}

export const deleteFotos = (id: number) => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM fotos WHERE idFoto=?'
                , [id],
                (_, result) => {
                    resolve(result)
                },
                (_, err): any => {
                    reject(err)
                })
        })
    })
}

export const materiaEdit = (id: number, title: string, periodo: string, description: string) => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `   
                    UPDATE materia SET title=?,description=?,periodo=? WHERE idMateria=?
                `,
                [title, description, periodo, id],
                (_, result) => {
                    resolve(result)
                },
                (_, err): any => {
                    reject(err)
                },
            )
        })
    })
    return promise;
}

export const listMaterias = () => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM materia`,
                [],
                (_: any, result: any) => {
                    resolve(result)
                },
                (_: any, err: any): any => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const listFotos = (idMateria: number) => {
    const promise = new Promise<any>((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM fotos WHERE idMateria=?`,
                [idMateria],
                (_: any, result: any) => {

                    resolve(result)
                },
                (_: any, err: any): any => {
                    reject(err)
                }
            )
        })
    })
    return promise
}





















import { Injectable } from '@angular/core';
import { getJSON, request } from '@nativescript/core/http';
import * as couchbaseModule   from "nativescript-couchbase";
const sqlite = require("nativescript-sqlite");

@Injectable()
export class NoticiasServices {
    api: string = "https://43cdcb225eec.ngrok.io";
    database: couchbaseModule.Couchbase; 
    

    constructor(){
        this.database = new couchbaseModule.Couchbase("test-database"); 

        this.getDB((db)=>{
            console.dir(db);
            db.each("select * from logs",
             (err, fila)=> console.log("fila: ",fila),
             (err, totales)=> console.log("filas totales ",totales));
        }, () =>     console.error("error en getDB"));

        this.database.createView("logs", "1", (document, emitter) =>
        emitter.emit(document._id, document));
         const rows = this.database.executeQuery("logs", {limit : 200});
         console.log("documentos: " + JSON.stringify(rows)); 
        
    }

    getDB(fnOk, fnError){
        return new sqlite("mi_db_logs", (err, db)=>{
            if (err) {
                console.error("error al abrir db", err);
            }else{
                console.log("esta abierta la db", db.isOpen() ? "Si": "No");
                db.execSQL("create table if not exits logs (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)")
                .then((id) =>{
                    console.log("CREATE TABLE OK");
                    fnOk(db);
                },(error)=>{
                    console.log("CREATE TABLE ERROR",error);
                    fnError(error);
                });
            }
        });  

    }
    private noticias: Array<string>=[];
   


    agregar(s: string){
       return request({
           url: this.api+"/favs",
           method: "POST",
           headers: {"Content-Type":"application/json"},
           content: JSON.stringify({ nuevo: s})
       });
    }
    

    favs(){
        return getJSON(this.api+"/favs");
    }

    buscar(s: string){
        
        this.getDB((db)=> {
            db.execSQL("insert into logs(texto) values(?)", [s],
            (err, id) => console.log("nuevo id:  ", id));
        }, ()=>console.error("error en getDB"));
        
        const documentId = this.database.createDocument({ texto: s });
        console.log("nuevo id couchbase: ", documentId); 
       
        return getJSON(this.api+"/get?q="+s);
    }
}

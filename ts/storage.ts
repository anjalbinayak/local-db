import {Database} from './db';

class BinStorage{
    databases : Array<Database>;
    KEY : string;


       constructor(){
        this.databases = this.getDatabases();
    }

     _stringify(obj){
        return JSON.stringify(obj);
    }

     _parse(string){
        return JSON.parse(string);
    }

     getDatabases() : []{
        let databases = localStorage.getItem("BIN_LOCAL_DB_V3");
        if(!databases){
            let databases = [];
            localStorage.setItem(this.KEY, this._stringify(databases));
            return [];
        }
        return this._parse(databases);        
    }

     getDatabase(dbName){
        return this.databases.filter(db => db._metaData.name == dbName)[0];

    }
    
     createDatabase = (dbName) =>{
        this.databases.push(new Database(dbName));
        return this;     
    }


     createTable = (tableName,dbName) => {
        let database = this.getDatabase(dbName);
        if(!database) console.error(`Database ${dbName} not found`);
        database.createTable(tableName);


        for (let i in this.databases){
            if(this.databases[i]._metaData.name == database._metaData.name){
                this.databases[i] = database;
            }
        }
    }


     flush(){
        localStorage.setItem(this.KEY,this._stringify(this.databases));
    }


    
}


export {BinStorage};



// add window storage event to refresh db dynamically
// databases [
//     database1{
//         _metaData , _tables[
//             table1{
//                 _metaData , _data : []
//             }
//         ]
//     }
// ]






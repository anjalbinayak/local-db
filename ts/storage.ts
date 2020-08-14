import {Database} from './db';

class BinStorage{
    databases : Array<Database>;
    KEY : string;
    activeDataBase: string;
    activeTable :string;


       constructor(){
        this.databases = this.getDatabases();
        this.KEY = "BIN_LOCAL_DB_V3";
        this.activeDataBase = null;
        this.activeTable = null;
    }

     _stringify(obj){
        return JSON.stringify(obj);
    }

     _parse(string){
        return JSON.parse(string);
    }

     getDatabases() : []{
        let databases = localStorage.getItem(this.KEY);
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

    databaseExists(dbName){
        return this.getDatabase(dbName) != null;
    }

    tableExists(tableName, dbName){
        if(!this.databaseExists(dbName)){
            throw new Error(`Database with name ${dbName} doesnot exists`);
        }

        let tables = this.getDatabase(dbName)._tables;
        let tableWithSameName = tables.filter(tbl => tbl.tableName == tableName);
        console.log(tableWithSameName);
        return tableWithSameName.length != 0;
    }

    useDb(dbName){
        if(!this.databaseExists(dbName)) throw new Error("Database doesnot exists");
        this.activeDataBase = dbName;
        return this;
    }


    useTable(tableName){
        if(!this.tableExists(tableName,this.activeDataBase)) throw new Error("Table doesnot exists");
        this.activeTable = tableName;
        return  this;
    }

    getById(Id){
        let allData = this.getAll();
        return allData.filter(row => {
            return row.id == Id;
        })[0];
    }

    getAll(){
        let database = this.getDatabase(this.activeDataBase);

        for (let i in database._tables){
            if(database._tables[i].tableName == this.activeTable){
                return database._tables[i].data;
            }
        }
    }


    createDatabaseIfDoesnotExists(dbName){
        if(this.databaseExists(dbName)) return;
        return this.createDatabase(dbName);
    }
    
     createDatabase = (dbName) =>{
        if(this.databaseExists(dbName)) {
            throw new Error(`Database with name ${dbName} already exist`);
        }
        this.databases.push(new Database(dbName));
        return this;     
    }


     createTable = (tableName,dbName = null) => {
         if(this.activeDataBase) dbName = this.activeDataBase;
         if(!this.activeDataBase && !dbName) throw new Error("Either Provide Db Name or use `useDb` function");
         if(!this.databaseExists(dbName)){
             throw new Error(`Database with name ${dbName} doesnotexists`);
         }
         if(this.tableExists(tableName,dbName)){
             throw new Error(`Table with name ${tableName} in database ${dbName} already exists`);
         }
        let database = this.getDatabase(dbName);
        database.createTable(tableName);

        for (let i in this.databases){
            if(this.databases[i]._metaData.name == database._metaData.name){
                this.databases[i] = database;
            }
        }
        return this;
    }

    getData(tableName , dbName){
        return {};
    }

    insertData(object,tableName){
        if(!this.activeDataBase) throw new Error("Use a database before inserting data");
        if(!this.tableExists(tableName,this.activeDataBase)){
            throw new Error(`Table with name ${tableName} doesnot exists`);
        }
        let database = this.getDatabase(this.activeDataBase);

        for (let i in database._tables){
            if(database._tables[i].tableName == tableName){
                database._tables[i].insert(object);
            }
        }


        for (let i in this.databases){
            if(this.databases[i]._metaData.name == database._metaData.name){
                this.databases[i] = database;
            }
        }

        return this;
        

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






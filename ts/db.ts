import {Table} from './table';

class Database{
   _metaData : {name};
   _tables : Array<Table>;

    constructor(dbName){
        this._metaData = {
            name : dbName
        };
        
        this._tables = [];
    }

    
    getName(){
        return this._metaData.name;
    }

    getTables(){
        return this._tables;
    }

    createTable(tableName){
        let table = new Table(tableName,this._metaData.name);
        this._tables.push(table);
    }



}

export {Database}




import {Id} from './id';
class Table{
    tableName: string;
    _metaData: {dbName};
    data: Array<Object>;

    constructor(tableName, dbName){
        this.tableName = tableName;
        

        this._metaData = {
            dbName
        };
        this.data = [];
        
    }



    getTableName(){
        return this.tableName;
    }
    
    getDatabaseName(){
        return this._metaData.dbName;
    }

    insert(object){
        object.id = Id();
        this.data.push(object);

    }

    getById(id){
        this.data.filter( row =>{
            return row.id == id;
        })[0];
    }

    



}


export  {Table};
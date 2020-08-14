
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
        this.data.push(object);

    }

    



}


export  {Table};
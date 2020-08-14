class Table{
    tableName: string;
    _metaData: {dbName};
    constructor(tableName, dbName){
        this.tableName = tableName;

        this._metaData = {
            dbName
        };
    }



    getTableName(){
        return this.tableName;
    }
    
    getDatabaseName(){
        return this._metaData.dbName;
    }



}


export  {Table};
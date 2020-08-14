import {BinStorage} from './storage';


let binStorageDb = new BinStorage();

console.log(binStorageDb);

binStorageDb.createTable('user','NewDb').flush();
binStorageDb.insertData({name:'anjal'}, 'user','NewDb').flush();
// binStorageDb.createTable('user','NewDb').flush();
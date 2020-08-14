import {BinStorage} from './storage';


let binStorageDb = new BinStorage();

console.log(binStorageDb);
binStorageDb.createDatabase('NewDb').flush();
binStorageDb.createTable('user','NewDb').flush();
binStorageDb.useDb('NewDb').insertData({name:'anjal is a god boy'}, 'user').flush();

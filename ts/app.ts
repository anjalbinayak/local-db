import {BinStorage} from './storage';


let binStorageDb = new BinStorage();

console.log(binStorageDb);
binStorageDb.createDatabase('NewDb').flush();
binStorageDb.useDb('NewDb');
binStorageDb.createTable('user').flush();
binStorageDb.useDb('NewDb').insertData({name:'anjal is a god boy'}, 'user').flush();

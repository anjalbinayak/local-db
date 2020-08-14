import {BinStorage} from './storage';


let binStorageDb = new BinStorage();

console.log(binStorageDb);

binStorageDb.createDatabase('NewDb').flush();
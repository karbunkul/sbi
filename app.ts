import SBI from "./lib/main";
import * as env2conf from 'env2conf';
import {type} from "os";

const conf = env2conf.load({});
const sbi = new SBI();

sbi.on('set', (obj) => {
    console.log(obj, 'on set box');
});

sbi.set({key: 'config', value: {
    NODE_ENV: conf.NODE_ENV || 'dev',
    TEST: conf.TEST || 'dev',
}});

sbi.set({key: 'number', value: '3'});
import SBI, {BoxBase} from './lib/main';
import * as env2conf from 'env2conf';

const conf = env2conf.load({});
const sbi = new SBI();

sbi.on('box_set', (obj) => {
    console.log((<BoxBase>obj).item(), 'on set box');
});

sbi.set({key: 'config', value: {
    NODE_ENV: conf.NODE_ENV || 'dev',
    TEST: conf.TEST || 'dev',
}});

sbi.set({key: 'number', value: '3'});
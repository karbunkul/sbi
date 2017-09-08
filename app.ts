import SBI from "./lib/main";
import * as env2conf from 'env2conf';

const conf = env2conf.load({});

const sbi = new SBI();

sbi.set({key: 'config', value: {
    NODE_ENV: conf.NODE_ENV || 'dev',
    TEST: conf.TEST || 'dev',
}});
const multi = sbi.set({key: 'models'})
    .add('schedule', 'scheduleSchema')
    .add('user', 'userSchema');

// console.log(multi.item('user'));
//
// console.log(sbi.boxes());
// console.log(sbi.keys());
//
// const config = sbi.get('config').item();
// console.log(SBI.newInstance().get(''));

console.log(SBI.newInstance().get('models').item('user'));

console.log(SBI.newInstance().get('config').item());
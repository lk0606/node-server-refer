import { client, getValue, getHValue, setValue } from './app/lib/redis'

getValue('alias').then(res=> {
    console.log('res :>> ', res);
})

const testObj = {
    name: 'test name',
    age: 24,
}
setValue('obj', testObj)
getHValue('obj').then(res=> {
    console.log('getHValue res :>> ', res);
})

// client.hmset("key", "foo", "bar", "foo1", "bar1", function(err, res) {
//     console.log('hmset err, res :>> ', err, res);
// });

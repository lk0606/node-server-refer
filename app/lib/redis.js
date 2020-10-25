import redis from 'redis'
import redisConfig from '../config/redis'
import { promisify } from 'util'

const client = redis.createClient(redisConfig)

client.on('connect', () => {
    console.log('redis connect success! ')
})

client.on('error', (err) => {
    console.log('redis error :>> ', err)
})

const getValue = (key) => {
    const getAsync = promisify(client.get).bind(client)
    return getAsync(key)
}
const getHValue = (key) => {
    const getAsync = promisify(client.hgetall).bind(client)
    return getAsync(key)
}

/**
 *
 * @param {*} key
 * @param {*} value
 * @param {number} timestamp 缓存时间 单位 s
 */
const setValue = (key, value, timestamp) => {
    if([undefined, null, '', NaN].includes(value)) {
        return
    }
    if(typeof value === 'object') {
        Object.keys(value).forEach(item=> {
            client.hset(key, item, value[item], redis.print)
        })
    } else if (typeof value === 'string') {
        if (timestamp && typeof timestamp === 'number') {
            client.set(key, value, 'EX', timestamp)
        } else {
            client.set(key, value)
        }
    }
}

export {
    client,
    getValue,
    getHValue,
    setValue,
}

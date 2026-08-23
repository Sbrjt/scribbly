import { redis } from '@/utils/redis'
import { Schema } from 'redis-om'

const schema = new Schema('refresh', {
	userId: { type: 'string' },
})

const refreshTokenRepo = redis.fetchRepository(schema)
// await refreshTokenRepo.createIndex() // ????
export default refreshTokenRepo

import { redis } from '@/utils/redis'
import { Schema } from 'redis-om'

const schema = new Schema('post', {
	title: { type: 'string' },
	content: { type: 'string' },
	authorName: {
		type: 'string',
		path: '$.author.name',
	},

	authorId: {
		type: 'string',
		path: '$.author.id',
	},

	createdAt: { type: 'date' },
	updatedAt: { type: 'date' },
})

const postCacheRepo = redis.fetchRepository(schema)
export default postCacheRepo

// Note: redis-om doesn't provide type inference!!

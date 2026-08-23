import { toJsonPlugin } from '@app/common/src/mongoose'
import mongoose from 'mongoose'
import castAggregation from 'mongoose-cast-aggregation'
import { config } from './config'

const { MONGO_HOST, POST_DB_NAME, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD } =
	config

const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}`

mongoose.plugin(toJsonPlugin)
mongoose.plugin(castAggregation)

export const connectToDatabase = async () => {
	await mongoose.connect(MONGO_URI, {
		dbName: POST_DB_NAME,
		user: MONGO_USERNAME,
		pass: MONGO_PASSWORD,
	})

	console.log(`Connected to MongoDB (${POST_DB_NAME})`)
}

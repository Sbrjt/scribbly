import { model, Schema, type InferSchemaType } from 'mongoose'

const schema = new Schema({
	postId: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	emoji: {
		type: String,
		required: true,
	},
})

// A user can use each emoji only once on a post
schema.index({ postId: 1, userId: 1, emoji: 1 }, { unique: true })

export type Reaction = InferSchemaType<typeof schema>
export default model<Reaction>('Reaction', schema)

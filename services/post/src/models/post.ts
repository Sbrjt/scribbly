import { model, Schema, type InferSchemaType } from 'mongoose'
// import autopopulate from 'mongoose-autopopulate'

const schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			ref: 'Author',
			required: true,
			autopopulate: true,
		},
	},
	{ timestamps: true },
)

// schema.plugin(autopopulate)
export type Post = InferSchemaType<typeof schema>
export default model<Post>('Post', schema)

// Slug generation — generate URL-friendly slugs.

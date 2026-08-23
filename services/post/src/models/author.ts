import { model, Schema, type InferSchemaType } from "mongoose";

const schema = new Schema({
  _id: {
    // type: Schema.Types.UUID,
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: String,
});

export type Author = InferSchemaType<typeof schema>;
export default model<Author>("Author", schema);

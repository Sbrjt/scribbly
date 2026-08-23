import type { Schema } from "mongoose";

export function toJsonPlugin(schema: Schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,

    transform: (_, ret) => {
      ret.id = (ret._id as any).toString();
      delete ret._id;
      return ret;
    },
  });
}

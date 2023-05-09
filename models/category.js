import { Schema, model } from "mongoose"

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name is a must"],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
})

export default model("Category", CategorySchema)

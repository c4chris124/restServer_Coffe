import { Schema, model } from "mongoose"

const ProductSchema = Schema({
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
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  img: {
    type: String
  }
})

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject()
  return data
}

export default model("Product", ProductSchema)

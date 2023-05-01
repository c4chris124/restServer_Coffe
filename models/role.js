import { Schema, model } from "mongoose"

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role is a must"]
  }
})

export default model("Role", RoleSchema)

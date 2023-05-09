import Role from "../models/role.js"
import { User, Category } from "../models/index.js"

// User validations
const isRoleValid = async (role = "") => {
  const roleTrue = await Role.findOne({ role })
  if (!roleTrue) {
    throw new Error(`The role ${role} does not exist`)
  }
}

const emailExist = async (email = "") => {
  const emailVal = await User.findOne({ email })
  if (emailVal) {
    throw new Error(`The email: ${email} already exist`)
  }
}

const userByIdExist = async (id) => {
  const userExist = await User.findById(id)
  if (!userExist) {
    throw new Error(`The ID ${id} does not exist`)
  }
}

// Categories validations
const categoryExistById = async (id) => {
  const categoryExist = await Category.findById(id)
  if (!categoryExist) {
    throw new Error(`The ID ${id} does not exist`)
  }
}

export { isRoleValid, emailExist, userByIdExist, categoryExistById }

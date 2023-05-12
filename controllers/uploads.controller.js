import { response, request } from "express"
import { uploadFile } from "../helpers/index.js"
import { User, Product } from "../models/index.js"

const loadFiles = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: "No files on the request"
    })
    return
  }

  try {
    // using try catch as rejects are blowing up the server
    // managed error in correct way
    // images
    // const ext = ["txt", "md"]
    // const fileName = await uploadFile(req.files, ext, "txt")
    const fileName = await uploadFile(req.files, undefined, "imgs")

    res.json({
      fileName
    })
  } catch (msg) {
    res.status(400).json({ msg })
  }
}

const updateImgs = async (req = request, res = response) => {
  const { id, collection } = req.params

  let model

  switch (collection) {
    case "users":
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `User with ${id} does not exist`
        })
      }
      break

    case "products":
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `Product with ${id} does not exist`
        })
      }
      break

    default:
      return res.status(500).json({ msg: "forgot to validate this one" })
  }

  const fileName = await uploadFile(req.files, undefined, collection)
  model.img = fileName

  await model.save()
  // console.log(model.save())

  res.json(model)
}

export { loadFiles, updateImgs }

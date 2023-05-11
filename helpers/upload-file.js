import { fileURLToPath } from "url"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const uploadFile = (
  files,
  validExtensions = ["png", "JPG", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files
    const cutName = file.name.split(".")
    const extension = cutName[cutName.length - 1]

    // validate extension
    if (!validExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} is not allowed in ${validExtensions}`
      )
    }

    const tempFileName = `${uuidv4()}.${extension}`
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const uploadPath = path.join(__dirname, "../uploads/", folder, tempFileName)

    file.mv(uploadPath, function (err) {
      if (err) {
        reject(err)
      }

      resolve(tempFileName)
    })
  })
}

export default uploadFile

import { response, request } from "express"

const loadFiles = (req = request, res = response) => {
  res.json({
    mgs: "Load files route"
  })
}

export { loadFiles }

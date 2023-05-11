import express from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import {
  userRoute,
  authRoute,
  searchRoute,
  categoriesRoute,
  productsRoute,
  uploadsRoute
} from "../routes/index.routes.js"
import dbConnection from "../db/config.js"

export default class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: "/api/auth",
      search: "/api/search",
      categories: "/api/categories",
      products: "/api/products",
      user: "/api/users",
      uploads: "/api/uploads"
    }

    // connect db
    this.connectDB()
    // Middleware
    this.middleware()
    // App routes
    this.routes()
  }

  async connectDB() {
    await dbConnection()
  }

  middleware() {
    // CORS
    this.app.use(cors())
    // Read and parse body
    this.app.use(express.json())
    // Public dir
    this.app.use(express.static("public"))
    // File uploads
    // Note that this option available for versions 1.0.0 and newer.
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true
      })
    )
  }

  routes() {
    this.app.use(this.paths.auth, authRoute)
    this.app.use(this.paths.search, searchRoute)
    this.app.use(this.paths.categories, categoriesRoute)
    this.app.use(this.paths.products, productsRoute)
    this.app.use(this.paths.user, userRoute)
    this.app.use(this.paths.uploads, uploadsRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`)
    })
  }
}

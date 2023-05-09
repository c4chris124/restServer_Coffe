import express from "express"
import cors from "cors"
import {
  userRoute,
  authRoute,
  categoriesRoute,
  productsRoute
} from "../routes/index.routes.js"
import dbConnection from "../db/config.js"

export default class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      user: "/api/users"
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
  }

  routes() {
    this.app.use(this.paths.auth, authRoute)
    this.app.use(this.paths.categories, categoriesRoute)
    this.app.use(this.paths.products, productsRoute)
    this.app.use(this.paths.user, userRoute)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`)
    })
  }
}

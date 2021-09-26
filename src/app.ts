import express from 'express'
import mongoose from 'mongoose'
import defaultRoutes from './routes/defaultRoute'
import loggedRoutes from './routes/loggedRoute'
import layouts from 'express-ejs-layouts'
import cookie from 'cookie-parser'
import session from 'express-session'

//Todos os métodos são privados
class App {

    public constructor() {
        this.express = express()
        this.middlewares()
        this.database()
        this.layout()
        this.session()

        this.routes()
    }

    public express: express.Application

    private middlewares (): void {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true}))
        this.express.use(express.static(__dirname+"\\public"))
    }

    private database (): void {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb+srv://evelyn_mota:evelyn_mota@cluster0.bor2v.mongodb.net/SoulBanco?retryWrites=true&w=majority")
    }

    private layout (): void {
        this.express.use(layouts);
        this.express.set("views", __dirname+"\\views")
        this.express.set("layout", "./layouts/main");
        this.express.set("view engine", "ejs");
    }

    private session (): void {
        this.express.use(cookie());
        this.express.use(session({
            secret: 'SoulBanco',
            resave: true,
            saveUninitialized: true
        }))
    }

    private routes (): void {
       this.express.use('/', defaultRoutes)
       this.express.use('/user', loggedRoutes)
    }
}

export default new App().express

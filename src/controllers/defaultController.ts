import { Request, Response } from 'express'
import usuarios from '../models/usuarios'
import Usuario from '../models/objetoUsuario'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import storage from '../helpers/storage'

//ROTA DO HOME

class defaultControl {

    public homeGet (req: Request, res: Response){
        res.render('pages/index')
    }

    public async listaGet (req: Request, res: Response): Promise<Response> {
        const lista = await usuarios.find()
        return res.json(lista)
    }
    
    public criarContaGet (req: any, res: any) {
        return res.render("pages/criarConta")
    }

    public criarContaPost (req: Request, res: Response): void{
        let usuario = new Usuario(req.body.nome, req.body.cpf, "A" + req.body.agencia +"C"+ req.body.conta, req.body.senha, req.body.saldo);

        usuario.cadastro(req, res)
    }

    public loginGet (req: Request, res: Response): void {
        res.render('pages/login')
    }
    
    public async loginPost (req: Request, res: Response): Promise<Response> {
        let cpf = req.body.cpf
        let senha = req.body.senha
        let user = await usuarios.findOne({cpf: cpf})
        storage.removeItem('token')
        storage.removeItem('userId')
        if(!user){
            return res.send("Usuário não encontrado")
        }

        console.log(user.senha)
        
        if(senha != user.senha){
            return res.send("Senha inválida")
        }
        
        
        const token = jwt.sign({ id: user._id}, {
            "secret": "832374c92d8272d8c100bf63118bc3ac"
        }.secret, {
            expiresIn: 7200
        })

        storage.setItem('token', token)

        res.redirect('/user')
    }
}

export default new defaultControl()
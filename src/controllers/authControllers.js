import usuarioSchema from "../models/usuarioSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config()

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        
        usuarioSchema.findOne({email: req.body.email }, (error, usuario) => {
            
            if (!usuario) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Usuário não encontrado.",
                    data: {
                        email: req.body.email
                    }
                })
            }
            
            const validarPassword = bcrypt.compareSync(
                req.body.password,
                usuario.password
            );

            if (!validarPassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Não autorizado"
                })
            }

            const token = jwt.sign({name: usuario.name }, SECRET);

            res.status(200).json({
                statusCode: 200,
                message: "Login realizado com sucesso!",
                data: {
                    token
                }
            })
        })

    } catch (error) {
        console.error(err);
        res.status(500).json({
            statusCode: 500,
            message: err.message,
        });
    }
}

const verificarToken = (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Acesso negado!"
        })
    }

    try {

        jwt.verify(token, SECRET);
        next();

        
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Token não valido.",
          });
    }
}


export default {
    login,
    verificarToken
}
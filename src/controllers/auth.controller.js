import { createHash } from "crypto";

import httpStatus from "../utils/constants.js";
import authService from "../services/auth.service.js";

const login = async (req, res) => {
    const { email, senha, prestador: ehPrestador } = req.body;
    
    if(!email || !senha || ehPrestador == null) return res.status(httpStatus.BAD_REQUEST).send('Falta de paramêtros na requisição');
    
    const senhaMD5 = createHash('md5').update(senha).digest('hex');
    try {
        const response = await authService.realizarLogin(email,senhaMD5, ehPrestador);
        res.status(httpStatus.SUCCESS).send({token: response});
    } catch (error) {
        res.status(httpStatus.INTERNAL_ERROR).send(error.message);
    }
}

export default { login };

import testService from '../services/teste.service.js'
import queries from "../queries/auth.queries.js"

const exemploGet = async (req, res) => {
    const data = await queries.testeRailway();
    return res.send(data).status(200);
}

export default {
    exemploGet
}
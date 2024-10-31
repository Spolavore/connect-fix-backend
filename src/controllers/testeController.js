import testService from '../services/teste.service.js'

const exemploGet = (req, res) => {
    const data = 'leonardo' + '-' + testService.exemploService()
    return res.send(data).status(200);
}

export default {
    exemploGet
}
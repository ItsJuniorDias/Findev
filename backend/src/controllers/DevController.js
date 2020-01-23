const axios = require('axios');
const Dev = require('../models/Dev');
const parseAsStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../webSocket');
const {  updateDevData, findDevToDelete, deleteDev} = require('../services/devService');


module.exports = {

  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response){
    console.log(request.body);
    const { github_username, techs, latitude, longitude }  = request.body;

    let dev = await Dev.findOne({ github_username});

    if(!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      //continuar
      let { name = login, avatar_url, bio} = apiResponse.data;
   
      const techsArray = parseAsStringAsArray(techs);
   
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
   
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      }); 

      //Filtrar as conexões, max 10km
       
      const sendSocketMessageTo = findConnections(
       {latitude, longitude},
       techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev); 
  },
   
  async update(req, res) {
    //nome avatar bio localização tecnologias
    const { id } = req.params;
    const { name, longitude, latitude, techs, bio } = req.body;

    const techsArray = parseStringAsArray(techs);
    const location = pinPointLocation(longitude, latitude);
    const dev = await updateDevData(id, name, bio, techsArray, location);

    return res.json(dev);
  },

  async destroy(req, res) {
    const { id } = req.params;
    const devExists = await findDevToDelete(id)
    const result = devExists ? { message: `O usuário ${devExists.name} foi removido com sucesso!` } : { message: 'Usuário não encontrado!' }

    if (devExists) {
      await deleteDev(id)
    }

    return res.json(result)
  }
};
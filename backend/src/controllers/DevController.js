const axios = require('axios');
const Dev = require('../models/Dev');
const parseAsStringAsArray = require('../utils/parseStringAsArray');

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

    }
  
  
    return response.json(dev); 
  }
};
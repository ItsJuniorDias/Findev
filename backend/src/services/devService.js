const github = require('../config/github');
const Dev = require('../models/Dev');

module.exports = {


  async updateDevData(id, name, bio, techs, location) {
    //nome avatar bio localização tecnologias
    const techsLowerCase = techs.map(tech => tech.toLowerCase())
    const dev = await Dev.findByIdAndUpdate(id, {
      name,
      bio,
      techs: techsLowerCase,
      location
    });

    return dev;
  },

  async findDevToDelete(id) {
    const dev = Dev.findById(id);
    return dev
  },

  async deleteDev(id) {
    await Dev.findByIdAndDelete(id)
  },
}
const { raw } = require('express');
const { dbConnection } = require('./../databaseConfig');
const { CategoryModel, ChannelModel } = require('./../model');


const Category = dbConnection().define("category",
    CategoryModel
)

const Channel = dbConnection().define("channel",
    ChannelModel
)

module.exports.getAllCategory = function () {
    return Category.findAll({ raw: true });

};
module.exports.getAllChannel = function () {
    return Channel.findAll({ raw: true });
};

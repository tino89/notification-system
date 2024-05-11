const { DataTypes } = require('sequelize');


const User = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}

const Category = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}


const Channel = {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}


const NotificationModel = {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    categoryName: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    channelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    channelName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}


module.exports.NotificationModel = NotificationModel;
module.exports.UserModel = User;
module.exports.CategoryModel = Category;
module.exports.ChannelModel = Channel;



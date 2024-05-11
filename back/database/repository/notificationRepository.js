const { dbConnection } = require('../databaseConfig');

const { NotificationModel, UserCategoryModel, UserChannelModel, UserModel } = require('../model');

const Notification = dbConnection().define("notification",
    NotificationModel
)

const User = dbConnection().define("user",
    UserModel
)

function saveNotification(notif) {
    Notification.create(notif);
}


const UserCategory = dbConnection().define("userCategory",
    UserCategoryModel
)

function getUserIdSubscriptedToCategory(categoryId) {
    return UserCategory.findAll({ attributes: ['userId'], where: { categoryId: categoryId }, raw: true });
}


const UserChannel = dbConnection().define("UserChannel",
    UserChannelModel
)

function getChannelByUser(UserId) {
    return UserChannel.findAll({ attributes: ['channelId'], where: { userId: UserId }, raw: true });
}


function getAllNotification(UseId) {
    Notification.belongsTo(User);
    return Notification.findAll({ raw: true, include: [User],  order: [
        ['createdAt', 'DESC'],
    ], });
}


module.exports.save = saveNotification;
module.exports.getAll = getAllNotification;

module.exports.getUserIdSubscriptedToCategory = getUserIdSubscriptedToCategory;
module.exports.getChannelByUser = getChannelByUser;

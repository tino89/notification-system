const { Sequelize } = require('sequelize');
const { UserModel, CategoryModel, ChannelModel, NotificationModel } = require("./model");

var sequelize = null;


function dbConnection() {

    if (sequelize == null) {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './database/system-notification-db.sqlite'
        });
        return sequelize;
    }

    return sequelize;
}


async function initDataBase() {
    dbConnection();


    let Category = sequelize.define("category", CategoryModel)
    await Category.sync({ force: true });
    Category.create({"name": "Sports"});
    Category.create({"name": "Finance"});
    Category.create({"name": "Movies"});



    let Channel = sequelize.define('channel', ChannelModel);
    await Channel.sync({ force: true });
    Channel.create({"name": "SMS"});
    Channel.create({"name": "E-Mail"});
    Channel.create({"name": "Push Notification"});
    

    let User = sequelize.define("user", UserModel)
    await User.sync({ force: true });
    User.create({"name": "Liam", "email": "Liam@test.com", "phoneNumber": "9856342"})
    User.create({"name": "Noah", "email": "Noah@test.com", "phoneNumber": "4563213"})
    User.create({"name": "Oliver", "email": "Oliver@test.com", "phoneNumber": "9865437"})
    User.create({"name": "Joseph", "email": "Joseph@test.com", "phoneNumber": "8963431"})

    let UserChannel = sequelize.define('UserChannel', {});

    User.belongsToMany(Channel, { through: UserChannel });
    Channel.belongsToMany(User, { through: UserChannel });

    await UserChannel.sync({ force: true });

    UserChannel.create({"userId":1, "channelId":1})
    UserChannel.create({"userId":1, "channelId":2})
    UserChannel.create({"userId":1, "channelId":3})
    UserChannel.create({"userId":2, "channelId":1})
    UserChannel.create({"userId":3, "channelId":2})
    UserChannel.create({"userId":4, "channelId":3})


    let UserCategory = sequelize.define('UserCategory', {});
    User.belongsToMany(Category, { through: UserCategory });
    Category.belongsToMany(User, { through: UserCategory });

    await UserCategory.sync({ force: true });

    UserCategory.create({"userId":1, "categoryId":1})
    UserCategory.create({"userId":1, "categoryId":2})
    UserCategory.create({"userId":2, "categoryId":2})
    UserCategory.create({"userId":2, "categoryId":3})
    UserCategory.create({"userId":3, "categoryId":2})
    UserCategory.create({"userId":4, "categoryId":3})


    let Notification = sequelize.define('Notification', NotificationModel);
    User.hasMany(Notification);
    Notification.belongsTo(User);
    await Notification.sync({ force: true });

}





module.exports = initDataBase;
module.exports.dbConnection = dbConnection;
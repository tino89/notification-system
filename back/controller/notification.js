const express = require('express');
const { checkSchema, validationResult } = require('express-validator')
const router = express.Router();
const notification = require("../database/repository/notificationRepository");
const catalogue = require("../database/repository/catalogueRepository");

/* DTO that the client uses as request 
*/
let requestNotification = {
    "message": { notEmpty: true },
    "category": { notEmpty: true }
}

/*
helps to parse the answer a uniforme way  in case the client send incorrect data
 */
function parseResponseBadRequest(errors) {
    let responseError = [];
    errors.map(error => { responseError.push({ "message": error.msg, "field": error.path }) })
    return responseError;
}

/*
receive the request from the client
look for the category all user subscription
look for all channels where the users are subscripted
insert the notification with the info, user, channel, category and message 
 */
router.post('/v1/notification', checkSchema(requestNotification), async (req, res, next) => {

    try {
        const result = validationResult(req);

        if (result.errors.length > 0) {
            res.status(400);
            res.send(parseResponseBadRequest(result.errors));
            return;
        }

        let categoryMap = {};
        for (let category of await catalogue.getAllCategory()) {
            categoryMap[category.id] = category.name;
        }

        let channelMap = {};
        for (let channel of await catalogue.getAllChannel()) {
            channelMap[channel.id] = channel.name;
        }


        let notificationList = [];

        let userIdList = await notification.getUserIdSubscriptedToCategory(req.body.category);
        for (let user of userIdList) {
            console.log(user);
            let listChanmel = await notification.getChannelByUser(user.userId)
            for (let channel of listChanmel) {
                notificationList.push({ "categoryId": req.body.category, "userId": user.userId, "channelId": channel.channelId, "categoryName": categoryMap[req.body.category], "channelName": channelMap[channel.channelId], "message": req.body.message });
            }
        }
        notificationList.forEach(item => notification.save(item));
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

/*
get the list of all notitification were sent
*/
router.get('/v1/notification', async (req, res, next) => {
    try {
        let listNotification = await notification.getAll();
        res.status(200);
        res.send(listNotification);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;
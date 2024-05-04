require('dotenv').config()

const { getMessageHistory } = require("./utils/getMessageHistory.js");
const { getAuthToken } = require("./utils/generateToken.js");
const { getMessageDetails } = require('./utils/getMessageDetails.js');

(async () => {
    const getTokenStatus = await getAuthToken();
    if (!getTokenStatus) return

    // retrieve message history from pub/sub webhook
    let historyId = "124626";
    const messageHitoryData = await getMessageHistory(historyId);
    console.log(messageHitoryData)

    let messageId = null;
    // Check if data object exists and has a history array and a message object
    if (messageHitoryData?.history?.[0]?.messages?.[0]) {
        // Get the ID of the first message
        messageId = messageHitoryData.history[0].messages[0].id;
        console.log("Message ID:", messageId);
    } else {
        console.log("No message ID found.");
        return
    }

    const messageDetails = await getMessageDetails(messageId);
    console.log(messageDetails)
    return
})()
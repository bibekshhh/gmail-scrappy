const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { google } = require('googleapis');
const { extractEmailDetails } = require('../helper/formatEmailResponse');

const TOKEN_PATH = path.join(process.cwd(), "data", 'token.json');

// Load the credentials from the token.json file
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

// Function to log the data object to the console
function logCompleteJsonObject(jsonObject) {
    const email = JSON.parse(JSON.stringify(jsonObject), null, 4);
    const emailDetails = extractEmailDetails(email);
    console.log(emailDetails);
}

// Call the API to get message
async function getMessage(auth, messageId) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.get({
        userId: 'me',
        id: messageId
    })
    logCompleteJsonObject(res.data);
}

// export the script
async function getMessageDetails(messageId) {
    let cred = await loadSavedCredentialsIfExist();
    return await getMessage(cred, messageId);
}

module.exports = {
    getMessageDetails
}
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { google } = require('googleapis');

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
    console.log(JSON.stringify(jsonObject, null, 4));
}

// Get history details based on history ID
async function getHistory(auth, historyId) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.history.list({
        userId: 'me',
        startHistoryId: historyId
    })
    // The main part of the response comes
    // in the "data" attribute.
    logCompleteJsonObject(res.data);
}

async function getMessageHistory(historyId) {
    if (!historyId) {
        console.error("No histroy id provided.")
    }
    let cred = await loadSavedCredentialsIfExist();
    return await getHistory(cred, historyId);
}

// export the script
module.exports = {
    getMessageHistory
} 
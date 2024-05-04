# Gmail-Scrappy
Gmail-Scrappy is a Node.js application that utilizes the Gmail API to monitor emails. It allows users to automate email monitoring tasks and be able to perform actions based on specified criteria, enhancing productivity in managing email communications.

## Local Setup

### 1. Clone the repository
```
git clone https://github.com/bibekshhh/gmail-scrappy.git
```

### 2. Navigate to the Directory
```
cd gmail-scrappy
```

### 3. Install Required NPM Packages
```
npm install
```

## Google Cloud Platform (GCP) Setup

### 1. Set up a New Project on GCP

Follow the instructions in the below link to create a new project on Google Cloud Platform
```
https://livefiredev.com/step-by-step-gmail-api-webhook-to-monitor-emails-node-js/
```

### 2. Add Your Credentials
Place your credentials in `credentials.json` and `.env` files.

### 3. Configure Google Pub/Sub
- Attach a listener webhook on the Google Pub/Sub.
- Listen to the latest `historyId` of the Gmail event on the webhook.

#### Alternatively, Start Pub/Sub to Reset the Starting Point:
```
node startPubSub.js
```

#### 4. Update latest historyId
Replace the `historyId` variable in `index.js` (line 12) with your latest `historyId`.
```
let historyId = "<your latest historyId>";
```

PS: You could automate this part by setting up a webhook, and dynamically starting the bot when an event is received.

## Running the Bot
Execute the following command to run the `index.js` file:

```
node index.js
```

This setup should help you effectively monitor emails using Gmail API with this bot.
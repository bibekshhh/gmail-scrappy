function extractEmailDetails(email) {
    const details = {};

    const findHeader = (name) => {
        const header = email.payload.headers.find(header => header.name === name);
        return header ? header.value : null;
    };

    const findPart = (mimeType) => {
        const part = email.payload.parts.find(part => part.mimeType === mimeType);
        return part && part.body && part.body.data ? Buffer.from(part.body.data, 'base64').toString('utf-8') : null;
    };

    details.sender = findHeader('From');
    details.receiver = findHeader('To') ? findHeader('To').split('"').pop() : null;
    details.sentDate = findHeader('Date') ? new Date(findHeader('Date')).toLocaleString() : null;
    details.messageBody = findPart('text/plain') ? findPart('text/plain').replace(/[\r\n]/g, '') : null;

    return details;
}

module.exports = { extractEmailDetails }

// // Usage
// const email = JSON.parse('YOUR_EMAIL_OBJECT_HERE');
// const emailDetails = extractEmailDetails(email);
// console.log(emailDetails);

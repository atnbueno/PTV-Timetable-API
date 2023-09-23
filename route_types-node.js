const crypto = require('crypto');
const https = require('https');

function getURL(endpoint) {
    const devId = 3054321; // replace this with your User Id
    const apiKey = '2b7df1de-3d95-2507-0abd-045b563799dd'; // replace this with your API Key

    let pathname = `${endpoint}${endpoint.includes('?') ? '&' : '?'}devid=${devId}`;
    const signature = crypto.createHmac('sha1', apiKey).update(pathname).digest('hex');

    return `https://timetableapi.ptv.vic.gov.au${pathname}&signature=${signature}`;
}

const url = getURL('/v3/route_types');

console.error("URL:", url);

https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        if (response.statusCode === 200) {
            console.error("RESPONSE:");
            console.log(JSON.stringify(JSON.parse(data), null, 4));
        } else {
            console.error("ERROR: Failed to retrieve data from the URL");
        }
    });
}).on('error', (error) => {
    console.error("ERROR:", error.message);
});

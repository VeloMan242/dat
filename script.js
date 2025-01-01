let database = {};
function handleRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const uniqueID = urlParams.get('id');
    const data = urlParams.get('data');

    if (!action || !uniqueID) {
        displayResponse({ error: "Invalid request. Action and ID are required." });
        return;
    }

    if (action === "send") {
        if (!data) {
            displayResponse({ error: "Data is required for the send action." });
            return;
        }
        database[uniqueID] = JSON.parse(data);
        displayResponse({ success: true, message: `Data stored for ID: ${uniqueID}` });
    } else if (action === "get") {
        const storedData = database[uniqueID];
        if (storedData) {
            displayResponse({ success: true, data: storedData });
        } else {
            displayResponse({ error: `No data found for ID: ${uniqueID}` });
        }
    } else {
        displayResponse({ error: "Invalid action. Use 'send' or 'get'." });
    }
}
function displayResponse(response) {
    console.log(response);
    document.body.innerHTML += `<pre>${JSON.stringify(response, null, 2)}</pre>`;
}
window.onload = handleRequest;

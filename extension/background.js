//background.js
chrome.storage.sync.get(['enabled'], function(result) {
    const isEnabled = result.enabled !== undefined ? result.enabled : true;
    toggleBackgroundScript(isEnabled);
});


// chrome.webRequest.onBeforeRequest.addListener(
//     function(details) {
//         if (details.url.startsWith("http://127.0.0.1") || details.url.startsWith("https://127.0.0.1")) {
//             return;
//         }
        
//         chrome.storage.sync.get(['enabled'], function(result) {
//             if (result.enabled !== undefined && result.enabled) {
//                 const url =details.url
//                 console.log("Main URL before request:", url);
//                 //sendUrlToServer(mainUrl);
//             }
//         });
//     },
//     {urls: ["<all_urls>"]},
//     ["blocking"]
// );
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(['enabled'], function(result) {
        if (result.enabled !== undefined && result.enabled) {
            if (changeInfo.status === 'complete' && (changeInfo.url || tab.url)) {
                const extractedUrl = changeInfo.url || tab.url;
                sendUrlToServer(extractedUrl);
            }
        }
    });
});

function toggleBackgroundScript(isEnabled) {
    chrome.storage.sync.set({ 'enabled': isEnabled });
    if (isEnabled) {

    } else {
       
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggle) {
        chrome.storage.sync.get(['enabled'], function(result) {
            const isEnabled = result.enabled !== undefined ? !result.enabled : true;
            toggleBackgroundScript(isEnabled);
            sendResponse({ enabled: isEnabled });
        });
    }
    return true;
});



function sendUrlToServer(url) {
    fetch("http://127.0.0.1:5000/?api=" + url)
        .then(response => response.json())
        .then(data => {
            console.log(data.result);
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { result: data.result });
            });
        });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.result) {
        if (request.result == 1) {
            blockUrl();
            return true; 
        }    
    }
});

function blockUrl() {
    // Create a full-screen overlay div for the warning message
    var overlayDiv = document.createElement('div');
    overlayDiv.textContent = "Warning: Malicious URL detected!";
    
    // Apply styles to the overlay
    overlayDiv.style.position = 'fixed';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.width = '100%';
    overlayDiv.style.height = '100%';
    overlayDiv.style.backgroundColor = 'red'; // Semi-transparent red background
    overlayDiv.style.color = 'white';
    overlayDiv.style.fontFamily = 'Arial, sans-serif';
    overlayDiv.style.fontSize = '24px';
    overlayDiv.style.display = 'flex';
    overlayDiv.style.justifyContent = 'center';
    overlayDiv.style.alignItems = 'center';
    overlayDiv.style.zIndex = '9999'; // Ensure it's on top of other elements
    
    // Append the overlay to the document body
    document.body.appendChild(overlayDiv);
}

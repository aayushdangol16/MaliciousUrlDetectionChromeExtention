//popup.js
document.addEventListener('DOMContentLoaded', function() {
  // Set the initial state of the button based on storage
  chrome.storage.sync.get(['enabled'], function(result) {
      const isEnabled = result.enabled !== undefined ? result.enabled : true;
      document.getElementById('toggle').checked = isEnabled
  });

  // Toggle button click handler
  document.getElementById('toggle').addEventListener('click', function() {
      chrome.runtime.sendMessage({ toggle: true }, function(response) {
          document.getElementById('toggle').checked = response.enabled
      });
  });
});

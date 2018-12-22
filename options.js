window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

// Saves options to browser.storage
function save_options() {
    var teamName = document.getElementById('teamName').value;
    browser.storage.sync.set({
      teamName: teamName
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = ' ';
      }, 750);
    });
  }
  browser.storage.sync.get({
    rank: 100,
    solved: "0(0)"
  }, function(items) {
    document.getElementById('rank').innerText = "Rank " + items.rank + "\nSolved " + items.solved;
  });

  function restore_options() {
    browser.storage.sync.get({
      teamName: "insert team name here"
    }, function(items) {
      document.getElementById('teamName').value = items.teamName;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);

  var authorClick = function() {
    browser.tabs.create({url: 'https://rishiraj.me'});
  };

  document.getElementById('author').addEventListener('click', authorClick);

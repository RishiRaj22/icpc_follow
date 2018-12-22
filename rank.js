window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();
browser.storage.sync.get('teamName',function(i) {
  var teamName = i.teamName;
  var a = [].slice.call(document.getElementsByTagName("a")).filter(function(i) { return i.innerText === teamName })[0];
  var parent = a.parentElement.parentElement.parentElement;
  var rank = parent.firstElementChild.innerText;
  var solve = [].slice.call(a.parentElement.parentElement.parentElement.children)[2].innerText;
  browser.storage.sync.get({
    solved: '0(0)',
    rank: 100
  }, function(items) {
    var s = items.solved;
    var r = items.rank;
    if(solve !== s) {
      var verd = "Rank " + rank + "\nSolved" + solve;
      browser.storage.sync.set({
        solved: solve,
        rank: rank
      },function() {
        browser.runtime.sendMessage({
          verdict: "Rank " + rank,
          score: solve,
          id: solve
        });
      });
  }
  browser.storage.sync.set({
    rank: rank
  });
  setTimeout(function() {
    window.location.reload();
  },20000);
  });
});
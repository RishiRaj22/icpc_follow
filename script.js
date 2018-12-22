"use strict";
var listening = [];

// For cross-browser compatibility
window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();

// For cross-browser Text to Speech
var speak = (function(text) {
    if(browser.tts) {
        browser.tts.speak(text);
    } else {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
});


/**
 * Handles messages sent from content-scripts running on Codeforces and AtCoder
 * @param {Object} request Contains verdict, time taken, memory consumed by the submission
 * @param {*} sender
 * @param {*} sendResponse
 */
function handleMessage(request, sender, sendResponse) {
    var verdict = request.verdict;
    var time = request.time;
    var mem = request.mem;
    var id = request.id;
    var score = request.score;
    notify(verdict,score,time,mem,id);
}

/**
 * Notifies about the result of the submission
 * @param {string} verdict The result of the submission.
 * @param {*} score The score obtained through the submission (optional)
 * @param {*} time The time taken in code execution (optional)
 * @param {*} mem The memory required in code execution (optional)
 * @param {string} id The id of the submission (optional)
 */
function notify(verdict,score,id) {
    var details = [];
    if (score != null && typeof score != 'undefined') {
        details.push("Score " + score);
    }
    details = details.join("\n");
    if(typeof id == 'undefined') {
        id = Math.random().toString(36);
    }
    var message = verdict;
    message += "\n"+details;
    speak(message);
    //If ID is there, use that for a unique ID or else generate a random one
    browser.notifications.create(id, {
        type: "basic",
        iconUrl: "icon.png",
        title: verdict,
        message: details
    })
}

browser.runtime.onMessage.addListener(handleMessage);
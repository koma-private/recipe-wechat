'use strict';
const path = require('path');

module.exports = (Franz, options) => {
  function getMessages() {
    let directCount = 0;
    let indirectCount = 0;
    let chat_item = document.querySelectorAll('div.chat_item');

    Array.prototype.forEach.call(chat_item, function (item) {
      let count = 0;
      let reddot = item.querySelector("i.web_wechat_reddot_middle");
      let avatarImage = item.querySelector("img.img");

      if (reddot && reddot.innerText) {
        count = parseInt(reddot.innerText);
      }

      if (avatarImage && avatarImage.getAttribute("src").search("webwxgeticon") != -1) {
        directCount += count;
      } else {
        indirectCount += count;
      }
    });

    Franz.setBadge(directCount, indirectCount);
  }

  Franz.injectCSS(path.join(__dirname, 'service.css'));

  Franz.loop(getMessages);
}

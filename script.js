import proverbs from "./proverbs.js";

document.addEventListener("DOMContentLoaded", function () {
  const quoteText = document.getElementById("quoteText");
  const adviceText = document.getElementById("adviceText");
  const newQuoteBtn = document.getElementById("newQuoteBtn");
  const screenshotBtn = document.getElementById("screenshotBtn");
  const shareBtn = document.getElementById("shareBtn");
  const quoteWrapper = document.getElementById("quoteWrapper");

  function getRandomProverb() {
    const randomIndex = Math.floor(Math.random() * proverbs.length);
    return proverbs[randomIndex];
  }

  newQuoteBtn.addEventListener("click", function () {
    const { proverb, advice } = getRandomProverb();
    quoteText.textContent = proverb;
    adviceText.innerHTML = "_______________________<br><br>" + advice;
  });

  screenshotBtn.addEventListener("click", function () {
    takeScreenshot();
  });

  shareBtn.addEventListener("click", function () {
    const proverb = quoteText.textContent;
    takeScreenshot().then(function (screenshotBlob) {
      const shareOptions = {
        title: "Share Proverb",
        text: proverb,
        files: [
          new File([screenshotBlob], "proverb.png", {
            type: "image/png",
          }),
        ],
      };

      if (navigator.share) {
        navigator
          .share(shareOptions)
          .then(function () {
            console.log("Screenshot shared successfully");
          })
          .catch(function (error) {
            console.error("Error sharing screenshot:", error);
          });
      } else {
        console.log("Web Share API not supported");
      }
    });
  });

  function takeScreenshot() {
    return html2canvas(quoteWrapper).then(function (canvas) {
      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard
            .write([item])
            .then(function () {
              resolve(blob);
            })
            .catch(function (error) {
              console.error("Failed to copy screenshot to clipboard:", error);
              resolve(blob);
            });
        });
      });
    });
  }

  // Display a random proverb and advice on page load
  newQuoteBtn.click();
});

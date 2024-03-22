import proverbs from "./proverbs.js";

document.addEventListener("DOMContentLoaded", function () {
  const quoteText = document.getElementById("quoteText");
  const adviceText = document.getElementById("adviceText");
  const newQuoteBtn = document.getElementById("newQuoteBtn");
  const screenshotBtn = document.getElementById("screenshotBtn");
  const shareBtn = document.getElementById("shareBtn");
  const quoteWrapper = document.getElementById("quoteWrapper");

  // Array of gradient color combinations
  const gradients = [
    "linear-gradient(135deg, #800080, #dd1f1f)", // Reddish-purple
    "linear-gradient(135deg, #008080, #ff8c00)", // Orange to blue-green
    "linear-gradient(135deg, #ff1493, #00ced1)", // Pink to turquoise
    "linear-gradient(135deg, #4682b4, #ff6347)", // Steel Blue to Tomato
    "linear-gradient(135deg, #2e8b57, #ff4500)", // Sea Green to Orange Red
    "linear-gradient(135deg, #9932cc, #ff7f50)", // Dark Orchid to Coral
    "linear-gradient(135deg, #1e90ff, #ff69b4)", // Dodger Blue to Hot Pink
    "linear-gradient(135deg, #8a2be2, #ffd700)", // Blue Violet to Gold
    "linear-gradient(135deg, #ff0000, #ffff00)", // Red to Yellow
    "linear-gradient(135deg, #00ff00, #0000ff)", // Green to Blue
    "linear-gradient(135deg, #ffa500, #8b008b)", // Orange to Dark Magenta
    "linear-gradient(135deg, #00ffff, #8b4513)", // Cyan to Saddle Brown
    "linear-gradient(135deg, #ff00ff, #ffdab9)", // Magenta to PeachPuff
    "linear-gradient(135deg, #6a5acd, #ff4500)", // Slate Blue to Orange Red
    "linear-gradient(135deg, #008b8b, #b22222)", // Dark Cyan to Fire Brick
    "linear-gradient(135deg, #ffc0cb, #ff4500)", // Pink to Orange Red
    "linear-gradient(135deg, #00ced1, #ff69b4)", // Turquoise to Hot Pink
    "linear-gradient(135deg, #4169e1, #ff4500)", // Royal Blue to Orange Red
    "linear-gradient(135deg, #2f4f4f, #ff69b4)", // Dark Slate Gray to Hot Pink
    "linear-gradient(135deg, #d8bfd8, #ff4500)", // Thistle to Orange Red
  ];

  function getRandomProverb() {
    const randomIndex = Math.floor(Math.random() * proverbs.length);
    return proverbs[randomIndex];
  }

  function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  }

  newQuoteBtn.addEventListener("click", function () {
    const { proverb, advice } = getRandomProverb();
    const randomGradient = getRandomGradient();

    // Apply random gradient color to quote wrapper
    quoteWrapper.style.background = randomGradient;

    quoteText.textContent = proverb;
    adviceText.innerHTML = "____________________<br><br>" + advice;
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

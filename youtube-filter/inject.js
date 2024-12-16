chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "filterRecommendations") {
    const keyword = request.keyword;
    const videos = document.querySelectorAll("ytd-rich-item-renderer");
    videos.forEach((video) => {
      const titleElement = video.querySelector("#video-title");
      if (titleElement) {
        const title = titleElement.textContent.toLowerCase();
        if (!title.includes(keyword.toLowerCase())) {
          video.style.display = "none";
        } else {
          video.style.display = "block";
        }
      }
    });
  }

  if (request.action === "getRecommendations") {
    const recommendations = document.querySelectorAll("ytd-rich-item-renderer");
    const recommendationTitles = [];
    recommendations.forEach((recommendation) => {
      const titleElement = recommendation.querySelector("#video-title");
      if (titleElement) {
        const title = titleElement.textContent;
        recommendationTitles.push(title);
      }
    });
    sendResponse({ recommendations: recommendationTitles });
  }
});

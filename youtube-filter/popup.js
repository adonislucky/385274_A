document.getElementById("filterButton").addEventListener("click", () => {
  const keyword = document.getElementById("keywordInput").value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "filterRecommendations",
      keyword,
    });
  });
});

document
  .getElementById("getRecommendationsButton")
  .addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getRecommendations" },
        (response) => {
          const recommendationList =
            document.getElementById("recommendationList");
          recommendationList.innerHTML = "";
          if (response && response.recommendations) {
            response.recommendations.forEach((recommendation) => {
              const listItem = document.createElement("li");
              listItem.textContent = recommendation;
              recommendationList.appendChild(listItem);
            });
          }
        }
      );
    });
  });

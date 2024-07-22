"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/ap-reorder-var.js
  window.Wized = window.Wized || [];
  window.Wized.push((Wized) => {
    const galleryList = document.getElementById("gallery-list");
    const updateGalleryImgOrder = () => {
      const galleryItems = galleryList.querySelectorAll("#gallery-list-item");
      const imgOrder = Array.from(galleryItems).filter((item) => item.getAttribute("status") === "uploaded").map((item) => ({
        cf_id: item.getAttribute("cf_id"),
        name: item.getAttribute("name"),
        file_url: item.getAttribute("file_url")
      }));
      Wized.data.v.galleryImgOrder = imgOrder;
    };
    const observer = new MutationObserver((mutations) => {
      let needsUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          needsUpdate = true;
        } else if (mutation.type === "attributes" && mutation.attributeName === "status") {
          if (mutation.target.getAttribute("status") === "uploaded") {
            needsUpdate = true;
          }
        }
      });
      if (needsUpdate) {
        updateGalleryImgOrder();
      }
    });
    observer.observe(galleryList, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ["status"]
    });
    updateGalleryImgOrder();
  });
})();
//# sourceMappingURL=ap-reorder-var.js.map

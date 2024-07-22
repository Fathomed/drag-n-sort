"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/ap-dragsort.js
  document.addEventListener("DOMContentLoaded", () => {
    const sortableList = document.querySelector(".file-list-holder");
    const initializeDragEvents = (item) => {
      item.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging");
      });
      item.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
      });
    };
    const handleDragOver = (e) => {
      e.preventDefault();
      const draggingItem = document.querySelector(".dragging");
      if (!draggingItem)
        return;
      const siblings = Array.from(sortableList.querySelectorAll(".file-item-gallery:not(.dragging)"));
      const nextSibling = siblings.find(
        (sibling) => e.clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 2
      );
      if (nextSibling) {
        sortableList.insertBefore(draggingItem, nextSibling);
      } else {
        sortableList.appendChild(draggingItem);
      }
    };
    const initializeExistingItems = () => {
      document.querySelectorAll(".file-item-gallery").forEach(initializeDragEvents);
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("file-item-gallery")) {
            initializeDragEvents(node);
          }
        });
      });
    });
    observer.observe(sortableList, { childList: true });
    sortableList.addEventListener("dragover", handleDragOver);
    sortableList.addEventListener("dragenter", (e) => e.preventDefault());
    initializeExistingItems();
  });
})();
//# sourceMappingURL=ap-dragsort.js.map

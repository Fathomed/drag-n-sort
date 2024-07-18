document.addEventListener('DOMContentLoaded', () => {
  const sortableList = document.querySelector('.file-list-holder');

  // Function to initialize drag events on items
  const initializeDragEvents = (item) => {
    item.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });
  };

  // Function to handle dragover event
  const handleDragOver = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    if (!draggingItem) return;

    const siblings = Array.from(sortableList.querySelectorAll('.file-item-gallery:not(.dragging)'));
    const nextSibling = siblings.find(
      (sibling) => e.clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 2
    );

    if (nextSibling) {
      sortableList.insertBefore(draggingItem, nextSibling);
    } else {
      sortableList.appendChild(draggingItem);
    }
  };

  // Initialize drag events on existing items
  document.querySelectorAll('.file-item-gallery').forEach(initializeDragEvents);

  // Handle the addition of new items
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('file-item-gallery')) {
          initializeDragEvents(node);
        }
      });
    });
  });

  observer.observe(sortableList, { childList: true });

  // Event listeners for sortable list
  sortableList.addEventListener('dragover', handleDragOver);
  sortableList.addEventListener('dragenter', (e) => e.preventDefault());
});

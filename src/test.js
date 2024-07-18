document.addEventListener('DOMContentLoaded', () => {
  const sortableList = document.querySelector('.file-list-holder');
  const itemsInput = document.getElementById('items');

  // Function to initialize drag events on items
  const initializeDragEvents = (item) => {
    item.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
      updateInputOrder();
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

  // Function to update the input order
  const updateInputOrder = () => {
    const items = Array.from(sortableList.querySelectorAll('.file-item-gallery'));
    const order = items.map((item) => item.getAttribute('wz_id'));
    itemsInput.value = JSON.stringify(order);
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

  // Initial order update
  updateInputOrder();
});

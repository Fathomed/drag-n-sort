document.addEventListener('DOMContentLoaded', () => {
    const sortableList = document.querySelector('.file-list-holder');
  
    const debounce = (func, wait) => {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };
  
    const initializeDragEvents = (item) => {
      item.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging');
      });
  
      item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        reorderItems(); // Ensure reordering is triggered at the end of dragging
      });
    };
  
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
  
    const reorderItems = debounce(() => {
      const items = Array.from(sortableList.querySelectorAll('.file-item-gallery'));
      const newOrder = items.map((item, index) => {
        return {
          cf_id: item.getAttribute('cf_id'),
          name: item.getAttribute('name'),
          file_url: item.getAttribute('file_url'),
          ord_index: index + 1,
          status: 'uploaded'
        };
      });
  
      Wized.data.v.multiFileInput = newOrder;

        // If you need to perform further actions after updating the multiFileInput, you can do so here
  }, 300); // Adjust the debounce delay as necessary
};

// Attach dragover event listener to the sortable list
sortableList.addEventListener('dragover', handleDragOver);

// Initialize drag events for existing items in the sortable list
Array.from(sortableList.querySelectorAll('.file-item-gallery')).forEach((item) => {
  initializeDragEvents(item);
});

// Optionally, you might want to dynamically initialize drag events on new items added to the list
// Example: sortableList.addEventListener('DOMNodeInserted', (e) => initializeDragEvents(e.target));
});

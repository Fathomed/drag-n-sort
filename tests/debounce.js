document.addEventListener('DOMContentLoaded', () => {
  const sortableList = document.querySelector('.file-list-holder');

  const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const reorderItems = debounce(() => {
    const items = Array.from(sortableList.querySelectorAll('.file-item-gallery'));
    const newOrder = items.map((item) => {
      const cfId = item.getAttribute('cf_id');
      return Wized.data.v.multiFileInput.find(obj => obj.cf_id === cfId);
    }).filter(item => item);

    Wized.data.v.multiFileInput = newOrder;
  }, 300); // Adjust the delay as needed

  sortableList.addEventListener('dragend', reorderItems);
});
// used on Angler's Planet to detect changes in the gallery items and order to update galleryImgOrder var in Wized
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  const galleryList = document.getElementById('gallery-list');

  // Function to update the Wized variable with the current order of gallery items
  const updateGalleryImgOrder = () => {
    const galleryItems = galleryList.querySelectorAll('#gallery-list-item');
    const imgOrder = Array.from(galleryItems)
      .filter((item) => item.getAttribute('status') === 'uploaded')
      .map((item) => ({
        cf_id: item.getAttribute('cf_id'),
        name: item.getAttribute('name'),
        file_url: item.getAttribute('file_url'),
      }));
    Wized.data.v.galleryImgOrder = imgOrder;
  };

  // Observe changes in the gallery list
  const observer = new MutationObserver((mutations) => {
    let needsUpdate = false;

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        needsUpdate = true;
      } else if (mutation.type === 'attributes' && mutation.attributeName === 'status') {
        if (mutation.target.getAttribute('status') === 'uploaded') {
          needsUpdate = true;
        }
      }
    });

    if (needsUpdate) {
      updateGalleryImgOrder();
    }
  });

  // Start observing the gallery list for changes
  observer.observe(galleryList, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ['status'],
  });

  // Initial update
  updateGalleryImgOrder();
});

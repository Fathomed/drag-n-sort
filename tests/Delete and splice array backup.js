let multiHiddenFileInputArray = i.multiHiddenFileInput;
let multiFileInputArray = v.multiFileInput;
let galleryImgOrderArray = v.galleryImgOrder;

let itemToRemove = v.temp_cf_image_id;

// Filter i.multiHiddenFileInput to remove the item
const newFileArray = multiHiddenFileInputArray.filter((item) => item.cf_id !== itemToRemove);

// Find the index of the item to remove in v.multiFileInput
const indexToRemoveOne = multiFileInputArray.findIndex((item) => item.cf_id === itemToRemove);

// Find the index of the item to remove in v.galleryImgOrder
const indexToRemoveTwo = galleryImgOrderArray.findIndex((item) => item.cf_id === itemToRemove);

// Remove the item from v.multiFileInput using splice if it exists
if (indexToRemoveOne !== -1) {
  multiFileInputArray.splice(indexToRemoveOne, 1);
}

// Remove the item from v.galleryImgOrder using splice if it exists
if (indexToRemoveTwo !== -1) {
  galleryImgOrderArray.splice(indexToRemoveTwo, 1);
}

// Update the arrays
i.multiHiddenFileInput = newFileArray;
v.multiFileInput = multiFileInputArray;
v.galleryImgOrder = galleryImgOrderArray;

// Check if file input should be re-enabled
if (i.multiHiddenFileInput.length < 9) {
  const fileInput = document.getElementById('fileUpload');
  if (fileInput) {
    fileInput.removeAttribute('disabled');
  }
}

// Return both arrays as an object
return {
  multiHiddenFileInput: i.multiHiddenFileInput,
  multiFileInput: v.multiFileInput,
  galleryImgOrder: v.galleryImgOrder,
};

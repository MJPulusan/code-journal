'use strict';
const $photoURLInput = document.querySelector('#photoURL');
const $photoPreview = document.querySelector('#photo-preview');
const form = document.getElementById('photo-form');
if (!$photoURLInput) throw new Error('$photoURLInput does not exist');
if (!$photoPreview) throw new Error('$photoPreview does not exist');
$photoURLInput.addEventListener('input', () => {
  $photoPreview.src = $photoURLInput.value;
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newEntry = {
    entryId: data.nextEntryId,
    photoURL: $photoURLInput.value,
  };
  data.nextEntryId++;
  data.entries = [newEntry].concat(data.entries);
  console.log(data);
  form.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
});

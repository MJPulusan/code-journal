'use strict';
const $photoURLInput = document.querySelector('#photoURL');
const $titleInput = document.querySelector('#title');
const $photoPreview = document.querySelector('#photo-preview');
const $notes = document.querySelector('#comments');
const form = document.getElementById('photo-form');
if (!$titleInput) throw new Error('$titleInput does not exist');
if (!$photoURLInput) throw new Error('$photoURLInput does not exist');
if (!$photoPreview) throw new Error('$photoPreview does not exist');
$photoURLInput.addEventListener('input', () => {
  $photoPreview.src = $photoURLInput.value;
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newEntry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    photoURL: $photoURLInput.value,
    notes: $notes.value,
  };
  data.entries.unshift(newEntry);
  writeData();
  data.nextEntryId++;
  form.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
});

"use strict";
const form = document.getElementById('photo-form');
const $photoURLInput = document.querySelector('#photoURL');
const $photoPreview = document.querySelector('#photo-preview');
if (!$photoURLInput)
    throw new Error('$photoURLInput does not exist');
if (!$photoPreview)
    throw new Error('$photoPreview does not exist');
const dataModel = {
    nextEntryId: 1,
    entries: [],
};
$photoURLInput.addEventListener('input', () => {
    $photoPreview.src = $photoURLInput.value;
});
form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const newEntry = {
        entryId: dataModel.nextEntryId,
        photoURL: $photoURLInput.value,
    };
    dataModel.nextEntryId++;
    dataModel.entries.unshift(newEntry);
    console.log(dataModel);
    form.reset();
    $photoPreview.src = 'placeholder.png';
});

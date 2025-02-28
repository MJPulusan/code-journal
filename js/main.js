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
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  writeData();
  const ul = document.getElementById('entList');
  if (ul) {
    ul.prepend(renderEntry(newEntry));
  }
  document.addEventListener('DOMContentLoaded', () => {
    toggleNoEntries();
  });
  form.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
});
// start of issue #2
function renderEntry(entry) {
  const li = document.createElement('li');
  li.className = 'photo-preview';
  li.dataset.entryId = String(entry.entryId);
  const $img = document.createElement('img');
  $img.src = entry.photoURL;
  $img.alt = entry.title;
  $img.className = 'entry-image';
  const $textContainer = document.createElement('div');
  $textContainer.className = 'entry-content';
  const $title = document.createElement('h3');
  $title.textContent = entry.title;
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $textContainer.appendChild($title);
  $textContainer.appendChild($notes);
  li.appendChild($img);
  li.appendChild($textContainer);
  return li;
}
function toggleNoEntries() {
  const messageElement = document.getElementById('noEntriesMessage');
  if (!messageElement) return;
  messageElement.style.display =
    messageElement.style.display === 'none' ? 'block' : 'none';
}
// function toggleNoEntries(data: Data): void {
//   const messageElement = document.getElementById('noEntriesMessage');
//   if (!messageElement) return;
//   if (data.entries.length === 0) {
//     messageElement.classList.add('hidden');
//   } else {
//     messageElement.classList.remove('hidden');
//   }
// }
// for toggle switching
// function toggleNoEntries(): void {
//   const ul = document.getElementById('entList');
//   const noEntMessage = document.querySelector('.no-entries-message');
//   if (!ul) return;
//   if (data.entries.length === 0) {
//     if (!noEntMessage) {
//       const message = document.createElement('p');
//       message.className = 'no-entries-message';
//       message.textContent = 'No entries recorded.';
//       ul.parentNode?.appendChild(message);
//     }
//   } else {
//     noEntMessage?.remove();
//   }
// }

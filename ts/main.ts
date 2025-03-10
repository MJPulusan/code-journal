interface Entry {
  entryId: number;
  title: string;
  photoURL: string;
  notes: string;
}

// assigning variables & Selecting DOM elements
const $photoURLInput = document.querySelector('#photoURL') as HTMLInputElement;
const $titleInput = document.querySelector('#title') as HTMLInputElement;
const $photoPreview = document.querySelector(
  '#photo-preview',
) as HTMLImageElement;
const $notesInput = document.querySelector('#comments') as HTMLTextAreaElement;
const $formElement = document.querySelector('#photo-form') as HTMLFormElement;
const $entryList = document.querySelector('#entList') as HTMLUListElement;
const $noEntriesMessage = document.querySelector(
  '.noEntriesMessage',
) as HTMLElement;
const $newEntryButton = document.querySelector(
  '#newButton',
) as HTMLAnchorElement;
const $entHead = document.querySelector('#ent-Head') as HTMLHeadingElement;

if (!$titleInput) throw new Error('$titleInput does not exist');
if (!$photoURLInput) throw new Error('$photoURLInput does not exist');
if (!$photoPreview) throw new Error('$photoPreview does not exist');
if (!$notesInput) throw new Error('$photoPreview does not exist');
if (!$formElement) throw new Error('One or more form elements are missing');
if (!$entHead) throw new Error('$entHead does not exist');

// Live preview for photo input
$photoURLInput.addEventListener('input', () => {
  $photoPreview.src = $photoURLInput.value;
});

// Function to render a new entry in the list
function renderEntry(entry: Entry): HTMLLIElement {
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

// Loads entries from localStorage and displays them
document.addEventListener('DOMContentLoaded', () => {
  if (!$entryList || !$noEntriesMessage) {
    throw new Error('One or more list elements are missing');
  }

  // Retrieve stored entries from localStorage
  const savedEntries = localStorage.getItem('entries');
  if (savedEntries) {
    data.entries = JSON.parse(savedEntries);
  }

  // Retrieve last view from localStorage
  const savedView = localStorage.getItem('currentView') as
    | 'entries'
    | 'entry-form'
    | null;
  viewSwap(savedView ?? 'entries'); // Default to 'entries' if no view is saved

  // Render entry - to load entries into the UI
  data.entries.forEach((entry) => {
    const entryElement = renderEntry(entry);
    $entryList.appendChild(entryElement);
  });

  toggleNoEntries();
});

// Toggles the "No Entries" message visibility
function toggleNoEntries(): void {
  if (!$noEntriesMessage) return;
  $noEntriesMessage.classList.toggle('hidden', data.entries.length > 0);
}

// Handles view swapping between the entries list and the form
function viewSwap(viewName: 'entries' | 'entry-form'): void {
  const $entriesView = document.querySelector(
    '[data-view="entries"]',
  ) as HTMLElement;
  const $entryFormView = document.querySelector(
    '[data-view="entry-form"]',
  ) as HTMLElement;

  if (!$entriesView || !$entryFormView) {
    throw new Error('View elements are missing');
  }

  $entriesView.classList.toggle('hidden', viewName !== 'entries');
  $entryFormView.classList.toggle('hidden', viewName !== 'entry-form');
}

// "Entries" navbar eventlistener
$entHead.addEventListener('click', (event) => {
  event.preventDefault();
  viewSwap('entries'); // Swap to the Entries view
});

// Handle new entry button click
$newEntryButton?.addEventListener('click', () => {
  viewSwap('entry-form');
});

// Form submission handler
$formElement.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const newEntry: Entry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    photoURL: $photoURLInput.value,
    notes: $notesInput.value,
  };

  data.nextEntryId++;
  data.entries.unshift(newEntry);
  localStorage.setItem('entries', JSON.stringify(data.entries)); // Save to localStorage

  const entryElement = renderEntry(newEntry);
  $entryList.prepend(entryElement);

  toggleNoEntries();
  $formElement.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';

  viewSwap('entries');
});

interface Entry {
  entryId: number;
  title: string;
  photoURL: string;
  notes: string;
}

const $photoURLInput = document.querySelector('#photoURL') as HTMLInputElement;
const $titleInput = document.querySelector('#title') as HTMLInputElement;
const $photoPreview = document.querySelector(
  '#photo-preview',
) as HTMLImageElement;
const $notes = document.querySelector('#comments') as HTMLTextAreaElement;
const form = document.getElementById('photo-form') as HTMLFormElement;

if (!$titleInput) throw new Error('$titleInput does not exist');
if (!$photoURLInput) throw new Error('$photoURLInput does not exist');
if (!$photoPreview) throw new Error('$photoPreview does not exist');

$photoURLInput.addEventListener('input', () => {
  $photoPreview.src = $photoURLInput.value;
});

form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const newEntry: Entry = {
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

  toggleNoEntries();

  form.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
});

// start of issue #2
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

// to load DOM entries
document.addEventListener('DOMContentLoaded', () => {
  const data = {
    entries: ['Entry 1', 'Entry 2', 'entry 3'],
  };

  const listElement = document.getElementById('entriesList');
  if (!listElement) return;

  data.entries.forEach((entry) => {
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    listElement.appendChild(listItem);
  });
});

//  for toggle switch
function toggleNoEntries(): void {
  const messageElement = document.getElementById('noEntriesMessage');

  if (!messageElement) return;

  if (data.entries.length === 0) {
    messageElement.classList.remove('hidden');
  } else {
    messageElement.classList.add('hidden');
  }
}

// for view swapping
function viewSwap(viewName: 'entries' | 'entry-form'): void {
  const entriesView = document.querySelector('.entries-view') as HTMLElement;
  const entryFormView = document.querySelector(
    '.entry-form-view',
  ) as HTMLElement;

  if (!entriesView || !entryFormView) {
    throw new Error('One or both view elements are missing');
  }
  if (viewName === 'entries') {
    entriesView.style.display = 'block';
    entryFormView.style.display = 'none';
  } else if (viewName === 'entry-form') {
    entriesView.style.display = 'none';
    entryFormView.style.display = 'block';
  }

  data.view = viewName;
  localStorage.setItem('currentView', viewName);
}

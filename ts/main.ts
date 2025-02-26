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

  data.entries.push(newEntry);
  data.nextEntryId++;
  writeData();
  form.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
});

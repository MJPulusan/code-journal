const form = document.getElementById('photo-form') as HTMLFormElement;
const $photoURLInput = document.querySelector('#photoURL') as HTMLInputElement;
const $photoPreview = document.querySelector('#photo-preview') as HTMLImageElement;

if (!$photoURLInput) throw new Error('$photoURLInput does not exist');
if (!$photoPreview) throw new Error('$photoPreview does not exist');

const dataModel = {
  nextEntryId: 1,
  entries: [],
};

$photoURLInput.addEventListener('input', () => {
  $photoPreview.src = $photoURLInput.value;
});

form?.addEventListener('submit', (event: Event) => {
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

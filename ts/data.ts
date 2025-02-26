interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): [] {
  const dataJSON = localStorage.getItem('data-storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  } else {
    return [];
  }
}

//  const STORAGE_KEY = 'entryData';

// function saveData(): void {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// }

// function loadData(): Data {
//   const storedData = localStorage.getItem(STORAGE_KEY);
//   return storedData
//     ? JSON.parse(storedData)
//     : {
//         view: 'entry-form',
//         entries: [],
//         editing: null,
//         nextEntryId: 1,
//       };
// }

// function addEntry(title: string, photoURL: string, notes: string): void {
//   const newEntry: Entry = {
//     entryId: data.nextEntryId++,
//     title,
//     photoURL,
//     notes,
//   };

//   data.entries.push(newEntry);
//   saveData();
// }

// function setView(view: string): void {
//   data.view = view;
//   saveData();
// }

// function setEditing(entry: null): void {
//   data.editing = entry;
//   saveData();
// }

// // import('./data').then(
// //   ({ saveData, loadData, addEntry, setView, setEditing }) => {
// //     addEntry($titleInput.value, $photoURLInput.value, $notes.value);
// //   },
// // );

// export { data, saveData, loadData, addEntry, setView, setEditing };

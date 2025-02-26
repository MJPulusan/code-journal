interface Data {
  view: string;
  entries: Entry[];
  editing: null;
  nextEntryId: number;
}

const data = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

function readData(): Data {
  const dataJSON = localStorage.getItem('data-storage');
  if (dataJSON) {
    return JSON.parse(dataJSON);
  } else {
    return { view: 'entry-form', entries: [], editing: null, nextEntryId: 1 };
  }
}

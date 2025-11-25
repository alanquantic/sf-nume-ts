import { pageNameBySlug } from '@/utils/constants';

type Note = {
  data: { }
};

function ConsultantContentNotes(noteData:Note) {
  const { data: dataNote } = noteData;
  const noteEntries = Object.entries(dataNote).map((items) => items);

  return (
    <>
      {
      noteEntries.map((items:any[]) => (
        <div className="border-b border-white p-3 bg-gray-100">
          <h2 className="font-bold">{pageNameBySlug({ name: items[0] })}</h2>
          <p>{items[1]}</p>
        </div>
      ))
    }
    </>
  );
}

export default ConsultantContentNotes;

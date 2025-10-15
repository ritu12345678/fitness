import React from 'react';
import Switch from '@mui/material/Switch';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.';

function SectionRow({ title, updatedAt }) {
  const [active, setActive] = React.useState(true);
  return (
    <div className="py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <div className="text-xs text-gray-500">{updatedAt}</div>
        </div>
        <div className="flex items-center gap-3">
          <Switch size="small" checked={active} onChange={(e)=>setActive(e.target.checked)} />
          <button title="Edit" className="text-gray-600 hover:text-gray-900">
            <BorderColorIcon sx={{ fontSize: 16 }} />
          </button>
          <button className="text-xs text-gray-700 hover:text-gray-900">Edit</button>
          <button title="Delete" className="text-red-600 hover:text-red-700">
            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
          </button>
          <button className="text-xs text-red-600 hover:text-red-700">Delete</button>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-2">{LOREM}</p>
    </div>
  );
}

function PageList() {
  const sections = [
    { id: 1, title: 'Privacy Policy', updatedAt: '1 min ago' },
    { id: 2, title: 'Terms And Conditions', updatedAt: '2 mins ago' },
    { id: 3, title: 'Refunds', updatedAt: '5 mins ago' },
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      {sections.map((s, idx) => (
        <div key={s.id}>
          <SectionRow title={s.title} updatedAt={s.updatedAt} />
          {idx < sections.length - 1 && <div className="border-t border-gray-200 my-2" />}
        </div>
      ))}
    </div>
  );
}

export default PageList;



import React from 'react';
import Switch from '@mui/material/Switch';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmationModal from '../../../components/ConfirmationModal';

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.';

function SectionRow({ title, updatedAt, onDelete }) {
  const [active, setActive] = React.useState(true);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleDelete = () => {
    onDelete(title);
    setOpenDeleteModal(false);
  };

  const customDeleteContent = (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{ 
        fontSize: '16px', 
        color: '#C82D30', 
        fontWeight: 500,
        marginBottom: '8px'
      }}>
        Are you sure you want to delete "{title}"?
      </div>
      <div style={{ 
        fontSize: '14px', 
        color: '#6b7280',
        lineHeight: 1.5
      }}>
        This action cannot be undone. All content and settings for this page will be permanently removed.
      </div>
    </div>
  );

  return (
    <>
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
            <button 
              title="Delete" 
              className="text-red-600 hover:text-red-700"
              onClick={() => setOpenDeleteModal(true)}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </button>
            <button 
              className="text-xs text-red-600 hover:text-red-700"
              onClick={() => setOpenDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-2">{LOREM}</p>
      </div>

      <ConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        customContent={customDeleteContent}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="#C82D30"
        showDeleteIcon={true}
        showCloseButton={false}
      />
    </>
  );
}

function PageList() {
  const [sections, setSections] = React.useState([
    { id: 1, title: 'Privacy Policy', updatedAt: '1 min ago' },
    { id: 2, title: 'Terms And Conditions', updatedAt: '2 mins ago' },
    { id: 3, title: 'Refunds', updatedAt: '5 mins ago' },
  ]);

  const handleDelete = (title) => {
    console.log(`Deleting page: ${title}`);
    // Remove the section from the list
    setSections(prev => prev.filter(section => section.title !== title));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      {sections.map((s, idx) => (
        <div key={s.id}>
          <SectionRow title={s.title} updatedAt={s.updatedAt} onDelete={handleDelete} />
          {idx < sections.length - 1 && <div className="border-t border-gray-200 my-2" />}
        </div>
      ))}
    </div>
  );
}

export default PageList;



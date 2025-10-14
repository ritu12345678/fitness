import React from 'react';
import TextField from '@mui/material/TextField';
import CustomModal from '../../../components/CustomModal';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';

function PageModal({ open, onClose, onSave }) {
  const [form, setForm] = React.useState({ title: '', content: '' });
  const actions = (
    <>
      <button onClick={onClose} className="bg-[#EBEFF4] text-[#64748B] px-3 py-2 text-sm rounded-2xl">Cancel</button>
      <button onClick={() => onSave?.(form)} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">Save</button>
    </>
  );
  return (
    <CustomModal open={open} onClose={onClose} title="Add Page Management" maxWidth="md" actions={actions} actionsAlign="center">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
          <TextField fullWidth placeholder="Enter Title" value={form.title} onChange={(e)=>setForm(p=>({...p,title:e.target.value}))} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
          <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
            {/* Toolbar (non-functional placeholder) */}
            <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-200 text-gray-700">
              <span className="text-xs">Normal text ▾</span>
              <button className="p-1 hover:bg-gray-100 rounded"><FormatBoldIcon sx={{ fontSize: 16 }} /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><FormatItalicIcon sx={{ fontSize: 16 }} /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><FormatUnderlinedIcon sx={{ fontSize: 16 }} /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><FormatListBulletedIcon sx={{ fontSize: 16 }} /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><FormatListNumberedIcon sx={{ fontSize: 16 }} /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><LinkIcon sx={{ fontSize: 16 }} /></button>
              <button className="p-1 hover:bg-gray-100 rounded"><ImageIcon sx={{ fontSize: 16 }} /></button>
            </div>
            {/* Editor area */}
            <div className="p-2">
              <TextField
                fullWidth
                multiline
                minRows={12}
                placeholder=""
                value={form.content}
                onChange={(e)=>setForm(p=>({...p,content:e.target.value}))}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default PageModal;



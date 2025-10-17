import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddFaqModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({ question: '', answer: '' });
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Add FAQ"
      maxWidth="md"
      actions={
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={() => onSave?.(form)} sx={{ borderRadius: 2, backgroundColor: '#f6a5a5', color: '#000' }}>Save</Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Question</Typography>
          <TextField fullWidth placeholder="Enter your question" value={form.question} onChange={change('question')} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Answer</Typography>
          <TextField 
            fullWidth 
            multiline 
            rows={4} 
            placeholder="Enter your answer" 
            value={form.answer} 
            onChange={change('answer')} 
          />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AddFaqModal;


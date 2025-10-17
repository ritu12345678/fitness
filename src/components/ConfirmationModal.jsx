import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  confirmColor = '#C82D30',
  showCloseButton = true,
  customContent,
  showDeleteIcon = false
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: showDeleteIcon ? 'center' : 'flex-end', 
        alignItems: 'center',
        pb: 1,
        px: 3,
        pt: 3
      }}>
        {showDeleteIcon ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <DeleteOutlineIcon sx={{ fontSize: 48, color: confirmColor }} />
          </Box>
        ) : (
          showCloseButton && (
            <IconButton
              onClick={onClose}
              sx={{
                width: 32,
                height: 32,
                bgcolor: confirmColor,
                color: 'white',
                '&:hover': {
                  bgcolor: confirmColor,
                  opacity: 0.9
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )
        )}
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        {customContent ? (
          customContent
        ) : (
          <Typography 
            variant="body1" 
            sx={{ 
              color: confirmColor,
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            {message}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        pb: 3, 
        pt: 1,
        justifyContent: 'flex-end',
        gap: 2
      }}>
        <Button
          onClick={onClose}
          sx={{
            color: confirmColor,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '14px',
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(200, 45, 48, 0.04)'
            }
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            backgroundColor: confirmColor,
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            px: 3,
            py: 1,
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: confirmColor,
              opacity: 0.9
            }
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;

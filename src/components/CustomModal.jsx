import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Divider from '@mui/material/Divider';

/**
 * CustomModal
 * Reusable modal wrapper with:
 * - Header with title and top-right close button
 * - Scrollable content area
 * - Optional footer actions (e.g., Cancel/Save)
 * - Configurable maxWidth and fullWidth
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title?: string | ReactNode
 * - children: ReactNode (your form body)
 * - actions?: ReactNode (footer content; pass buttons here)
 * - maxWidth?: 'xs'|'sm'|'md'|'lg'|'xl' (default 'md')
 * - fullWidth?: boolean (default true)
 * - contentSx?: MUI sx for DialogContent
 * - paperSx?: MUI sx for Dialog Paper (container)
 */
function CustomModal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'md',
  fullWidth = true,
  contentSx,
  paperSx,
  actionsAlign = 'center',
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          ...paperSx,
        },
      }}
    >
      {(title || onClose) && (
        <DialogTitle sx={{ px: 3, py: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          <span style={{ flex: 1 }}>{title}</span>
          {onClose && (
            <IconButton aria-label="close" onClick={onClose} size="small" sx={{ color: '#C82D30' }}>
              <HighlightOffOutlinedIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <Divider />
      <DialogContent sx={{ px: 3, py: 2, backgroundColor: '#ffffff', ...contentSx }}>
        {children}
      </DialogContent>
      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ px: 3, py: 2, backgroundColor: '#ffffff', justifyContent: actionsAlign }}>
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default CustomModal;



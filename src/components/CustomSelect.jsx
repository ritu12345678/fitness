import React, { forwardRef } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Reusable Select built on top of MUI Select
// - Rounded shape and menu radius are controlled globally via theme
// - Accepts simple `options` prop to avoid repeating MenuItem markup
// - Forwards ref so consumers can call focus() and form libs can register it
const CustomSelect = forwardRef(function CustomSelect(
  {
    label,
    value,
    onChange,
    options = [], // [{ label, value, disabled }]
    fullWidth = true,
    size = 'small',
    variant = 'outlined',
    labelId,
    id,
    MenuProps,
    FormControlProps,
    SelectProps,
    children, // allow custom children if needed
    compact = false, // more compact padding/height
    ...rest
  },
  ref
) {
  const lid = labelId || `${id || 'custom-select'}-label`;
  const compactSx = compact
    ? {
        '& .MuiSelect-select, & .MuiInputBase-input': {
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 10,
          paddingRight: 28,
          fontSize: 12,
          lineHeight: '20px',
        },
        '& .MuiOutlinedInput-root': {
          minHeight: 28,
        },
      }
    : undefined;

  return (
    <FormControl fullWidth={fullWidth} size={size} variant={variant} {...FormControlProps}>
      {label && <InputLabel id={lid}>{label}</InputLabel>}
      <Select
        labelId={lid}
        id={id}
        size={size}
        label={label}
        value={value}
        onChange={onChange}
        ref={ref}
        MenuProps={{ PaperProps: { sx: { borderRadius: 2 } }, ...MenuProps }}
        sx={{ ...(SelectProps?.sx || {}), ...(compactSx || {}) }}
        {...SelectProps}
        {...rest}
      >
        {children || options.map((opt) => (
          <MenuItem key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default CustomSelect;



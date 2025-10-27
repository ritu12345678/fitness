import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CustomMultiSelect = ({ 
  value = [], 
  onChange, 
  options = [], 
  placeholder = "Select options",
  disabled = false,
  label,
  required = false,
  error = false,
  helperText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newValue);
  };

  const handleRemoveChip = (optionValue, e) => {
    e.stopPropagation(); // prevent dropdown toggle
    const newValue = value.filter(v => v !== optionValue);
    onChange?.(newValue);
  };

  const getSelectedLabels = () => {
    return value.map(val => options.find(opt => opt.value === val)?.label || val);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Label */}
      {label && (
        <Typography 
          sx={{ fontSize: 14, fontWeight: 500, mb: 1, color: error ? '#d32f2f' : 'inherit' }}
        >
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </Typography>
      )}

      {/* Input Field */}
      <Box
        ref={dropdownRef}
        sx={{
          border: `1px solid ${error ? '#d32f2f' : '#e0e0e0'}`,
          borderRadius: '8px',
          minHeight: '56px',
          padding: '8px 40px 8px 12px',
          backgroundColor: disabled ? '#f5f5f5' : '#fff',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 0.5,
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          '&:hover': { borderColor: disabled ? '#e0e0e0' : '#1976d2' },
          '&:focus-within': {
            borderColor: '#1976d2',
            boxShadow: '0 0 0 2px rgba(25,118,210,0.2)',
          }
        }}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
      >
        {/* Selected Items */}
        {value.length > 0 ? (
          getSelectedLabels().map((label, index) => (
            <Chip
              key={index}
              label={label}
              size="small"
              onDelete={(e) => handleRemoveChip(value[index], e)}
              sx={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                height: '24px',
                fontSize: '12px',
                '& .MuiChip-deleteIcon': { color: '#1976d2', fontSize: '16px' }
              }}
            />
          ))
        ) : (
          <Typography sx={{ color: '#9e9e9e', fontSize: 14 }}>
            {placeholder}
          </Typography>
        )}

        {/* Toggle Icon */}
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          sx={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            padding: 0.5,
            color: '#666'
          }}
        >
          {isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Dropdown Menu */}
      {isOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxHeight: 200,
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()} // prevent closing on inner clicks
        >
          {/* Search */}
          <Box sx={{ padding: 1, borderBottom: '1px solid #e0e0e0' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                padding: '8px',
                fontSize: 14,
                backgroundColor: 'transparent'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>

          {/* Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <Box
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                sx={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: value.includes(option.value) ? '#e3f2fd' : 'transparent',
                  color: value.includes(option.value) ? '#1976d2' : 'inherit',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: value.includes(option.value)
                      ? '#bbdefb'
                      : '#f5f5f5',
                  }
                }}
              >
                {option.label}
              </Box>
            ))
          ) : (
            <Box sx={{ padding: '12px 16px', color: '#9e9e9e' }}>
              <Typography sx={{ fontSize: 14 }}>No options found</Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Helper Text */}
      {helperText && (
        <Typography sx={{ fontSize: 12, color: error ? '#d32f2f' : '#666', mt: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CustomMultiSelect;

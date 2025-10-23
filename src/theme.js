import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#E6F0FA",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 400,
          color: '#64748b',
          borderBottomColor: '#eef2f7',
        },
        body: {
          borderBottomColor: '#eef2f7',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 16,
        },
        select: {
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          paddingTop: 0,
          paddingBottom: 0,
        },
        notchedOutline: {
          borderColor: '#e5e7eb',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
        },
      },
    },

    // ✅ Tabs indicator customization
    MuiTabs: {
      styleOverrides: {
           root: {
          width: '100%', // make Tabs full width
        },
        flexContainer: {
          justifyContent: 'space-between', // evenly space tab labels
        },
        indicator: {
          display: 'none', // removes the underline
        },
      },
    },

    // ✅ Selected tab text color
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#EF4444', // red for selected tab
          },
        },
      },
    },

    // ✅ Switch component styling - Green when active
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#10B981', // Green color when checked
            '&:hover': {
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
            },
          },
        },
        track: {
          '&.Mui-checked': {
            backgroundColor: '#10B981', // Green track when checked
          },
        },
      },
    },
  },
});

export default theme;

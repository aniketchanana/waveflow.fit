'use client';

import { createTheme } from '@mui/material/styles';

export const gymThemePalette = {
  primary: {
    main: '#587AB5', // Slightly darker soft blue for primary elements
    light: '#8EA5DB', // Slightly darker lighter blue for hover or backgrounds
    dark: '#34548A', // Darker blue for focus states
    contrastText: '#FFFFFF', // White text for buttons and primary elements
  },
  secondary: {
    main: '#D8901F', // Slightly darker orange for accents
    light: '#F0B560', // Slightly darker lighter orange for highlights
    dark: '#A96C11', // Darker orange for strong accents
    contrastText: '#FFFFFF', // White text for secondary elements
  },
  background: {
    main: '#FAFCFE', // Light Bluish tone for main App Bg
    default: '#E9EFF8', // Slightly darker blue-gray for background
    paper: '#FFFFFF', // Slightly darker white for cards and containers
  },
  text: {
    primary: '#26334E', // Darker gray-blue for primary text
    secondary: '#4C617C', // Slightly darker medium gray-blue for secondary text
    disabled: '#9CA4B2', // Slightly darker muted gray for disabled text
  },
  action: {
    active: '#587AB5', // Darker active blue for icons
    selected: '#D7E2F2', // Slightly darker light blue background for selected items
    disabled: '#9CA4B2', // Slightly darker muted gray for disabled actions
  },
  error: {
    main: '#E64545', // Slightly darker red for error states
  },
  success: {
    main: '#3D8F43', // Slightly darker green for success states
  },
};

// Create a theme function for the dark gym theme
const theme = createTheme({
  spacing: (factor: number) => `calc(${factor} * 1rem)`,
  cssVariables: true,
  palette: gymThemePalette,
  custom: {
    leftPanelWidthExpanded: '18rem',
    leftPanelWidthMinimized: '8rem',
    headerHeight: '5rem',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      color: gymThemePalette.text.primary,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: gymThemePalette.text.primary,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 500,
      color: gymThemePalette.text.primary,
    },
    body1: { fontSize: '1rem', color: gymThemePalette.text.secondary },
    body2: { fontSize: '0.75rem', color: gymThemePalette.text.secondary },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          padding: '0.375rem 0.75rem !important',
          fontSize: '1rem !important',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          width: 'fit-content',
          whiteSpace: 'nowrap',
          height: 'fit-content',
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: gymThemePalette.primary.main, // Primary main (slightly darker soft blue)
          color: gymThemePalette.primary.contrastText, // White text for contrast
          '&:hover': {
            backgroundColor: gymThemePalette.primary.dark, // Primary dark (darker blue on hover)
          },
        },
        containedSecondary: {
          backgroundColor: gymThemePalette.secondary.main, // Secondary main (softer orange)
          color: gymThemePalette.primary.contrastText, // White text for contrast
          '&:hover': {
            backgroundColor: gymThemePalette.secondary.dark, // Secondary dark (darker orange on hover)
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: gymThemePalette.background.default, // Background default (soothing light blue-gray)
          color: gymThemePalette.text.primary, // Text primary (dark gray-blue)
          borderRadius: '1rem', // Rounded corners for better aesthetics
          boxShadow: '0 0.25rem 0.625rem rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: gymThemePalette.primary.main, // Primary main (soothing blue AppBar)
          color: gymThemePalette.primary.contrastText, // White text for good contrast
          boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)', // Subtle shadow for elevation
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: '0.5rem',
          padding: '0.25rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 166, 0.15)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 191, 166, 0.15)', // Subtle secondary color overlay
          },
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
      styleOverrides: {
        root: {
          '& .MuiPopover-paper': {
            backgroundColor: gymThemePalette.background.main,
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingBottom: '1rem',
          paddingTop: '1rem !important',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '0rem 1rem 1rem 1rem',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingBottom: '0rem',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { fontSize: '1rem', top: '-0.25rem !important' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          '& .MuiSelect-select': {
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            paddingLeft: '0.75rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '0.75rem',
          fontSize: '1rem',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          padding: '0rem 1rem',
          height: '100%',
          gap: '1rem',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: '0',
          '& .MuiFormControlLabel-label': {
            fontSize: '1rem',
          },
          '& .MuiCheckbox-root': {
            paddingRight: '0.25rem',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0.5rem',
          '&:last-child': {
            paddingBottom: '0.5rem',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: '1rem',
          },
        },
      },
    },
  },
});

export default theme;

import { gymThemePalette } from '@/theme';
import '@mui/material/styles';

interface IVariables {
  custom: {
    leftPanelWidthExpanded: string;
    leftPanelWidthMinimized: string;
    headerHeight: string;
    headerHeight: string;
  };
}
declare module '@mui/material/styles' {
  interface Theme extends IVariables {
    palette: typeof gymThemePalette;
  }

  interface ThemeOptions extends IVariables {
    palette?: typeof gymBlackThemePalette;
  }
}

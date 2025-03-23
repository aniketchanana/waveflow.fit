import { GridColDef } from '@mui/x-data-grid';

type ColDef = {
  cellRenderParams?: Record<string, any>;
} & GridColDef;

'use client';
import { Avatar } from '@mui/material';
import { get } from 'lodash';

import CenterAlign from '@/components/StyledComponents/CenterAlign';

const ImageRenderer = ({ colDef, row }) => {
  return (
    <CenterAlign justifyContent='flex-start'>
      <Avatar
        src={get(row, colDef.field)}
        alt={get(row, colDef?.cellRenderParams?.fallbackField, '')}
      />
    </CenterAlign>
  );
};
export default ImageRenderer;

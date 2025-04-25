import { Download } from '@mui/icons-material';
import { Button } from '@mui/material';
import QRCode from 'react-qr-code';

import VStack from '@/components/StyledComponents/VStack';
const ATTENDANCE_QR_CODE = 'attendance-qr-code';
const downloadQR = () => {
  const svg = document.getElementById(ATTENDANCE_QR_CODE) as HTMLElement;
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);

  const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'attendance-qr.svg';
  downloadLink.click();

  URL.revokeObjectURL(url);
};
const AttendanceQRCode = ({ gymCenterId }: { gymCenterId: string }) => {
  return (
    <VStack alignItems='center' gap={1}>
      <QRCode
        id={ATTENDANCE_QR_CODE}
        value={gymCenterId}
        style={{ width: '100%' }}
      />
      <Button startIcon={<Download />} onClick={downloadQR}>
        Attendance QR
      </Button>
    </VStack>
  );
};

export default AttendanceQRCode;

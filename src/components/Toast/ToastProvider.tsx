'use client';
import { Alert, Snackbar } from '@mui/material';
import { createContext, useCallback, useState } from 'react';

import { EToastType } from '@/components/Toast/useToast';

type TAlertOpts = {
  message: string;
  severity: EToastType;
  show: true;
  duration?: number;
};
type TInputAlertOpts = Pick<TAlertOpts, 'message' | 'severity' | 'duration'>;
type TToastCtx = {
  showToast: (opts: TInputAlertOpts) => void;
};

export const ToastContext = createContext<TToastCtx>({
  showToast: () => {
    throw new Error('Function showToast not implemented');
  },
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertOpts, setAlertOpts] = useState<null | TAlertOpts>(null);

  const handleClose = () => {
    setAlertOpts(null);
  };
  const showToast = useCallback((opts: TInputAlertOpts) => {
    setAlertOpts({ duration: 3000, ...opts, show: true });
  }, []);
  return (
    <ToastContext value={{ showToast }}>
      {children}
      {alertOpts && (
        <Snackbar
          open={Boolean(alertOpts?.show)}
          autoHideDuration={alertOpts?.duration}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertOpts?.severity}
            sx={{ width: '100%' }}
          >
            {alertOpts?.message}
          </Alert>
        </Snackbar>
      )}
    </ToastContext>
  );
};

export default ToastProvider;

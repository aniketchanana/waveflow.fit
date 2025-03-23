import { useContext } from 'react';

import { ToastContext } from '@/components/Toast/ToastProvider';

export enum EToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('ToastProvider wrapper missing');
  }
  return ctx;
};

export default useToast;

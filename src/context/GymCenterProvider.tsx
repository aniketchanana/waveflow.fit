'use client';
import { isEmpty } from 'lodash';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_MANAGER_ENDPOINTS } from '@/common/apiEndpoints';

export const GymCenterCtx = createContext<{
  gymCenterDetails: IGymCenter | null;
  isGymCenterLoading: boolean;
  isGymCenterLoadingErr: boolean;
  setGymCenterDetails: Dispatch<SetStateAction<IGymCenter | null>>;
}>({
  gymCenterDetails: null,
  isGymCenterLoading: false,
  isGymCenterLoadingErr: false,
  setGymCenterDetails: () => {
    throw new Error('Out of gymCenterContext');
  },
});

const GymCenterProvider = ({ children }: { children: ReactNode }) => {
  const [gymCenterDetails, setGymCenterDetails] = useState<IGymCenter | null>(
    null
  );
  const [isGymCenterLoading, setIsGymCenterLoading] = useState(true);
  const [isGymCenterLoadingErr, setIsGymCenterLoadingErr] = useState(false);
  console.log(gymCenterDetails);
  useEffect(() => {
    (async () => {
      try {
        setIsGymCenterLoading(true);
        setGymCenterDetails(null);
        setIsGymCenterLoadingErr(false);
        const gymCenterDetails = await api.get<IGymCenter>(
          MANAGEMENT_MANAGER_ENDPOINTS.GET_GYM_CENTER
        );
        if (!isEmpty(gymCenterDetails?.id)) {
          setGymCenterDetails(gymCenterDetails);
        }
      } catch {
        setIsGymCenterLoadingErr(true);
      } finally {
        setIsGymCenterLoading(false);
      }
    })();
  }, []);

  return (
    <GymCenterCtx
      value={{
        gymCenterDetails,
        isGymCenterLoading,
        isGymCenterLoadingErr,
        setGymCenterDetails,
      }}
    >
      {children}
    </GymCenterCtx>
  );
};

export default GymCenterProvider;

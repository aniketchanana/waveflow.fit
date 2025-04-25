import { useCallback, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_MANAGER_ENDPOINTS } from '@/common/apiEndpoints';
import useToast, { EToastType } from '@/components/Toast/useToast';

const useGetGymCenterMember = () => {
  const [isGymCenterMemberLoading, setIsGymCenterMemberLoading] =
    useState(false);
  const [isGymCenterMemberLoadingErr, setIsGymCenterMemberLoadingErr] =
    useState(false);
  const [gymCenterMember, setGymCenterMember] =
    useState<IGymCenterMember | null>(null);
  const { showToast } = useToast();

  const fetchGymCenterMember = useCallback(
    async (memberId) => {
      if (!memberId) return;
      try {
        setIsGymCenterMemberLoading(true);
        const gymCenterMember = await api.get(
          MANAGEMENT_MANAGER_ENDPOINTS.GYM_CENTER_MEMBERS_GET_UPDATE_DELETE(
            memberId
          )
        );
        if (gymCenterMember?.member) {
          setGymCenterMember(gymCenterMember.member);
        }
      } catch (e: any) {
        showToast({ severity: EToastType.ERROR, message: e.message });
        setIsGymCenterMemberLoadingErr(true);
      } finally {
        setIsGymCenterMemberLoading(false);
      }
    },
    [showToast]
  );

  return {
    gymCenterMember,
    setGymCenterMember,
    isGymCenterMemberLoading,
    isGymCenterMemberLoadingErr,
    fetchGymCenterMember,
  };
};

export default useGetGymCenterMember;

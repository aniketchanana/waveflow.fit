'use client';
import { createContext, useCallback, useEffect, useState } from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_TRAINEE_ENDPOINTS } from '@/common/apiEndpoints';
import { EInviteStatus, PAGINATION } from '@/common/constants';
import LS, { LSKeys } from '@/common/ls.utils';
import useToast, { EToastType } from '@/components/Toast/useToast';
import { useDynamicNormalizedList } from '@/hooks/useDynamicNormalizedList';

export const TraineeRelationshipCtx = createContext<{
  traineeInvites: string[];
  traineeInvitesById: Record<string, IInvite>;
  isTraineeInvitesLoading: boolean;
  updateTraineeInviteStatus: (id: string, updatedStatus: EInviteStatus) => void;

  associations: string[];
  associationsById: Record<string, IAssociation>;
  isAssociationsLoading: boolean;

  selectedAssociationId: string | null;
  setSelectedAssociationId: (id: string) => void;
}>({
  traineeInvites: [],
  traineeInvitesById: {},
  isTraineeInvitesLoading: false,
  updateTraineeInviteStatus: () => {
    throw new Error('Out of context');
  },

  associations: [],
  associationsById: {},
  isAssociationsLoading: false,

  selectedAssociationId: null,
  setSelectedAssociationId: () => {
    throw new Error('Out of context');
  },
});

const TraineeRelationship = ({ children }: { children: React.ReactNode }) => {
  const {
    setList: setTraineeInvites,
    allIds: traineeInvites,
    byId: traineeInvitesById,
    updateItem: updateTraineeInvite,
    isListLoading: isTraineeInvitesLoading,
    setIsListLoading: setIsTraineeInvitesLoading,
  } = useDynamicNormalizedList<IInvite>([]);
  const {
    setList: setAssociations,
    allIds: associations,
    byId: associationsById,
    isListLoading: isAssociationsLoading,
    setIsListLoading: setIsAssociationLoading,
  } = useDynamicNormalizedList<IAssociation>([]);

  const [reFetchAssociation, setRefetchAssociations] = useState(true);

  const { showToast } = useToast();

  const [selectedAssociationId, _setSelectedAssociationId] = useState<
    string | null
  >(null);

  const setSelectedAssociationId = useCallback((id: string) => {
    LS.setItem<string>(LSKeys.SELECTED_ASSOCIATION, id);
    _setSelectedAssociationId(id);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsTraineeInvitesLoading(true);
        const invites = await api.post<{ limit: number }, { data: IInvite[] }>(
          MANAGEMENT_TRAINEE_ENDPOINTS.GET_ALL_INVITES,
          {
            limit: PAGINATION.LARGE_LIMIT,
          }
        );
        setTraineeInvites(invites.data);
      } catch (e: any) {
        setTraineeInvites([]);
        showToast({ message: e.message, severity: EToastType.ERROR });
      } finally {
        setIsTraineeInvitesLoading(false);
      }
    })();
  }, [setIsTraineeInvitesLoading, setTraineeInvites, showToast]);

  useEffect(() => {
    if (!reFetchAssociation) return;
    (async () => {
      try {
        setIsAssociationLoading(true);
        const associations = await api.post<
          { limit: number },
          { data: IAssociation[] }
        >(MANAGEMENT_TRAINEE_ENDPOINTS.GET_ALL_ASSOCIATION, {
          limit: PAGINATION.LARGE_LIMIT,
        });
        setAssociations(associations.data);
      } catch (e: any) {
        setAssociations([]);
        showToast({ message: e.message, severity: EToastType.ERROR });
      } finally {
        setIsAssociationLoading(false);
        setRefetchAssociations(false);
      }
    })();
  }, [reFetchAssociation, setAssociations, setIsAssociationLoading, showToast]);

  useEffect(() => {
    if (associations.length <= 0) return;
    const selectFirstAssociation = () => {
      const firstAssociationId = associations[0];
      setSelectedAssociationId(firstAssociationId);
    };
    if (!LS.hasItem(LSKeys.SELECTED_ASSOCIATION)) {
      selectFirstAssociation();
    } else {
      const savedAssociationId = LS.getItem<string>(
        LSKeys.SELECTED_ASSOCIATION
      );
      if (savedAssociationId && associationsById[savedAssociationId]) {
        setSelectedAssociationId(savedAssociationId);
      } else {
        selectFirstAssociation();
      }
    }
  }, [associations, associationsById, setSelectedAssociationId]);

  const updateTraineeInviteStatus = useCallback(
    (id: string, updatedStatus: EInviteStatus) => {
      setRefetchAssociations(true);
      updateTraineeInvite(id, { invite_status: updatedStatus });
    },
    [updateTraineeInvite]
  );

  return (
    <TraineeRelationshipCtx
      value={{
        traineeInvites,
        traineeInvitesById,
        updateTraineeInviteStatus,
        isTraineeInvitesLoading,

        associations,
        associationsById,
        isAssociationsLoading,

        setSelectedAssociationId,
        selectedAssociationId,
      }}
    >
      {children}
    </TraineeRelationshipCtx>
  );
};

export default TraineeRelationship;

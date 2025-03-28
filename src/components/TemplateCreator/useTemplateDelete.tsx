import { useState } from 'react';

import { api } from '@/common/api.utils';
import { TEMPLATE_CREATOR_ENDPOINTS } from '@/common/apiEndpoints';
import useToast, { EToastType } from '@/components/Toast/useToast';

const useTemplateDelete = ({
  removeTemplate,
}: {
  removeTemplate: (templateId: string) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleDeleteTemplate = async (templateId: string) => {
    setIsDeleting(true);
    try {
      await api.delete(TEMPLATE_CREATOR_ENDPOINTS.DELETE_TEMPLATE(templateId));
      removeTemplate(templateId);
      showToast({
        message: 'Template deleted',
        severity: EToastType.SUCCESS,
      });
    } catch (error: any) {
      showToast({
        message: error.message,
        severity: EToastType.ERROR,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleDeleteTemplate };
};

export default useTemplateDelete;

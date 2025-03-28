'use client';

import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { JSX, useEffect, useState } from 'react';

import { api } from '@/common/api.utils';
import { TEMPLATE_CREATOR_ENDPOINTS } from '@/common/apiEndpoints';
import { ETemplateType, PAGINATION } from '@/common/constants';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import SearchByText from '@/components/Search/SearchByText';
import HStack from '@/components/StyledComponents/HStack';
import SectionContainer from '@/components/StyledComponents/SectionContainer';
import useToast, { EToastType } from '@/components/Toast/useToast';
import useDebounceInput from '@/hooks/useDebounceInput';

type Props = {
  listName: string;
  creator: ({
    appendNewTemplate,
    viewTemplate,
  }: {
    appendNewTemplate: (newTemplate: ITemplate) => void;
    viewTemplate: Record<string, any> | null;
  }) => JSX.Element;
  templateCard: ({
    template,
    removeTemplate,
    viewTemplate,
  }: {
    template: ITemplate;
    removeTemplate: (templateId: string) => void;
    viewTemplate: (templateId: string) => void;
  }) => JSX.Element;
  templateType: ETemplateType;
};

const TemplateList = ({
  listName,
  creator: Creator,
  templateCard: TemplateCard,
  templateType,
}: Props) => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Record<
    string,
    any
  > | null>(null);
  const { showToast } = useToast();
  const { searchText, setInputVal, inputVal } = useDebounceInput();
  const appendNewTemplate = (newTemplate: ITemplate) => {
    setTemplates([newTemplate, ...templates]);
  };
  const removeTemplate = (templateId: string) => {
    setTemplates(templates.filter((template) => template.id !== templateId));
  };
  const viewTemplate = (templateId: string) => {
    const template = templates.find((template) => template.id === templateId);
    setSelectedTemplate(template || null);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsFetchingTemplates(true);
        setIsError(false);
        const response = await api.post(
          TEMPLATE_CREATOR_ENDPOINTS.GET_ALL_TEMPLATES,
          {
            limit: PAGINATION.LARGE_LIMIT,
            filters: {
              ...(searchText ? { template_name: searchText } : {}),
              template_type: templateType,
            },
          }
        );
        setTemplates(response.data);
      } catch (e: any) {
        setIsError(true);
        showToast({
          message: e.message,
          severity: EToastType.ERROR,
        });
      } finally {
        setIsFetchingTemplates(false);
      }
    };
    fetchTemplates();
  }, [searchText, showToast, templateType]);

  return (
    <SectionContainer sx={{ py: 1 }}>
      <HStack justifyContent='space-between' pb={1}>
        <Typography variant='h3'>{listName}</Typography>
        <Box display='flex' gap={1}>
          <SearchByText
            placeholder='Template name'
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onClearIconClick={() => setInputVal('')}
          />
          <Creator
            appendNewTemplate={appendNewTemplate}
            viewTemplate={selectedTemplate}
          />
        </Box>
      </HStack>
      <DynamicRenderer
        isLoading={isFetchingTemplates}
        isError={isError}
        isNoResultFound={!isFetchingTemplates && templates.length === 0}
        height='92%'
      >
        <Grid
          container
          spacing={1}
          sx={{
            overflowY: 'auto',
            mx: '-0.75rem',
            px: '0.75rem',
            height: 'fit-content',
            maxHeight: '92%',
          }}
        >
          {templates.map((template) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              sx={{ height: 'fit-content' }}
              key={template.id}
            >
              <TemplateCard
                template={template}
                removeTemplate={removeTemplate}
                viewTemplate={viewTemplate}
              />
            </Grid>
          ))}
        </Grid>
      </DynamicRenderer>
    </SectionContainer>
  );
};

export default TemplateList;

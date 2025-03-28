import { ETemplateType } from '@/common/constants';
import DietCreator from '@/components/TemplateCreator/Diet/DietCreator';
import DietTemplateCard from '@/components/TemplateCreator/Diet/DietTemplateCard';
import TemplateList from '@/components/TemplateCreator/TemplateList';

const Diet = () => {
  return (
    <TemplateList
      listName='Diet'
      creator={DietCreator}
      templateCard={DietTemplateCard}
      templateType={ETemplateType.DIET}
    />
  );
};

export default Diet;

'use client';

import { v4 } from 'uuid';

import { EMealType, ETemplateType } from '@/common/constants';
import Creator from '@/components/TemplateCreator/Creator';
import DietItem, {
  TDietItem,
} from '@/components/TemplateCreator/Diet/DietItem';
import ItemList from '@/components/TemplateCreator/ItemList';

export type TDietPlan = {
  dietName: string;
  dietFoodItems: TDietItem[];
};
const dietCreatorPrefix = 'dietFoodItems';
export const getDietId = () => `dietFoodItems-${v4()}`;
const getBaseDiet = () => ({
  id: getDietId(),
  foodItemName: '',
  mealType: EMealType.BREAKFAST,
  isOptional: false,
});

const DietItemList = ({ defaultItems }: { defaultItems: TDietItem[] }) => {
  return (
    <ItemList<TDietItem>
      addNewBtnText='Add new diet item'
      defaultItems={defaultItems}
      getBaseItem={getBaseDiet}
      item={DietItem}
    />
  );
};

const DietCreator = ({
  appendNewTemplate,
  viewTemplate = null,
}: {
  appendNewTemplate: (newTemplate: ITemplate) => void;
  viewTemplate: Record<string, any> | null;
}) => {
  return (
    <Creator<TDietPlan, TDietItem>
      initState={{
        dietName: '',
        dietFoodItems: [],
      }}
      groupPrefix={dietCreatorPrefix}
      createNewBtnText='Create new diet'
      drawerHeader='Create diet'
      planNameKey='dietName'
      list={DietItemList}
      templateType={ETemplateType.DIET}
      appendNewTemplate={appendNewTemplate}
      viewTemplate={viewTemplate}
    />
  );
};

export default DietCreator;

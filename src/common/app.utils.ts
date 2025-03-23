import uniqueId from 'lodash/uniqueId';

import { PAGINATION } from '@/common/constants';

export const convertFormDataToJson = (formData: FormData) => {
  return formData.entries().reduce((prevVal, currVal) => {
    const [key, val] = currVal;
    prevVal[key] = val;
    return prevVal;
  }, {});
};

export const endpointWithQueryParams = ({
  url,
  queryParams,
  addDefaultPagination = undefined,
}: {
  url: string;
  queryParams: Record<string, any>;
  addDefaultPagination?: boolean;
}) => {
  const query = Object.entries({
    ...(addDefaultPagination
      ? { limit: PAGINATION.DEFAULT_LIMIT, page: PAGINATION.DEFAULT_PAGE_NUM }
      : {}),
    ...queryParams,
  }).reduce((prevVal, [key, val]) => {
    return `${prevVal}${prevVal ? '&' : ''}${key}=${val}`;
  }, '');
  return `${url}?${query}`;
};

export const endpointWithUrlParams = (
  url: string,
  queryParams: Record<string, string>
) => {
  return Object.entries(queryParams).reduce((prevVal, [key, val]) => {
    return url.replace(`:${key}`, val);
  }, url);
};

export const createNestedObject = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const keys = key.split('.');
    let current = result;

    keys.forEach((k, index) => {
      if (!current[k]) {
        current[k] = index === keys.length - 1 ? value : {};
      }
      current = current[k];
    });
  });

  return result;
};

export const groupByPrefix = (obj: Record<string, any>, prefix: string) => {
  const result: Record<string, any> = {};
  const grouped: Record<string, any>[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (key.startsWith(prefix)) {
      grouped.push(value);
    } else {
      result[key] = value;
    }
  });

  if (grouped.length) {
    result[prefix] = grouped;
  }

  return result;
};

export const replaceKeyValue = (
  obj: any,
  targetKey: string,
  targetValue: any,
  newValue: any
): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      replaceKeyValue(item, targetKey, targetValue, newValue)
    );
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        acc[key] =
          key === targetKey && value === targetValue
            ? newValue
            : replaceKeyValue(value, targetKey, targetValue, newValue);
        return acc;
      },
      {} as Record<string, any>
    );
  }
  return obj;
};

export const flattenNestedObject = (
  obj: Record<string, any>,
  groupKey?: string
): Record<string, any> => {
  const result: Record<string, any> = {};

  const recurse = (currObj: Record<string, any>, parent = ''): void => {
    Object.entries(currObj).forEach(([key, value]) => {
      const newKey = parent ? `${parent}.${key}` : key;

      if (groupKey && key === groupKey && Array.isArray(value)) {
        value.forEach((item) => recurse(item, uniqueId(`${groupKey}-`)));
      } else if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    });
  };

  recurse(obj);
  return result;
};

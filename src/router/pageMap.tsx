import { type FC, lazy } from 'react';

const pageMap: Record<string, FC> = {
  dynamicp1: lazy(() => import('@/pages/DynamicPage1')),
  dynamicp2: lazy(() => import('@/pages/DynamicPage2')),
  dynamicpsub: lazy(() => import('@/pages/DynamicSubpage'))
};

export default pageMap;

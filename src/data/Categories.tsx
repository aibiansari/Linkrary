import type { ReactNode } from 'react';
import {
  AllApps,
  AiTools,
  AudioTools,
  VideoTools,
  DesignTools,
  ImageUtils,
  Games,
  DesignInsp,
  WebDev,
  SVGs,
  Fonts,
  WebLibs,
  Converter,
  Downloads,
  UsefulSites,
  Streaming,
  PDF,
  Stock,
} from './Icons';
import { cards } from './Cards';

type CategoryCount = {
  [key: string]: number;
};

type CategoryDefinition = {
  name: string;
  icon: ReactNode;
};

type Category = CategoryDefinition & {
  count: number;
};

const categoryIcons: Record<string, () => JSX.Element> = {
  'All Apps': AllApps,
  'AI Tools': AiTools,
  'Audio Tools': AudioTools,
  'Video Tools': VideoTools,
  'Design Tools': DesignTools,
  'Image Utilities': ImageUtils,
  'Game Libraries': Games,
  'Design Inspiration': DesignInsp,
  'Web Development': WebDev,
  'SVG Icons': SVGs,
  'Font Resources': Fonts,
  'Web Libraries': WebLibs,
  'File Converters': Converter,
  'Archive Downloads': Downloads,
  'Useful Websites': UsefulSites,
  'Streaming Services': Streaming,
  'PDF Utilities': PDF,
  'Stock Images': Stock,
};

const categoryDetails: CategoryDefinition[] = Object.entries(categoryIcons).map(
  ([name, IconComponent]) => ({
    name,
    icon: <IconComponent />,
  }),
);

const countAllCategories = () => {
  const categoryCount: CategoryCount = categoryDetails.reduce(
    (acc, category) => ({
      ...acc,
      [category.name]: category.name === 'All Apps' ? cards.length : 0,
    }),
    {} as CategoryCount,
  );

  cards.forEach((card) => {
    card.categories.forEach((category) => {
      if (category in categoryCount) {
        categoryCount[category] += 1;
      }
    });
  });

  return categoryCount;
};

const categoryCounts = countAllCategories();

export const categories: Category[] = categoryDetails.map((category) => ({
  ...category,
  count: categoryCounts[category.name] || 0,
}));

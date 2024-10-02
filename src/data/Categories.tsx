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
  Torrent,
  UsefulSites,
  Streaming,
  PDF,
  Stock,
} from "./Icons";
import { cards } from "./Cards";

// Type for categoryCount
type CategoryCount = {
  [key: string]: number;
};

// Array of category names and their corresponding icons
const categoryDetails = [
  { name: "All Apps", icon: <AllApps /> },
  { name: "AI Tools", icon: <AiTools /> },
  { name: "Audio Tools", icon: <AudioTools /> },
  { name: "Video Tools", icon: <VideoTools /> },
  { name: "Design Tools", icon: <DesignTools /> },
  { name: "Image Utilities", icon: <ImageUtils /> },
  { name: "Game Libraries", icon: <Games /> },
  { name: "Design Inspiration", icon: <DesignInsp /> },
  { name: "Web Development", icon: <WebDev /> },
  { name: "SVG Icons", icon: <SVGs /> },
  { name: "Font Resources", icon: <Fonts /> },
  { name: "Web Libraries", icon: <WebLibs /> },
  { name: "File Converters", icon: <Converter /> },
  { name: "Torrent Resources", icon: <Torrent /> },
  { name: "Useful Websites", icon: <UsefulSites /> },
  { name: "Streaming Services", icon: <Streaming /> },
  { name: "Cracked Apps", icon: <Torrent /> },
  { name: "PDF Utilities", icon: <PDF /> },
  { name: "Stock Images", icon: <Stock /> },
];

// Function to count occurrences of all categories in cards
const countAllCategories = () => {
  const categoryCount: CategoryCount = categoryDetails.reduce(
    (acc, category) => ({
      ...acc,
      [category.name]: category.name === "All Apps" ? cards.length : 0,
    }),
    {}
  );

  // Increment category counts based on card categories
  cards.forEach((card) => {
    card.categories.forEach((category) => {
      if (category in categoryCount) {
        categoryCount[category] += 1;
      }
    });
  });

  return categoryCount;
};

// Get the counts for each category
const categoryCounts = countAllCategories();

// Build the categories array dynamically
export const categories = categoryDetails.map((category) => ({
  name: category.name,
  icon: category.icon,
  count: categoryCounts[category.name] || 0,
}));

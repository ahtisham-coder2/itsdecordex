/**
 * DecodeX Videos Dataset
 * Supports YouTube, TikTok, and local video references.
 * Demo content for illustration.
 */
const VIDEOS_DATA = [
  {
  id: "v1",
  title: "Redmi Note 10 Pro — Old but Gold!",
  platform: "tiktok",
  url: "https://www.tiktok.com/@itsdecordex/video/7666840995035647240?_r=1&_t=ZS-99pfHp9TWR3",
  thumbnail:"assets/images/video/redmi 10.png",
  category: "Mobile Reviews",
  date: "2026-07-26",
  description: "Redmi Note 10 Pro aaj bhi ek solid all-rounder phone hai — 128GB review."
},
  {
    id: "v2",
    title: "iPhone 16 Pro Max vs S24 Ultra",
    platform: "youtube",
    url: "https://youtube.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=700&fit=crop",
    category: "Comparisons",
    date: "2024-10-28",
    description: "Flagship showdown — display, camera, battery and daily use."
  },
  {
    id: "v3",
    title: "Best Budget Phones Under 60K PKR",
    platform: "tiktok",
    url: "https://www.tiktok.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=700&fit=crop",
    category: "Tech Tips",
    date: "2024-12-01",
    description: "Quick recommendations for value phones in Pakistan."
  },
  {
    id: "v4",
    title: "Xiaomi 14T Pro Unboxing",
    platform: "youtube",
    url: "https://youtube.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=700&fit=crop",
    category: "Mobile Reviews",
    date: "2024-10-05",
    description: "First look at Leica cameras and 120W charging."
  },
  {
    id: "v5",
    title: "How to Choose a Phone in 2025",
    platform: "tiktok",
    url: "https://www.tiktok.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=700&fit=crop",
    category: "Tech Tips",
    date: "2025-01-08",
    description: "Simple framework: budget, camera, battery, performance."
  },
  {
    id: "v6",
    title: "Pixel 9 Pro Camera Test",
    platform: "youtube",
    url: "https://youtube.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=700&fit=crop",
    category: "Mobile Reviews",
    date: "2024-09-15",
    description: "Night sight, Magic Editor and real-world samples."
  },
  {
    id: "v7",
    title: "Giveaway Announcement — Watch & Win",
    platform: "tiktok",
    url: "https://www.tiktok.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1601784551446-20c9e55cdb6c?w=400&h=700&fit=crop",
    category: "Giveaways",
    date: "2024-11-20",
    description: "Community giveaway details and entry rules."
  },
  {
    id: "v8",
    title: "realme GT 6 Gaming Benchmarks",
    platform: "youtube",
    url: "https://youtube.com/@itsdecordex",
    thumbnail: "https://images.unsplash.com/photo-1601784551446-20c9e55cdb6c?w=400&h=700&fit=crop",
    category: "Gaming",
    date: "2024-07-22",
    description: "Genshin, COD Mobile and thermals on Snapdragon 8s Gen 3."
  }
];

if (typeof window !== 'undefined') {
  window.VIDEOS_DATA = VIDEOS_DATA;
}

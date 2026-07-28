// ─── Destinations ────────────────────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  avgBudget: number;
  currency: string;
  bestTime: string;
  highlights: string[];
  tags: string[];
  trending: boolean;
  featured: boolean;
  lat: number;
  lng: number;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-1', name: 'Tokyo', country: 'Japan', continent: 'Asia',
    tagline: 'Where tradition meets innovation',
    description: 'Tokyo is a city that defies definition — a neon-lit cyberpunk dreamscape that coexists with ancient shrines, world-class cuisine, and zen gardens. There is no city quite like it on earth.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    rating: 4.9, reviewCount: 12847, avgBudget: 2500, currency: 'USD',
    bestTime: 'March–May, Sept–Nov', highlights: ['Senso-ji Temple', 'Shibuya Crossing', 'teamLab Borderless', 'Tsukiji Market', 'Mount Fuji Day Trip'],
    tags: ['Culture', 'Food', 'Technology', 'Anime', 'Nature'], trending: true, featured: true, lat: 35.6762, lng: 139.6503,
  },
  {
    id: 'dest-2', name: 'Bali', country: 'Indonesia', continent: 'Asia',
    tagline: 'Island of the Gods',
    description: 'Bali is a living postcard — lush rice terraces, Hindu temples, surf breaks, and some of the most hospitable people on the planet. Perfect for the soul-seeking traveler.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    rating: 4.8, reviewCount: 9234, avgBudget: 1200, currency: 'USD',
    bestTime: 'April–October', highlights: ['Tanah Lot Temple', 'Ubud Monkey Forest', 'Tegallalang Rice Terraces', 'Seminyak Beach', 'Mount Batur'],
    tags: ['Beach', 'Spiritual', 'Nature', 'Wellness', 'Surf'], trending: true, featured: true, lat: -8.3405, lng: 115.0920,
  },
  {
    id: 'dest-3', name: 'Paris', country: 'France', continent: 'Europe',
    tagline: 'The City of Light',
    description: 'Paris seduces every visitor with its café culture, haute cuisine, world-class art, and impossibly romantic boulevards. A city that never stops inspiring.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    rating: 4.8, reviewCount: 18932, avgBudget: 3200, currency: 'USD',
    bestTime: 'April–June, Sept–Oct', highlights: ['Eiffel Tower', 'The Louvre', 'Montmartre', 'Palace of Versailles', 'Seine River Cruise'],
    tags: ['Art', 'Food', 'Romance', 'Fashion', 'History'], trending: true, featured: true, lat: 48.8566, lng: 2.3522,
  },
  {
    id: 'dest-4', name: 'New York City', country: 'USA', continent: 'North America',
    tagline: 'The city that never sleeps',
    description: 'New York is a city of neighborhoods, each with its own distinct personality. From the heights of the Empire State to the depths of the subway, every corner tells a story.',
    image: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=800&q=80',
    rating: 4.7, reviewCount: 22140, avgBudget: 3800, currency: 'USD',
    bestTime: 'April–June, Sept–Nov', highlights: ['Central Park', 'Times Square', 'Brooklyn Bridge', 'Metropolitan Museum', 'High Line'],
    tags: ['Urban', 'Food', 'Art', 'Nightlife', 'Shopping'], trending: false, featured: true, lat: 40.7128, lng: -74.0060,
  },
  {
    id: 'dest-5', name: 'Rome', country: 'Italy', continent: 'Europe',
    tagline: 'The Eternal City',
    description: 'Rome is an open-air museum where ancient ruins rub shoulders with Baroque fountains and world-class pasta. History is literally beneath your feet.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    rating: 4.8, reviewCount: 14521, avgBudget: 2800, currency: 'USD',
    bestTime: 'April–June, Sept–Oct', highlights: ['Colosseum', 'Vatican Museums', 'Trevi Fountain', 'Roman Forum', 'Trastevere'],
    tags: ['History', 'Food', 'Art', 'Architecture', 'Romance'], trending: true, featured: false, lat: 41.9028, lng: 12.4964,
  },
  {
    id: 'dest-6', name: 'Santorini', country: 'Greece', continent: 'Europe',
    tagline: 'Sunsets that stop time',
    description: 'Santorini is a crescent-shaped volcanic island with whitewashed villages cascading down cliffs above the azure Aegean Sea. It is as breathtaking in person as in photos.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    rating: 4.9, reviewCount: 8763, avgBudget: 4200, currency: 'USD',
    bestTime: 'May–October', highlights: ['Oia Sunset', 'Fira', 'Red Beach', 'Akrotiri Ruins', 'Wine Tasting'],
    tags: ['Romance', 'Beach', 'Luxury', 'Photography', 'Wine'], trending: true, featured: true, lat: 36.3932, lng: 25.4615,
  },
  {
    id: 'dest-7', name: 'Kyoto', country: 'Japan', continent: 'Asia',
    tagline: 'Ancient temples and bamboo groves',
    description: 'Kyoto was Japan\'s imperial capital for over a millennium and remains its cultural heart. Thousands of temples, geisha districts, and the iconic Arashiyama bamboo forest await.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    rating: 4.9, reviewCount: 11204, avgBudget: 2200, currency: 'USD',
    bestTime: 'March–May, Oct–Nov', highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji', 'Gion District', 'Nishiki Market'],
    tags: ['Culture', 'Nature', 'Spiritual', 'History', 'Food'], trending: false, featured: true, lat: 35.0116, lng: 135.7681,
  },
  {
    id: 'dest-8', name: 'Cape Town', country: 'South Africa', continent: 'Africa',
    tagline: 'Where mountains meet the ocean',
    description: 'Cape Town is a city of staggering natural beauty — Table Mountain, two oceans, award-winning wine country, vibrant culture, and a complex, fascinating history.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    rating: 4.7, reviewCount: 7839, avgBudget: 1800, currency: 'USD',
    bestTime: 'November–April', highlights: ['Table Mountain', 'Cape Point', 'V&A Waterfront', 'Boulders Beach Penguins', 'Winelands'],
    tags: ['Nature', 'Adventure', 'Beach', 'Wildlife', 'Culture'], trending: true, featured: false, lat: -33.9249, lng: 18.4241,
  },
  {
    id: 'dest-9', name: 'Mumbai', country: 'India', continent: 'Asia',
    tagline: 'The City of Dreams',
    description: 'Mumbai is the financial heartbeat of India, a bustling metropolis of grand colonial architecture, Bollywood glamour, iconic street food, and historic sea fortresses.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    rating: 4.8, reviewCount: 15420, avgBudget: 45000, currency: 'INR',
    bestTime: 'October–March', highlights: ['Gateway of India', 'Marine Drive Sunset', 'Elephanta Caves', 'Colaba Causeway', 'Bandra Fort'],
    tags: ['Culture', 'Food', 'Urban', 'History', 'Bollywood'], trending: true, featured: true, lat: 18.9220, lng: 72.8347,
  },
  {
    id: 'dest-10', name: 'Jaipur', country: 'India', continent: 'Asia',
    tagline: 'The Pink City of Maharajas',
    description: 'Jaipur is a fairytale city of pink terracotta palaces, hilltop fortresses, bustling bazaars, and royal heritage. An unforgettable dive into royal Indian history.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    rating: 4.9, reviewCount: 11840, avgBudget: 35000, currency: 'INR',
    bestTime: 'October–March', highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jal Mahal Sunset', 'Johari Bazaar'],
    tags: ['History', 'Culture', 'Architecture', 'Royalty', 'Shopping'], trending: true, featured: true, lat: 26.9124, lng: 75.7873,
  },
  {
    id: 'dest-11', name: 'Goa', country: 'India', continent: 'Asia',
    tagline: 'Sun, Sand, and Portuguese Heritage',
    description: 'Goa is India\'s coastal paradise — golden beaches, palm-fringed shores, vibrant night markets, Portuguese churches, and relaxed tropical vibes.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    rating: 4.8, reviewCount: 16900, avgBudget: 30000, currency: 'INR',
    bestTime: 'November–February', highlights: ['Baga Beach', 'Dudhsagar Waterfalls', 'Fontainhas Latin Quarter', 'Anjuna Flea Market', 'Sunset Cruise'],
    tags: ['Beach', 'Nightlife', 'Culture', 'Relaxation', 'Food'], trending: true, featured: true, lat: 15.2993, lng: 74.1240,
  },
  {
    id: 'dest-12', name: 'Kerala', country: 'India', continent: 'Asia',
    tagline: 'God\'s Own Country',
    description: 'Kerala is a serene tropical sanctuary of emerald backwaters, misty tea plantations, Ayurvedic wellness, and pristine coconut-fringed beaches.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    rating: 4.9, reviewCount: 13210, avgBudget: 40000, currency: 'INR',
    bestTime: 'September–March', highlights: ['Alleppey Houseboat Cruise', 'Munnar Tea Estates', 'Fort Kochi Heritage', 'Periyar Wildlife Sanctuary', 'Varkala Cliff Beach'],
    tags: ['Nature', 'Wellness', 'Backwaters', 'Relaxation', 'Culture'], trending: true, featured: true, lat: 9.9312, lng: 76.2673,
  },
];

// ─── Saved / Historical Trips ─────────────────────────────────────────────────

export interface SavedTrip {
  id: string;
  destination: string;
  country: string;
  image: string;
  startDate: string;
  endDate: string;
  duration: number;
  budget: number;
  spent: number;
  currency: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  activities: number;
  savedAt: string;
  tags: string[];
}

export const SAVED_TRIPS: SavedTrip[] = [
  {
    id: 'trip-1', destination: 'Tokyo', country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
    startDate: '2025-03-10', endDate: '2025-03-17', duration: 7,
    budget: 2500, spent: 2140, currency: 'USD',
    status: 'upcoming', activities: 18, savedAt: '2025-01-20',
    tags: ['Culture', 'Food'],
  },
  {
    id: 'trip-2', destination: 'Bali', country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80',
    startDate: '2024-11-01', endDate: '2024-11-10', duration: 10,
    budget: 1500, spent: 1380, currency: 'USD',
    status: 'completed', activities: 22, savedAt: '2024-09-05',
    tags: ['Beach', 'Wellness'],
  },
  {
    id: 'trip-3', destination: 'Paris', country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
    startDate: '2024-06-15', endDate: '2024-06-22', duration: 7,
    budget: 3200, spent: 3050, currency: 'USD',
    status: 'completed', activities: 14, savedAt: '2024-04-10',
    tags: ['Art', 'Romance'],
  },
  {
    id: 'trip-4', destination: 'Santorini', country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
    startDate: '2025-08-01', endDate: '2025-08-08', duration: 7,
    budget: 4000, spent: 0, currency: 'USD',
    status: 'upcoming', activities: 12, savedAt: '2025-02-01',
    tags: ['Romance', 'Beach'],
  },
];

// ─── Hotels ────────────────────────────────────────────────────────────────────

export interface Hotel {
  id: string;
  name: string;
  destination: string;
  image: string;
  rating: number;
  stars: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  reviewCount: number;
  tags: string[];
}

export const HOTELS: Hotel[] = [
  {
    id: 'hotel-1', name: 'Park Hyatt Tokyo', destination: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    rating: 4.9, stars: 5, pricePerNight: 420, currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Concierge'],
    reviewCount: 2841, tags: ['Luxury', 'City View', 'Business'],
  },
  {
    id: 'hotel-2', name: 'Como Uma Ubud', destination: 'Bali',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    rating: 4.8, stars: 5, pricePerNight: 280, currency: 'USD',
    amenities: ['Infinity Pool', 'Spa', 'Yoga', 'Restaurant', 'Shuttle'],
    reviewCount: 1203, tags: ['Luxury', 'Nature', 'Wellness'],
  },
  {
    id: 'hotel-3', name: 'Hotel du Louvre', destination: 'Paris',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    rating: 4.6, stars: 4, pricePerNight: 310, currency: 'USD',
    amenities: ['Restaurant', 'Bar', 'Concierge', 'Room Service'],
    reviewCount: 4120, tags: ['Historic', 'Central', 'Art'],
  },
  {
    id: 'hotel-4', name: 'Katikies Santorini', destination: 'Santorini',
    image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=600&q=80',
    rating: 4.9, stars: 5, pricePerNight: 580, currency: 'USD',
    amenities: ['Infinity Pool', 'Spa', 'Caldera View', 'Breakfast', 'Bar'],
    reviewCount: 892, tags: ['Luxury', 'Romantic', 'View'],
  },
  {
    id: 'hotel-5', name: 'Ace Hotel New York', destination: 'New York City',
    image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=600&q=80',
    rating: 4.5, stars: 4, pricePerNight: 265, currency: 'USD',
    amenities: ['Restaurant', 'Bar', 'Co-Working', 'Rooftop'],
    reviewCount: 6782, tags: ['Trendy', 'Central', 'Design'],
  },
  {
    id: 'hotel-6', name: 'Amanemu Resort', destination: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80',
    rating: 5.0, stars: 5, pricePerNight: 850, currency: 'USD',
    amenities: ['Onsen', 'Spa', 'Restaurant', 'Garden', 'Concierge'],
    reviewCount: 421, tags: ['Ultra-Luxury', 'Wellness', 'Traditional'],
  },
  {
    id: 'hotel-7', name: 'Taj Mahal Palace', destination: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
    rating: 4.9, stars: 5, pricePerNight: 28000, currency: 'INR',
    amenities: ['Harbor View', 'Pool', 'Jiva Spa', 'Fine Dining', 'Concierge'],
    reviewCount: 4520, tags: ['Heritage', 'Luxury', 'Iconic'],
  },
  {
    id: 'hotel-8', name: 'The Leela Palace', destination: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    rating: 4.9, stars: 5, pricePerNight: 22000, currency: 'INR',
    amenities: ['Private Pool', 'Royal Spa', 'Peacock Garden', 'Palace Dining'],
    reviewCount: 2940, tags: ['Palace', 'Royalty', 'Heritage'],
  },
  {
    id: 'hotel-9', name: 'Alila Diwa Resort', destination: 'Goa',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    rating: 4.8, stars: 5, pricePerNight: 16000, currency: 'INR',
    amenities: ['Infinity Pool', 'Spa', 'Beach Shuttle', 'Garden Bar'],
    reviewCount: 3120, tags: ['Resort', 'Beach', 'Wellness'],
  },
  {
    id: 'hotel-10', name: 'Kumarakom Lake Resort', destination: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    rating: 4.9, stars: 5, pricePerNight: 24000, currency: 'INR',
    amenities: ['Backwater Villa', 'Ayurvedic Spa', 'Houseboat Dining', 'Pool'],
    reviewCount: 1890, tags: ['Nature', 'Backwaters', 'Heritage'],
  },
];

// ─── Restaurants ──────────────────────────────────────────────────────────────

export interface Restaurant {
  id: string;
  name: string;
  destination: string;
  image: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewCount: number;
  mustTry: string[];
  tags: string[];
  openNow: boolean;
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1', name: 'Sukiyabashi Jiro', destination: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
    cuisine: 'Sushi', priceRange: '$$$$', rating: 4.9, reviewCount: 892,
    mustTry: ['Omakase Set', 'Aged Tuna', 'Sea Urchin Nigiri'],
    tags: ['Fine Dining', 'Sushi', 'Michelin'], openNow: false,
  },
  {
    id: 'rest-2', name: 'Locavore', destination: 'Bali',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    cuisine: 'Modern Indonesian', priceRange: '$$$', rating: 4.8, reviewCount: 2134,
    mustTry: ['Pig Ear Crackers', 'Corn Pudding', 'Duck Confit'],
    tags: ['Farm-to-Table', 'Creative', 'Michelin'], openNow: true,
  },
  {
    id: 'rest-3', name: 'Le Jules Verne', destination: 'Paris',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80',
    cuisine: 'French', priceRange: '$$$$', rating: 4.7, reviewCount: 3421,
    mustTry: ['Foie Gras', 'Duck Confit', 'Crêpe Suzette'],
    tags: ['Fine Dining', 'Eiffel View', 'Romantic'], openNow: true,
  },
  {
    id: 'rest-4', name: 'Il Buco', destination: 'New York City',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&q=80',
    cuisine: 'Italian', priceRange: '$$$', rating: 4.6, reviewCount: 5871,
    mustTry: ['Truffle Pasta', 'Burrata', 'Branzino'],
    tags: ['Italian', 'Romantic', 'Wine Bar'], openNow: true,
  },
  {
    id: 'rest-5', name: 'Cacio e Pepe', destination: 'Rome',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    cuisine: 'Roman', priceRange: '$$', rating: 4.9, reviewCount: 7234,
    mustTry: ['Cacio e Pepe Pasta', 'Carbonara', 'Tiramisu'],
    tags: ['Local', 'Authentic', 'Classic'], openNow: true,
  },
  {
    id: 'rest-6', name: 'Khyber', destination: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    cuisine: 'North Indian & Mughlai', priceRange: '$$$', rating: 4.8, reviewCount: 4210,
    mustTry: ['Butter Chicken', 'Tandoori Raan', 'Dal Makhani', 'Garlic Naan'],
    tags: ['North Indian', 'Heritage', 'Mughlai'], openNow: true,
  },
  {
    id: 'rest-7', name: '1135 AD', destination: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    cuisine: 'Royal Rajasthani', priceRange: '$$$$', rating: 4.9, reviewCount: 2980,
    mustTry: ['Laal Maas', 'Dal Baati Churma', 'Royal Thali'],
    tags: ['Palace Dining', 'Royal', 'Authentic'], openNow: true,
  },
  {
    id: 'rest-8', name: 'The Fisherman\'s Wharf', destination: 'Goa',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80',
    cuisine: 'Goan Seafood', priceRange: '$$', rating: 4.7, reviewCount: 5120,
    mustTry: ['Goan Fish Curry', 'Prawn Balchão', 'Kingfish Rava Fry'],
    tags: ['Seafood', 'Riverside', 'Live Music'], openNow: true,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 't1', name: 'Sarah Chen', location: 'San Francisco, CA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    text: 'Roamly planned my entire 10-day Japan trip in under 2 minutes. The itinerary was better than anything I could have created manually. Every recommendation was spot-on.',
    destination: 'Tokyo & Kyoto',
  },
  {
    id: 't2', name: 'Marcus Williams', location: 'London, UK',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 5,
    text: 'The AI understood exactly what kind of traveler I am. Budget-conscious, off-the-beaten-path adventures, amazing food. Bali was unforgettable.',
    destination: 'Bali, Indonesia',
  },
  {
    id: 't3', name: 'Priya Patel', location: 'Toronto, Canada',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    rating: 5,
    text: 'I was skeptical of AI travel planning but Roamly completely changed my mind. The budget tracker alone saved me from overspending. Will never plan a trip another way.',
    destination: 'Paris, France',
  },
  {
    id: 't4', name: 'Kenji Tanaka', location: 'Sydney, Australia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji',
    rating: 5,
    text: 'The hidden gems section is pure gold. Found a tiny restaurant in Rome that became the highlight of my trip. No other app gives you this level of local knowledge.',
    destination: 'Rome, Italy',
  },
];

// ─── Admin Analytics Mock ─────────────────────────────────────────────────────

export const ADMIN_STATS = {
  totalUsers: 24891,
  activeThisMonth: 8742,
  tripsGenerated: 147263,
  aiCallsToday: 3847,
  avgTripBudget: 2340,
  topDestination: 'Tokyo',
  conversionRate: 73.4,
  avgSessionMinutes: 12.8,
};

export const USER_GROWTH = [
  { month: 'Jul', users: 12400 }, { month: 'Aug', users: 14200 },
  { month: 'Sep', users: 15800 }, { month: 'Oct', users: 17900 },
  { month: 'Nov', users: 20100 }, { month: 'Dec', users: 22400 },
  { month: 'Jan', users: 24891 },
];

export const AI_USAGE = [
  { month: 'Jul', calls: 18200, tokens: 4820000 },
  { month: 'Aug', calls: 21400, tokens: 5630000 },
  { month: 'Sep', calls: 24800, tokens: 6540000 },
  { month: 'Oct', calls: 29100, tokens: 7680000 },
  { month: 'Nov', calls: 33400, tokens: 8810000 },
  { month: 'Dec', calls: 38200, tokens: 10070000 },
  { month: 'Jan', calls: 42900, tokens: 11310000 },
];

export const FEEDBACK_ITEMS = [
  { id: 'f1', user: 'sarah.chen@email.com', rating: 5, message: 'Absolutely love Roamly! The AI is incredible.', destination: 'Tokyo', date: '2025-01-28', status: 'reviewed' },
  { id: 'f2', user: 'marcos.r@email.com', rating: 4, message: 'Great app, would love more restaurant filters.', destination: 'Barcelona', date: '2025-01-27', status: 'pending' },
  { id: 'f3', user: 'priya.p@email.com', rating: 5, message: 'Budget tracker is a game changer!', destination: 'Paris', date: '2025-01-26', status: 'reviewed' },
  { id: 'f4', user: 'tom.w@email.com', rating: 3, message: 'AI sometimes generates duplicate activities.', destination: 'London', date: '2025-01-25', status: 'pending' },
  { id: 'f5', user: 'anna.k@email.com', rating: 5, message: 'Planned my honeymoon trip perfectly!', destination: 'Santorini', date: '2025-01-24', status: 'reviewed' },
  { id: 'f6', user: 'jake.m@email.com', rating: 4, message: 'Would love offline access for itineraries.', destination: 'Bali', date: '2025-01-23', status: 'pending' },
];

export interface WeatherReport {
  current: {
    temp: number;
    feels: number;
    condition: string;
    humidity: number;
    wind: number;
    icon: string;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    icon: string;
    condition: string;
  }>;
}

export const WEATHER_DATA: Record<string, WeatherReport> = {
  Tokyo: {
    current: { temp: 8, feels: 5, condition: 'Partly Cloudy', humidity: 62, wind: 14, icon: '⛅' },
    forecast: [
      { day: 'Mon', high: 9, low: 3, icon: '☁️', condition: 'Cloudy' },
      { day: 'Tue', high: 11, low: 4, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Wed', high: 13, low: 6, icon: '☀️', condition: 'Sunny' },
      { day: 'Thu', high: 10, low: 5, icon: '🌦', condition: 'Showers' },
      { day: 'Fri', high: 8, low: 2, icon: '❄️', condition: 'Snow' },
      { day: 'Sat', high: 7, low: 1, icon: '❄️', condition: 'Snow Flurries' },
      { day: 'Sun', high: 10, low: 3, icon: '⛅', condition: 'Partly Cloudy' },
    ],
  },
  Bali: {
    current: { temp: 29, feels: 33, condition: 'Tropical Thunderstorm', humidity: 85, wind: 18, icon: '⛈' },
    forecast: [
      { day: 'Mon', high: 30, low: 24, icon: '⛈', condition: 'Thunderstorm' },
      { day: 'Tue', high: 31, low: 25, icon: '🌧', condition: 'Heavy Rain' },
      { day: 'Wed', high: 32, low: 26, icon: '⛅', condition: 'Partly Cloudy' },
      { day: 'Thu', high: 33, low: 27, icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', high: 33, low: 26, icon: '☀️', condition: 'Sunny' },
      { day: 'Sat', high: 31, low: 25, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Sun', high: 30, low: 25, icon: '🌦', condition: 'Showers' },
    ],
  },
  Paris: {
    current: { temp: 16, feels: 15, condition: 'Mild & Sunny', humidity: 55, wind: 12, icon: '🌤' },
    forecast: [
      { day: 'Mon', high: 17, low: 9, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Tue', high: 18, low: 10, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Wed', high: 15, low: 8, icon: '🌦', condition: 'Light Rain' },
      { day: 'Thu', high: 16, low: 9, icon: '⛅', condition: 'Overcast' },
      { day: 'Fri', high: 19, low: 11, icon: '☀️', condition: 'Sunny' },
      { day: 'Sat', high: 20, low: 12, icon: '🌤', condition: 'Warm & Breezy' },
      { day: 'Sun', high: 18, low: 10, icon: '☀️', condition: 'Sunny' },
    ],
  },
  'New York City': {
    current: { temp: 22, feels: 22, condition: 'Clear Sky', humidity: 48, wind: 10, icon: '☀️' },
    forecast: [
      { day: 'Mon', high: 23, low: 14, icon: '☀️', condition: 'Sunny' },
      { day: 'Tue', high: 24, low: 16, icon: '☀️', condition: 'Clear' },
      { day: 'Wed', high: 21, low: 13, icon: '🌦', condition: 'Scattered Showers' },
      { day: 'Thu', high: 22, low: 14, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Fri', high: 25, low: 17, icon: '☀️', condition: 'Warm' },
      { day: 'Sat', high: 26, low: 18, icon: '☀️', condition: 'Sunny' },
      { day: 'Sun', high: 23, low: 15, icon: '⛅', condition: 'Partly Cloudy' },
    ],
  },
  Rome: {
    current: { temp: 24, feels: 25, condition: 'Sunny & Pleasant', humidity: 50, wind: 9, icon: '☀️' },
    forecast: [
      { day: 'Mon', high: 25, low: 16, icon: '☀️', condition: 'Sunny' },
      { day: 'Tue', high: 26, low: 17, icon: '☀️', condition: 'Clear' },
      { day: 'Wed', high: 27, low: 18, icon: '☀️', condition: 'Hot & Sunny' },
      { day: 'Thu', high: 24, low: 15, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Fri', high: 25, low: 16, icon: '☀️', condition: 'Sunny' },
      { day: 'Sat', high: 26, low: 17, icon: '☀️', condition: 'Sunny' },
      { day: 'Sun', high: 24, low: 15, icon: '🌤', condition: 'Pleasant' },
    ],
  },
  Santorini: {
    current: { temp: 26, feels: 27, condition: 'Breezy & Sunny', humidity: 60, wind: 22, icon: '☀️' },
    forecast: [
      { day: 'Mon', high: 27, low: 20, icon: '☀️', condition: 'Sunny' },
      { day: 'Tue', high: 28, low: 21, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Wed', high: 27, low: 20, icon: '🌤', condition: 'Sea Breeze' },
      { day: 'Thu', high: 26, low: 19, icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', high: 28, low: 21, icon: '☀️', condition: 'Warm & Sunny' },
      { day: 'Sat', high: 29, low: 22, icon: '☀️', condition: 'Sunny' },
      { day: 'Sun', high: 27, low: 20, icon: '☀️', condition: 'Clear Sky' },
    ],
  },
  Kyoto: {
    current: { temp: 14, feels: 13, condition: 'Partly Sunny', humidity: 58, wind: 11, icon: '🌤' },
    forecast: [
      { day: 'Mon', high: 15, low: 7, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Tue', high: 16, low: 8, icon: '☀️', condition: 'Sunny' },
      { day: 'Wed', high: 13, low: 6, icon: '🌧', condition: 'Light Rain' },
      { day: 'Thu', high: 14, low: 7, icon: '⛅', condition: 'Overcast' },
      { day: 'Fri', high: 17, low: 9, icon: '☀️', condition: 'Sunny' },
      { day: 'Sat', high: 18, low: 10, icon: '🌤', condition: 'Pleasant' },
      { day: 'Sun', high: 15, low: 7, icon: '⛅', condition: 'Partly Cloudy' },
    ],
  },
  CapeTown: {
    current: { temp: 21, feels: 20, condition: 'Coastal Breeze', humidity: 65, wind: 24, icon: '🌤' },
    forecast: [
      { day: 'Mon', high: 22, low: 14, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Tue', high: 23, low: 15, icon: '☀️', condition: 'Sunny' },
      { day: 'Wed', high: 20, low: 13, icon: '🌬', condition: 'Windy' },
      { day: 'Thu', high: 21, low: 14, icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', high: 24, low: 16, icon: '☀️', condition: 'Warm' },
      { day: 'Sat', high: 25, low: 17, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Sun', high: 22, low: 14, icon: '🌤', condition: 'Breezy' },
    ],
  },
  Mumbai: {
    current: { temp: 31, feels: 35, condition: 'Warm & Coastal Humid', humidity: 78, wind: 15, icon: '🌤' },
    forecast: [
      { day: 'Mon', high: 32, low: 25, icon: '☀️', condition: 'Sunny & Warm' },
      { day: 'Tue', high: 33, low: 26, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Wed', high: 31, low: 24, icon: '⛅', condition: 'Partly Hazy' },
      { day: 'Thu', high: 32, low: 25, icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', high: 33, low: 26, icon: '☀️', condition: 'Warm Breeze' },
      { day: 'Sat', high: 34, low: 27, icon: '☀️', condition: 'Clear' },
      { day: 'Sun', high: 32, low: 25, icon: '🌤', condition: 'Partly Sunny' },
    ],
  },
  Jaipur: {
    current: { temp: 28, feels: 29, condition: 'Sunny & Dry', humidity: 35, wind: 11, icon: '☀️' },
    forecast: [
      { day: 'Mon', high: 29, low: 17, icon: '☀️', condition: 'Bright & Clear' },
      { day: 'Tue', high: 30, low: 18, icon: '☀️', condition: 'Sunny' },
      { day: 'Wed', high: 28, low: 16, icon: '🌤', condition: 'Pleasant' },
      { day: 'Thu', high: 29, low: 17, icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', high: 31, low: 19, icon: '☀️', condition: 'Warm' },
      { day: 'Sat', high: 30, low: 18, icon: '☀️', condition: 'Sunny' },
      { day: 'Sun', high: 28, low: 16, icon: '🌤', condition: 'Mild' },
    ],
  },
  Goa: {
    current: { temp: 30, feels: 34, condition: 'Tropical Beach Breeze', humidity: 75, wind: 14, icon: '🌤' },
    forecast: [
      { day: 'Mon', high: 31, low: 24, icon: '☀️', condition: 'Sunny Coast' },
      { day: 'Tue', high: 32, low: 25, icon: '☀️', condition: 'Warm & Clear' },
      { day: 'Wed', high: 30, low: 23, icon: '🌦', condition: 'Coastal Shower' },
      { day: 'Thu', high: 31, low: 24, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Fri', high: 32, low: 25, icon: '☀️', condition: 'Sunny' },
      { day: 'Sat', high: 33, low: 26, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Sun', high: 31, low: 24, icon: '☀️', condition: 'Breezy Beach' },
    ],
  },
  Kerala: {
    current: { temp: 29, feels: 32, condition: 'Tropical Backwater Breeze', humidity: 80, wind: 12, icon: '🌤' },
    forecast: [
      { day: 'Mon', high: 30, low: 23, icon: '🌤', condition: 'Partly Sunny' },
      { day: 'Tue', high: 31, low: 24, icon: '☀️', condition: 'Warm & Sunny' },
      { day: 'Wed', high: 29, low: 22, icon: '🌦', condition: 'Gentle Rain' },
      { day: 'Thu', high: 30, low: 23, icon: '⛅', condition: 'Overcast Backwaters' },
      { day: 'Fri', high: 31, low: 24, icon: '☀️', condition: 'Sunny' },
      { day: 'Sat', high: 32, low: 25, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Sun', high: 30, low: 23, icon: '🌤', condition: 'Mild Tropical' },
    ],
  },
  'New Delhi': {
    current: { temp: 26, feels: 27, condition: 'Sunny & Clear', humidity: 45, wind: 10, icon: '☀️' },
    forecast: [
      { day: 'Mon', high: 27, low: 15, icon: '☀️', condition: 'Sunny' },
      { day: 'Tue', high: 28, low: 16, icon: '☀️', condition: 'Clear Sky' },
      { day: 'Wed', high: 26, low: 14, icon: '🌤', condition: 'Mild' },
      { day: 'Thu', high: 27, low: 15, icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', high: 29, low: 17, icon: '☀️', condition: 'Warm' },
      { day: 'Sat', high: 28, low: 16, icon: '☀️', condition: 'Clear' },
      { day: 'Sun', high: 26, low: 14, icon: '🌤', condition: 'Pleasant' },
    ],
  },
};


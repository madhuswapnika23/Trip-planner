import { fetchWithTimeout } from './client';
import { parseAndValidateItinerary } from '@/schema/validators';
import { buildItineraryPrompt } from '@/constants/prompts';
import type { Itinerary } from '@/types/itinerary';
import type { TripFormValues, AppError } from '@/types/ui';

// ─── Destination Activity Databases for Authentic Fallbacks ─────────────────

interface ActivityTemplate {
  name: string;
  description: string;
  location: string;
  category: 'culture' | 'food' | 'nature' | 'shopping' | 'nightlife' | 'relaxation';
  cost_tier: 'free' | 'budget' | 'moderate' | 'splurge';
  cost_factor: number; // multiplier against daily budget
  energy_level: 'low' | 'medium' | 'high';
  pro_tip: string;
}

const DESTINATION_ACTIVITIES: Record<string, ActivityTemplate[]> = {
  paris: [
    { name: 'Eiffel Tower & Champ de Mars', description: 'Marvel at Paris’s iconic landmark and enjoy panoramic views over the Seine.', location: 'Champ de Mars, Paris', category: 'culture', cost_tier: 'moderate', cost_factor: 0.15, energy_level: 'medium', pro_tip: 'Book Summit tickets 60 days in advance to skip the line.' },
    { name: 'The Louvre Museum Masterpieces', description: 'Explore Mona Lisa, Venus de Milo, and world-class art collections.', location: 'Rue de Rivoli, Paris', category: 'culture', cost_tier: 'moderate', cost_factor: 0.12, energy_level: 'high', pro_tip: 'Enter via the Porte des Lions entrance for shorter queues.' },
    { name: 'Le Marais Gourmet Food Walking Tour', description: 'Taste fresh croissants, artisanal cheeses, charcuterie, and macarons.', location: 'Le Marais, Paris', category: 'food', cost_tier: 'moderate', cost_factor: 0.2, energy_level: 'medium', pro_tip: 'Save room for warm falafel from L’As du Fallafel.' },
    { name: 'Sunset Cruise on the Seine River', description: 'Glide past illuminated monuments like Notre-Dame and Musée d’Orsay.', location: 'Pont Neuf, Paris', category: 'relaxation', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'low', pro_tip: 'Grab a seat on the top open deck for unobstructed photos.' },
    { name: 'Montmartre & Sacré-Cœur Basilica', description: 'Wander cobblestone alleyways, artist squares, and breathtaking vistas.', location: 'Montmartre, Paris', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Watch street performers on the Sacré-Cœur steps at sunset.' },
    { name: 'Jardin du Luxembourg Relaxation', description: 'Stroll past fountains, orchards, and classic green metal chairs.', location: '6th Arrondissement, Paris', category: 'nature', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Rent a mini wooden sailboat for the central pond.' },
    { name: 'Palace of Versailles Day Trip', description: 'Discover the Hall of Mirrors and magnificent royal gardens.', location: 'Versailles, France', category: 'culture', cost_tier: 'splurge', cost_factor: 0.25, energy_level: 'high', pro_tip: 'Rent an electric golf cart to explore the vast gardens easily.' },
    { name: 'Latin Quarter Jazz Club Evening', description: 'Enjoy live jazz and cocktails in a subterranean medieval stone cellar.', location: 'Latin Quarter, Paris', category: 'nightlife', cost_tier: 'moderate', cost_factor: 0.18, energy_level: 'medium', pro_tip: 'Caveau de la Huchette is the oldest operating jazz venue.' },
  ],
  tokyo: [
    { name: 'Senso-ji Temple & Nakamise Street', description: 'Visit Tokyo’s oldest Buddhist temple and shop traditional handicrafts.', location: 'Asakusa, Tokyo', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Arrive before 8 AM for peaceful photos before shops open.' },
    { name: 'Tsukiji Outer Market Food Feast', description: 'Sample fresh sashimi, tamagoyaki omelets, and grilled wagyu skewers.', location: 'Tsukiji, Tokyo', category: 'food', cost_tier: 'budget', cost_factor: 0.15, energy_level: 'low', pro_tip: 'Bring cash — many authentic market stalls do not accept cards.' },
    { name: 'Shibuya Crossing & Sky Observation Deck', description: 'Experience the world’s busiest intersection and panoramic skyline.', location: 'Shibuya, Tokyo', category: 'culture', cost_tier: 'moderate', cost_factor: 0.12, energy_level: 'medium', pro_tip: 'Book Shibuya Sky tickets for 30 minutes before sunset.' },
    { name: 'teamLab Borderless Digital Art Museum', description: 'Immerse yourself in interactive 3D light installations.', location: 'Azabudai Hills, Tokyo', category: 'culture', cost_tier: 'moderate', cost_factor: 0.2, energy_level: 'medium', pro_tip: 'Wear flat shoes and dark pants due to reflective mirror floors.' },
    { name: 'Shinjuku Gyoen National Garden', description: 'Unwind in tranquil Japanese, English, and French gardens.', location: 'Shinjuku, Tokyo', category: 'nature', cost_tier: 'budget', cost_factor: 0.05, energy_level: 'low', pro_tip: 'Visit the traditional teahouse for matcha and seasonal sweets.' },
    { name: 'Akihabara Anime & Tech Exploration', description: 'Dive into retro gaming arcades, multi-story manga shops, and gadget stores.', location: 'Akihabara, Tokyo', category: 'shopping', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'medium', pro_tip: 'Tax-free shopping is available if you present your passport.' },
    { name: 'Golden Gai Bar Crawl', description: 'Explore narrow alleyways crammed with over 200 tiny thematic bars.', location: 'Shinjuku, Tokyo', category: 'nightlife', cost_tier: 'moderate', cost_factor: 0.18, energy_level: 'medium', pro_tip: 'Look for bars with English signs indicating tourist welcome.' },
    { name: 'Meiji Shrine & Harajuku Takeshita Street', description: 'Walk through sacred cedar forest into vibrant youth fashion streets.', location: 'Harajuku, Tokyo', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Try giant rainbow cotton candy at Marion Crepes.' },
  ],
  bali: [
    { name: 'Tegallalang Rice Terraces & Jungle Swing', description: 'Walk through emerald green stepped terraces and soar over the valley.', location: 'Ubud, Bali', category: 'nature', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'medium', pro_tip: 'Go early at 7:30 AM for soft morning light and zero queues.' },
    { name: 'Ubud Monkey Forest Sanctuary', description: 'Observe playful long-tailed macaques in a sacred ancient forest.', location: 'Ubud, Bali', category: 'nature', cost_tier: 'budget', cost_factor: 0.06, energy_level: 'medium', pro_tip: 'Secure sunglasses and loose belongings before entering.' },
    { name: 'Tanah Lot Sea Temple Sunset', description: 'Watch waves crash around an ancient Hindu shrine built on offshore rock.', location: 'Tabanan, Bali', category: 'culture', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'low', pro_tip: 'Check tide schedules; low tide lets you walk to the base.' },
    { name: 'Uluwatu Cliff Temple & Kecak Fire Dance', description: 'Experience hypnotic traditional chant performance high above the Indian Ocean.', location: 'Uluwatu, Bali', category: 'culture', cost_tier: 'moderate', cost_factor: 0.15, energy_level: 'medium', pro_tip: 'Arrive by 4:30 PM to secure prime amphitheater seating.' },
    { name: 'Balinese Culinary Workshop & Market Tour', description: 'Cook traditional dishes using fresh turmeric, lemongrass, and galangal.', location: 'Ubud, Bali', category: 'food', cost_tier: 'moderate', cost_factor: 0.18, energy_level: 'medium', pro_tip: 'Most cooking schools include hotel pick-up and recipe books.' },
    { name: 'Canggu Beach & Sunset Club Chill', description: 'Surf soft breaks or relax at eco-friendly beach lounges.', location: 'Canggu, Bali', category: 'relaxation', cost_tier: 'budget', cost_factor: 0.12, energy_level: 'low', pro_tip: 'Rent a daybed at Echo Beach for prime sunset views.' },
    { name: 'Mount Batur Sunrise Volcano Trek', description: 'Hike up an active volcano for a sunrise breakfast cooked over steam vents.', location: 'Kintamani, Bali', category: 'nature', cost_tier: 'splurge', cost_factor: 0.25, energy_level: 'high', pro_tip: 'Pack warm layers; temperatures at the summit drop to 12°C.' },
  ],
  'new york': [
    { name: 'Central Park Walking & Bike Tour', description: 'Explore Bethesda Terrace, Strawberry Fields, and Bow Bridge.', location: 'Central Park, NYC', category: 'nature', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Rent a Citi Bike for an easy loop around the main reservoir.' },
    { name: 'Metropolitan Museum of Art (The Met)', description: 'Discover 5,000 years of global art, from Egyptian temples to Impressionism.', location: 'Fifth Avenue, NYC', category: 'culture', cost_tier: 'moderate', cost_factor: 0.15, energy_level: 'high', pro_tip: 'Head to the Roof Garden Bar for stunning skyline views.' },
    { name: 'High Line & Hudson Yards Vessel', description: 'Walk an elevated historic rail line transformed into a botanical park.', location: 'Chelsea, NYC', category: 'nature', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Stop at Chelsea Market underneath for artisan lobster rolls.' },
    { name: 'Brooklyn Bridge Sunset Walk to DUMBO', description: 'Cross the historic suspension bridge and take iconic skyline photos.', location: 'Brooklyn Bridge, NYC', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Grab pizza at Juliana’s or Grimaldi’s right under the bridge.' },
    { name: 'Broadway Show & Times Square Lights', description: 'Watch a award-winning musical performance in the Theater District.', location: 'Midtown, NYC', category: 'nightlife', cost_tier: 'splurge', cost_factor: 0.35, energy_level: 'low', pro_tip: 'Visit the TKTS booth in Times Square for up to 50% off same-day tickets.' },
    { name: 'Greenwich Village Food & History Stroll', description: 'Sample authentic NY slice pizza, bagels, and artisan cannolis.', location: 'Greenwich Village, NYC', category: 'food', cost_tier: 'budget', cost_factor: 0.15, energy_level: 'medium', pro_tip: 'Joe’s Pizza on Carmine St is the quintessential NY slice.' },
  ],
  rome: [
    { name: 'Colosseum & Roman Forum Guided Tour', description: 'Step into ancient history where gladiators once fought.', location: 'Piazza del Colosseo, Rome', category: 'culture', cost_tier: 'moderate', cost_factor: 0.2, energy_level: 'high', pro_tip: 'Skip-the-line arena floor access gives an incredible vantage point.' },
    { name: 'Vatican Museums & Sistine Chapel', description: 'Marvel at Michelangelo’s ceiling frescoes and St. Peter’s Basilica.', location: 'Vatican City', category: 'culture', cost_tier: 'moderate', cost_factor: 0.22, energy_level: 'high', pro_tip: 'Strict dress code requires shoulders and knees to be covered.' },
    { name: 'Trevi Fountain & Spanish Steps Stroll', description: 'Toss a coin into Trevi Fountain to ensure your return to Rome.', location: 'Centro Storico, Rome', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Toss coin with your right hand over your left shoulder.' },
    { name: 'Trastevere Evening Food & Wine Tour', description: 'Indulge in authentic Cacio e Pepe, Suppli, and Chianti wine.', location: 'Trastevere, Rome', category: 'food', cost_tier: 'moderate', cost_factor: 0.18, energy_level: 'medium', pro_tip: 'End the night with gelato at Otaleg in Trastevere.' },
    { name: 'Pantheon & Piazza Navona Exploration', description: 'Admire the unreinforced concrete dome of Rome’s best-preserved temple.', location: 'Piazza della Rotonda, Rome', category: 'culture', cost_tier: 'budget', cost_factor: 0.05, energy_level: 'low', pro_tip: 'Look up through the oculus when it rains for a magical sight.' },
  ],
  mumbai: [
    { name: 'Gateway of India & Taj Mahal Palace Stroll', description: 'Explore Mumbai’s grand colonial waterfront and historic sea monument.', location: 'Colaba, Mumbai', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Take an early morning walk before the crowds arrive.' },
    { name: 'Elephanta Caves Island Boat Excursion', description: 'Sail to a UNESCO island featuring 5th-century rock-cut Shiva sculptures.', location: 'Elephanta Island, Mumbai', category: 'culture', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'medium', pro_tip: 'The 1-hour ferry ride from Gateway of India offers great harbor photos.' },
    { name: 'Marine Drive Sunset & Chowpatty Street Food', description: 'Stroll the iconic Queen’s Necklace and sample authentic Vada Pav & Bhel Puri.', location: 'Marine Drive, Mumbai', category: 'food', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'low', pro_tip: 'Try hot Kulfi and Pav Bhaji at Bademiya or Chowpatty Beach stalls.' },
    { name: 'Colaba Causeway Shopping & Café Leopold', description: 'Shop vintage jewelry, handicrafts, and relax at Mumbai’s famous heritage cafe.', location: 'Colaba, Mumbai', category: 'shopping', cost_tier: 'budget', cost_factor: 0.12, energy_level: 'medium', pro_tip: 'Bargaining is expected; start at 50% of the initial vendor quote.' },
    { name: 'Bandra Fort & Seaside Promenade Walk', description: 'Discover trendy suburbs, Bollywood celebrity homes, and coastal fort ruins.', location: 'Bandra West, Mumbai', category: 'relaxation', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Watch the sun set behind the Bandra-Worli Sea Link.' },
  ],
  jaipur: [
    { name: 'Amber Fort & Sheesh Mahal Exploration', description: 'Explore the grand hilltop fortress, mirror palace, and panoramic valley views.', location: 'Amer, Jaipur', category: 'culture', cost_tier: 'moderate', cost_factor: 0.18, energy_level: 'high', pro_tip: 'Visit the Sheesh Mahal (Mirror Palace) for incredible light reflections.' },
    { name: 'Hawa Mahal (Palace of Winds) Photo Stroll', description: 'Admire the 953 honeycomb pink sandstone windows designed for royal women.', location: 'Pink City, Jaipur', category: 'culture', cost_tier: 'budget', cost_factor: 0.05, energy_level: 'low', pro_tip: 'Tattoo Cafe across the street has the best rooftop photo angle.' },
    { name: 'City Palace & Jantar Mantar Observatory', description: 'Tour the royal family residence and UNESCO ancient astronomical instruments.', location: 'City Palace, Jaipur', category: 'culture', cost_tier: 'moderate', cost_factor: 0.15, energy_level: 'medium', pro_tip: 'The Peacock Gate inside Pritam Niwas Chowk is world-famous.' },
    { name: 'Jal Mahal Water Palace Sunset View', description: 'View the stunning 5-story palace floating in the middle of Man Sagar Lake.', location: 'Amer Road, Jaipur', category: 'nature', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Evening illumination lights up the palace magically around 7 PM.' },
    { name: 'Johari Bazaar & Rajasthani Thali Feast', description: 'Shop silver, block prints, and savor authentic Dal Baati Churma & Laal Maas.', location: 'Johari Bazaar, Jaipur', category: 'food', cost_tier: 'budget', cost_factor: 0.12, energy_level: 'medium', pro_tip: 'Laxmi Mishthan Bhandar (LMB) serves legendary traditional sweets.' },
  ],
  goa: [
    { name: 'Baga & Anjuna Beach Watersports', description: 'Relax on golden sands, try parasailing, or lounge at lively beach shacks.', location: 'North Goa', category: 'relaxation', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'medium', pro_tip: 'Fresh coconut water and prawn curry at Curlies or Britto’s are a must.' },
    { name: 'Fontainhas Portuguese Latin Quarter Stroll', description: 'Wander pastel-colored colonial villas, tile art galleries, and heritage bakeries.', location: 'Panjim, Goa', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Stop at Confeitaria 31 De Janeiro for fresh Bebinca cake.' },
    { name: 'Dudhsagar Waterfalls Jungle Safari', description: 'Jeep safari through Mollem National Park to India’s grand 4-tiered waterfall.', location: 'South Goa', category: 'nature', cost_tier: 'moderate', cost_factor: 0.2, energy_level: 'high', pro_tip: 'Wear comfortable water shoes; swimming in the natural pool is allowed.' },
    { name: 'Tropical Spice Plantation Tour & Traditional Lunch', description: 'Walk through vanilla, cardamom, and nutmeg groves followed by a Goan buffet.', location: 'Ponda, Goa', category: 'food', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'medium', pro_tip: 'Sample fresh herbal tea and natural spices directly from the farm.' },
    { name: 'Mandovi River Sunset Cruise', description: 'Enjoy an evening boat sail with traditional Goan music, dance, and sea views.', location: 'Panjim, Goa', category: 'nightlife', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'low', pro_tip: 'Top deck offers front-row seats for dusk harbor lights.' },
  ],
  kerala: [
    { name: 'Alleppey Backwaters Private Houseboat Cruise', description: 'Drift through serene emerald lagoons, palm groves, and quiet canal villages.', location: 'Alleppey, Kerala', category: 'relaxation', cost_tier: 'splurge', cost_factor: 0.3, energy_level: 'low', pro_tip: 'Overnight houseboats include freshly caught Karimeen fish curry dinner.' },
    { name: 'Munnar Tea Estate Walk & Tasting', description: 'Trek rolling green tea gardens and learn traditional leaf picking & processing.', location: 'Munnar, Kerala', category: 'nature', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'medium', pro_tip: 'Top Station offers spectacular views over the Western Ghats.' },
    { name: 'Fort Kochi Heritage & Chinese Fishing Nets', description: 'Explore historic Portuguese churches, spice markets, and iconic cantilevered nets.', location: 'Fort Kochi, Kerala', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Buy fresh fish right at the nets and have nearby stalls grill it for you.' },
    { name: 'Ayurvedic Massage & Wellness Rejuvenation', description: 'Experience an authentic Abhyanga warm herbal oil massage by certified practitioners.', location: 'Kovalam, Kerala', category: 'relaxation', cost_tier: 'moderate', cost_factor: 0.18, energy_level: 'low', pro_tip: 'Avoid heavy meals 1 hour before an Ayurvedic treatment.' },
  ],
  india: [
    { name: 'Taj Mahal Sunrise Visit (Agra)', description: 'Witness the world’s most iconic white marble monument bathed in golden morning light.', location: 'Agra, UP, India', category: 'culture', cost_tier: 'moderate', cost_factor: 0.15, energy_level: 'medium', pro_tip: 'Enter through the East Gate at 6 AM for fewer crowds.' },
    { name: 'Qutub Minar & Historic Humayun’s Tomb', description: 'Discover Delhi’s UNESCO Mughal architecture and ancient 73-meter minaret.', location: 'New Delhi, India', category: 'culture', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'medium', pro_tip: 'Humayun’s Tomb inspired the architectural design of the Taj Mahal.' },
    { name: 'Old Delhi Street Food & Chandni Chowk Rickshaw Ride', description: 'Navigate vibrant alleyways sampling Parathas, Jalebi, and Butter Chicken.', location: 'Old Delhi, India', category: 'food', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'high', pro_tip: 'Karim’s near Jama Masjid serves legendary Mughlai kebabs.' },
    { name: 'Ganges River Evening Aarti Ceremony (Varanasi)', description: 'Watch spiritual oil lamp rituals along the sacred steps of the Ganges.', location: 'Varanasi, UP, India', category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Hire a wooden boat at Dashashwamedh Ghat for the best view from the river.' },
  ],
};

// Generic parametric generator for any custom destination typed by user
function generateCustomTemplates(destination: string): ActivityTemplate[] {
  const city = destination.split(',')[0].trim();
  return [
    { name: `${city} Old Town & Historic Landmark Tour`, description: `Explore the vibrant heart of ${city}, discovering historic architecture, central plazas, and local heritage.`, location: `Central ${city}`, category: 'culture', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Join a local walking tour for insider historical context.' },
    { name: `${city} Culinary Tasting & Local Food Market`, description: `Sample regional specialties, street food delicacies, and artisanal treats at ${city}’s top market.`, location: `Market District, ${city}`, category: 'food', cost_tier: 'budget', cost_factor: 0.12, energy_level: 'low', pro_tip: 'Ask market vendors for their seasonal recommendation.' },
    { name: `${city} Scenic Viewpoint & Botanical Gardens`, description: `Enjoy fresh air, lush flora, and sweeping vistas over ${city} and its surrounding landscape.`, location: `Heights Park, ${city}`, category: 'nature', cost_tier: 'free', cost_factor: 0, energy_level: 'medium', pro_tip: 'Golden hour offers the best lighting for photography.' },
    { name: `${city} Premier Art Museum & Cultural Center`, description: `Immerse yourself in world-class art collections, contemporary exhibits, and cultural displays.`, location: `Cultural Quarter, ${city}`, category: 'culture', cost_tier: 'moderate', cost_factor: 0.15, energy_level: 'medium', pro_tip: 'Audio guides provide rich context for key exhibits.' },
    { name: `${city} Waterfront Promenade & Sunset Relaxation`, description: `Unwind along the picturesque waterfront or riverbanks as dusk settles over the city.`, location: `Waterfront, ${city}`, category: 'relaxation', cost_tier: 'free', cost_factor: 0, energy_level: 'low', pro_tip: 'Find a comfortable café terrace to watch the sunset.' },
    { name: `${city} Evening Dining & Local Music Experience`, description: `Savor an authentic multi-course dinner paired with local wines or beverages and live music.`, location: `Downtown, ${city}`, category: 'nightlife', cost_tier: 'moderate', cost_factor: 0.2, energy_level: 'medium', pro_tip: 'Reservations are recommended for weekend evenings.' },
    { name: `${city} Artisan Craft & Souvenir Shopping Stroll`, description: `Discover boutique shops, local craftsman workshops, and unique souvenirs to bring home.`, location: `Boutique Quarter, ${city}`, category: 'shopping', cost_tier: 'budget', cost_factor: 0.1, energy_level: 'medium', pro_tip: 'Look for handmade goods stamped with local artisan seals.' },
    { name: `${city} Hidden Gem Excursion & Off-Beaten-Path Adventure`, description: `Escape tourist crowds and discover a quiet neighborhood loved by ${city} locals.`, location: `Outer Quarter, ${city}`, category: 'culture', cost_tier: 'budget', cost_factor: 0.08, energy_level: 'medium', pro_tip: 'Great spot for authentic coffee and relaxed conversation.' },
  ];
}

// Helper to construct dynamic JSON matching exact formValues
function buildDynamicMockItinerary(formValues: TripFormValues): string {
  const destLower = (formValues.destination || 'Tokyo').toLowerCase();
  
  // Find matching destination templates or create custom ones
  let templates: ActivityTemplate[] = [];
  for (const key of Object.keys(DESTINATION_ACTIVITIES)) {
    if (destLower.includes(key)) {
      templates = DESTINATION_ACTIVITIES[key];
      break;
    }
  }
  if (templates.length === 0) {
    templates = generateCustomTemplates(formValues.destination || 'Destination');
  }

  const durationDays = formValues.durationDays || 3;
  const dailyBudget = Math.max(20, Math.floor((formValues.budget || 1000) / durationDays));

  const timeSlots = [
    { start: '09:00', end: '11:00' },
    { start: '11:30', end: '13:30' },
    { start: '14:30', end: '17:30' },
    { start: '19:00', end: '21:30' },
  ];

  const days = Array.from({ length: durationDays }, (_, dayIdx) => {
    const dayNumber = dayIdx + 1;
    // Pick 3-4 distinct activities for this day
    const dayActivities = timeSlots.map((slot, slotIdx) => {
      const templateIdx = (dayIdx * 3 + slotIdx) % templates.length;
      const t = templates[templateIdx];

      const estCost = Math.round(t.cost_factor * dailyBudget);

      return {
        name: t.name,
        description: t.description,
        location: t.location,
        start_time: slot.start,
        end_time: slot.end,
        category: t.category,
        cost_tier: t.cost_tier,
        estimated_cost: estCost,
        energy_level: t.energy_level,
        pro_tip: t.pro_tip,
      };
    });

    return {
      day_number: dayNumber,
      activities: dayActivities,
    };
  });

  return JSON.stringify({
    destination: formValues.destination || 'Destination',
    currency: formValues.currency || 'USD',
    days,
  });
}

async function callOpenAIDirect(prompt: string, signal?: AbortSignal): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
  if (!apiKey) throw new Error('No API key');

  const response = await fetchWithTimeout(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    },
    signal
  );

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

async function callServerlessProxy(prompt: string, signal?: AbortSignal): Promise<string> {
  const response = await fetchWithTimeout(
    '/api/generate',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    },
    signal
  );
  const data = await response.json();
  return data.content ?? '';
}

/**
 * Generates a full itinerary from trip form values.
 * Tries in order: serverless proxy → direct OpenAI (dev) → dynamic destination mock generator.
 */
export async function generateItinerary(
  formValues: TripFormValues,
  signal?: AbortSignal
): Promise<Itinerary> {
  const prompt = buildItineraryPrompt(formValues);
  let rawContent = '';

  // Strategy 1: Serverless proxy (production / Vercel)
  try {
    rawContent = await callServerlessProxy(prompt, signal);
  } catch (proxyErr: unknown) {
    // Strategy 2: Direct OpenAI (dev with VITE_OPENAI_API_KEY)
    try {
      rawContent = await callOpenAIDirect(prompt, signal);
    } catch {
      // Strategy 3: Dynamic destination mock generator
      console.warn(`No active API key — generating tailored itinerary for "${formValues.destination}".`);
      rawContent = buildDynamicMockItinerary(formValues);
    }

    // If proxy threw a typed AppError (not "No API key"), re-throw it
    if (proxyErr && typeof proxyErr === 'object' && 'type' in proxyErr) {
      const err = proxyErr as { type: string };
      if (err.type !== 'network') {
        throw proxyErr;
      }
    }
  }

  const { success, itinerary } = parseAndValidateItinerary(rawContent, formValues);

  if (!success || !itinerary) {
    throw {
      type: 'schema',
      message: 'The AI returned something unexpected. Try regenerating.',
      retryable: true,
    } satisfies AppError;
  }

  if (itinerary.days.length === 0) {
    throw {
      type: 'schema',
      message: 'No activities were generated. Try a different destination or prompt.',
      retryable: true,
    } satisfies AppError;
  }

  return itinerary;
}

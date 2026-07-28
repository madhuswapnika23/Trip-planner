export interface RawActivity {
  name: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  category: string;
  cost_tier: string;
  estimated_cost: number;
  energy_level: string;
  pro_tip: string | null;
}

export interface RawDay {
  day_number: number;
  activities: RawActivity[];
}

export interface RawAIResponse {
  destination: string;
  currency: string;
  days: RawDay[];
}

export interface GenerateItineraryRequestBody {
  prompt: string;
}

export interface GenerateItineraryResponseBody {
  content: string;
}
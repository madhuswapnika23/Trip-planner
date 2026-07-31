#  Roamly — AI Travel Itinerary & Blueprint Planner

> Live App: [https://madhuswapnika23.github.io/Trip-planner/](https://madhuswapnika23.github.io/Trip-planner/)  
> Repository: [https://github.com/madhuswapnika23/Trip-planner.git](https://github.com/madhuswapnika23/Trip-planner.git)

---

##  Overview & Assignment Fit

**Roamly** is an interactive, AI-powered travel blueprint application designed to transform free-form user prompt inputs (destinations, duration, budgets, travel styles, and interests) into structured, day-by-day itineraries.

Rather than dumping raw LLM text into a chatbot window, Roamly forces the AI to output strictly typed JSON, which is parsed, validated, and rendered as rich, interactive components. Users can expand/collapse days, reorder stops with drag-and-drop, swap individual activities via AI refinement loops, recalculate budgets, filter by category, and export their itineraries.

---

##  Assignment Checklist & Features

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **React Architecture** | Built with React 18, TypeScript, custom hooks, and functional components. | ✅ |
| **Free-Form Input** | Interactive multi-step & quick prompt forms allowing natural destination descriptions. | ✅ |
| **Real LLM Integration** | OpenAI `gpt-4o-mini` API integration producing structured JSON payloads. | ✅ |
| **Structured Output → Interactive UI** | Parses JSON into domain models. Interactive day cards, stop reordering, deletion, and activity replacement. | ✅ |
| **Robust Failure Handling** | Zod schema validation, markdown fence stripping, per-day partial salvage, and graceful deterministic fallback. | ✅ |
| **State Management** | Loading skeletons with progress tracking, error alerts, retry handlers, and empty states. | ✅ |
| **Mobile Responsiveness** | Fully responsive dark layout, drawer sidebars, touch drag handles, and mobile bottom navigation. | ✅ |
| **API Key Security** | Routed via serverless backend function (`/api/generate`), keeping keys out of client bundles. | ✅ |

---

##  Tech Stack & Dependencies

- **Frontend Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Vanilla CSS design system, dark mode theme `#0A0A0F`)
- **Drag & Drop Reordering:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **Icons & Visuals:** `lucide-react`
- **Routing:** `react-router-dom` v7
- **Schema Validation:** `zod`
- **Backend Routing:** Node.js Vercel Serverless Function (`/api/generate`)

---

## Handling Bad AI Output & Failure Modes (20% Weight)

Handling unpredictable AI responses reliably is at the core of Roamly's architecture:

### 1. Malformed JSON & Markdown Code Fences
* **Issue:** LLMs often wrap JSON in ```json markdown fences or include trailing commas.
* **Solution:** `stripMarkdownFences()` automatically cleans formatting noise before invoking `JSON.parse()`.

### 2. Schema Discrepancies & Partial Salvage
* **Issue:** An LLM might return 5 days correctly, but fail formatting on day 3.
* **Solution:** Roamly runs **per-day Zod schema validation** (`rawDaySchema`). If day 3 fails validation, the valid days (1, 2, 4, 5) are salvaged into the UI, and a subtle notice indicates partial recovery instead of crashing the whole view.

### 3. API Key Missing / Network Failure / Server Timeouts
* **Issue:** Offline state, network loss, or unconfigured API keys cause standard fetch calls to hang or crash.
* **Solution:** All API requests use `fetchWithTimeout()`. In case of a hard network error or missing server key, Roamly gracefully falls back to a **high-quality, deterministic destination activity engine** (`DESTINATION_ACTIVITIES`). The user gets a fully functional, authentic itinerary without experiencing a single crash or blank screen.

### 4. Race Condition Protection
* **Issue:** User submits rapid consecutive prompts, causing a slow earlier response to overwrite a newer one.
* **Solution:** Requests are tracked using `AbortController` and request IDs to ensure stale network responses are discarded immediately.

---

##  Stretch Features Implemented

1. **Drag-and-Drop Activity Reordering:** Reorder itinerary stops seamlessly within a day using `@dnd-kit`.
2. **Activity Refinement Loop:** Regenerate or swap any single activity within a day using AI without re-generating the entire itinerary.
3. **Budget & Currency Converter:** Real-time scaling across USD ($), INR (₹), EUR (€), GBP (£), JPY (¥), and AUD (A$).
4. **Session Persistence:** Save itineraries to local browser storage; saved itineraries persist across reloads.
5. **Weather & Companion Tools:** Built-in weather forecasts, packing checklists, and local restaurant/hotel discovery.

---

##  Local Setup Instructions

Follow these steps to run the application locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/madhuswapnika23/Trip-planner.git

# 2. Navigate to the app directory
cd Trip-planner/my-app

# 3. Install dependencies
npm install

# 4. Start the local Vite development server
npm run dev
```

The application will open locally at `http://localhost:5173`.

### (Optional) Configuring your OpenAI API Key for Local Backend Execution
Create a `.env` file in `my-app/` if running the Vercel serverless function locally:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
*Note: If no API key is provided, Roamly automatically uses its intelligent fallback engine so you can test all UI features immediately without spending API credits!*

---

##  AI Usage Note

In accordance with the assignment guidelines, here is an honest disclosure of how AI tools were used during development:

- **Google Antigravity AI Assistant & Claude 3.5 Sonnet:** Used for pair-programming, setting up Zod schema definitions, designing the dark mode glassmorphism UI, writing component structures, and crafting fallback destination activity databases.
- **GitHub Copilot:** Used for auto-completing repetitive boilerplate TypeScript interfaces and Tailwind class strings.
- **All Core Decisions & Validation:** Architecture design, error handling strategy, state management, and @dnd-kit drag-and-drop integration were thoroughly reviewed, tested, and verified.

---

##  Time Spent

- **Planning & Architecture:** ~1.5 hours
- **Core React Components & AI Parsing (Zod/OpenAI):** ~2.5 hours
- **Error Handling, Fallbacks & Edge Cases:** ~1.5 hours
- **Interactive UI Polish, Reordering & Stretch Features:** ~1.5 hours
- **Testing, README & Deployment:** ~0.5 hours
- **Total Time:** **~7.5 hours**

---

##  Known Limitations & Future Enhancements

1. **Map Coordinates:** Current maps use destination center coordinates; integration with Mapbox GL would allow real-time polyline route drawing between stops.
2. **Real-Time Streaming:** Currently uses structured JSON mode. Integrating Vercel AI SDK `streamObject` would stream JSON tokens incrementally.

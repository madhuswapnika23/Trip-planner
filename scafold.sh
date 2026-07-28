#!/bin/bash
# Voyagr scaffold script — run from my-app/ root
# Usage: bash scaffold.sh

set -e

echo "Scaffolding Voyagr project structure..."

# src root files
mkdir -p src
touch src/main.tsx
touch src/App.tsx
touch src/vite-env.d.ts

# types/
mkdir -p src/types
touch src/types/itinerary.ts
touch src/types/api.ts
touch src/types/ui.ts
touch src/types/index.ts

# schema/
mkdir -p src/schema
touch src/schema/itinerarySchema.ts
touch src/schema/validators.ts

# api/ (client-side)
mkdir -p src/api
touch src/api/client.ts
touch src/api/generateItinerary.ts
touch src/api/regenerateActivity.ts

# hooks/
mkdir -p src/hooks
touch src/hooks/useItinerary.ts
touch src/hooks/useGenerate.ts
touch src/hooks/useBudget.ts
touch src/hooks/useDragReorder.ts
touch src/hooks/useUndo.ts
touch src/hooks/useShareUrl.ts
touch src/hooks/useLocalStorage.ts

# utils/
mkdir -p src/utils
touch src/utils/budget.ts
touch src/utils/time.ts
touch src/utils/serialization.ts
touch src/utils/idGenerator.ts
touch src/utils/cn.ts

# constants/
mkdir -p src/constants
touch src/constants/categories.ts
touch src/constants/prompts.ts
touch src/constants/config.ts

# components/ui/
mkdir -p src/components/ui
touch src/components/ui/Button.tsx
touch src/components/ui/Badge.tsx
touch src/components/ui/Skeleton.tsx
touch src/components/ui/Toast.tsx
touch src/components/ui/Modal.tsx
touch src/components/ui/BottomSheet.tsx
touch src/components/ui/ProgressBar.tsx
touch src/components/ui/Tooltip.tsx

# components/layout/
mkdir -p src/components/layout
touch src/components/layout/AppShell.tsx
touch src/components/layout/TopBar.tsx
touch src/components/layout/TimelinePanel.tsx
touch src/components/layout/BudgetPanel.tsx
touch src/components/layout/MobileBudgetBar.tsx

# components/input/
mkdir -p src/components/input
touch src/components/input/InputScreen.tsx
touch src/components/input/TripForm.tsx
touch src/components/input/DestinationField.tsx
touch src/components/input/DurationSelector.tsx
touch src/components/input/BudgetSlider.tsx
touch src/components/input/StylePicker.tsx
touch src/components/input/NotesField.tsx

# components/generation/
mkdir -p src/components/generation
touch src/components/generation/GenerationScreen.tsx
touch src/components/generation/StatusMessage.tsx
touch src/components/generation/ItinerarySkeleton.tsx
touch src/components/generation/DaySkeleton.tsx

# components/itinerary/
mkdir -p src/components/itinerary
touch src/components/itinerary/ItineraryScreen.tsx
touch src/components/itinerary/DaySection.tsx
touch src/components/itinerary/DayHeader.tsx
touch src/components/itinerary/ActivityList.tsx
touch src/components/itinerary/ActivityCard.tsx
touch src/components/itinerary/ActivityDetail.tsx
touch src/components/itinerary/ActivityActions.tsx

# components/budget/
mkdir -p src/components/budget
touch src/components/budget/BudgetOverview.tsx
touch src/components/budget/BudgetBar.tsx
touch src/components/budget/DayBreakdown.tsx
touch src/components/budget/CategoryBreakdown.tsx

# components/states/
mkdir -p src/components/states
touch src/components/states/EmptyState.tsx
touch src/components/states/ErrorState.tsx
touch src/components/states/ApiErrorState.tsx
touch src/components/states/SchemaErrorState.tsx
touch src/components/states/PartialErrorBanner.tsx

# components/modals/
mkdir -p src/components/modals
touch src/components/modals/ShareModal.tsx

# styles/
mkdir -p src/styles
touch src/styles/globals.css

# api/ (root-level serverless)
mkdir -p api
touch api/generate.ts

echo "✅ Done. Folder structure created under src/ and api/."
echo "Next: paste in the file contents as they're provided, in this order:"
echo "  1. types/ + schema/ + constants/ + utils/"
echo "  2. hooks/"
echo "  3. api/ (client + serverless)"
echo "  4. components/ui/ + components/layout/"
echo "  5. components/input/ + components/generation/"
echo "  6. components/itinerary/ + components/budget/ + components/states/ + components/modals/"
echo "  7. App.tsx + main.tsx + globals.css + README"
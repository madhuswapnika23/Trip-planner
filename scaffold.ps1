# Voyagr scaffold script — PowerShell version
# Usage: powershell -ExecutionPolicy Bypass -File scaffold.ps1
# Or just: .\scaffold.ps1

$files = @(
    "src/main.tsx",
    "src/App.tsx",
    "src/vite-env.d.ts",

    "src/types/itinerary.ts",
    "src/types/api.ts",
    "src/types/ui.ts",
    "src/types/index.ts",

    "src/schema/itinerarySchema.ts",
    "src/schema/validators.ts",

    "src/api/client.ts",
    "src/api/generateItinerary.ts",
    "src/api/regenerateActivity.ts",

    "src/hooks/useItinerary.ts",
    "src/hooks/useGenerate.ts",
    "src/hooks/useBudget.ts",
    "src/hooks/useDragReorder.ts",
    "src/hooks/useUndo.ts",
    "src/hooks/useShareUrl.ts",
    "src/hooks/useLocalStorage.ts",

    "src/utils/budget.ts",
    "src/utils/time.ts",
    "src/utils/serialization.ts",
    "src/utils/idGenerator.ts",
    "src/utils/cn.ts",

    "src/constants/categories.ts",
    "src/constants/prompts.ts",
    "src/constants/config.ts",

    "src/components/ui/Button.tsx",
    "src/components/ui/Badge.tsx",
    "src/components/ui/Skeleton.tsx",
    "src/components/ui/Toast.tsx",
    "src/components/ui/Modal.tsx",
    "src/components/ui/BottomSheet.tsx",
    "src/components/ui/ProgressBar.tsx",
    "src/components/ui/Tooltip.tsx",

    "src/components/layout/AppShell.tsx",
    "src/components/layout/TopBar.tsx",
    "src/components/layout/TimelinePanel.tsx",
    "src/components/layout/BudgetPanel.tsx",
    "src/components/layout/MobileBudgetBar.tsx",

    "src/components/input/InputScreen.tsx",
    "src/components/input/TripForm.tsx",
    "src/components/input/DestinationField.tsx",
    "src/components/input/DurationSelector.tsx",
    "src/components/input/BudgetSlider.tsx",
    "src/components/input/StylePicker.tsx",
    "src/components/input/NotesField.tsx",

    "src/components/generation/GenerationScreen.tsx",
    "src/components/generation/StatusMessage.tsx",
    "src/components/generation/ItinerarySkeleton.tsx",
    "src/components/generation/DaySkeleton.tsx",

    "src/components/itinerary/ItineraryScreen.tsx",
    "src/components/itinerary/DaySection.tsx",
    "src/components/itinerary/DayHeader.tsx",
    "src/components/itinerary/ActivityList.tsx",
    "src/components/itinerary/ActivityCard.tsx",
    "src/components/itinerary/ActivityDetail.tsx",
    "src/components/itinerary/ActivityActions.tsx",

    "src/components/budget/BudgetOverview.tsx",
    "src/components/budget/BudgetBar.tsx",
    "src/components/budget/DayBreakdown.tsx",
    "src/components/budget/CategoryBreakdown.tsx",

    "src/components/states/EmptyState.tsx",
    "src/components/states/ErrorState.tsx",
    "src/components/states/ApiErrorState.tsx",
    "src/components/states/SchemaErrorState.tsx",
    "src/components/states/PartialErrorBanner.tsx",

    "src/components/modals/ShareModal.tsx",

    "src/styles/globals.css",

    "api/generate.ts"
)

foreach ($file in $files) {
    $dir = Split-Path $file -Parent
    if ($dir -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
    }
}

Write-Host "Done. All files created under src/ and api/." -ForegroundColor Green
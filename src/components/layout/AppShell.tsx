import { useState } from 'react';
import { TopBar } from './TopBar';
import { TimelinePanel } from './TimelinePanel';
import { BudgetPanel } from './BudgetPanel';
import { MobileBudgetBar } from './MobileBudgetBar';
import { InputScreen } from '@/components/input/InputScreen';
import { GenerationScreen } from '@/components/generation/GenerationScreen';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { ShareModal } from '@/components/modals/ShareModal';
import { EditActivityModal } from '@/components/modals/EditActivityModal';
import { useBudget } from '@/hooks/useBudget';
import { useShareUrl } from '@/hooks/useShareUrl';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/utils/cn';
import type { Activity } from '@/types/itinerary';
import type { ItineraryActions } from '@/hooks/useItinerary';

interface AppShellProps {
  state: {
    status: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['status'];
    itinerary: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['itinerary'];
    error: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['error'];
    formValues: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['formValues'];
    expandedIds: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['expandedIds'];
    revealedDayIds: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['revealedDayIds'];
    regeneratingIds: ReturnType<typeof import('@/hooks/useItinerary').useItinerary>['regeneratingIds'];
  };
  actions: ItineraryActions;
}

export function AppShell({ state, actions }: AppShellProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [editingDayId, setEditingDayId] = useState<string>('');
  const { showToast } = useToast();

  const budgetMetrics = useBudget(state.itinerary);

  // Share URL hydration
  const { shareUrl } = useShareUrl({
    itinerary: state.itinerary,
    onHydrate: (it) => {
      actions.hydrateFromShare(it);
      showToast({ message: `Trip "${it.destination}" loaded from shared link`, duration: 3000 });
    },
  });

  const handleNewTrip = () => {
    if (state.status === 'success' || state.status === 'error') {
      if (!confirm('Start a new trip? Your current itinerary will be lost.')) return;
    }
    actions.reset();
  };

  const handleEdit = (activity: Activity) => {
    // Find which day this activity belongs to
    const day = state.itinerary?.days.find((d) => d.activities.some((a) => a.id === activity.id));
    if (!day) return;
    setEditingActivity(activity);
    setEditingDayId(day.id);
  };

  const handleSaveEdit = (dayId: string, activityId: string, updates: Partial<Activity>) => {
    actions.updateActivity(dayId, activityId, updates);
    showToast({ message: 'Activity updated ✓', duration: 2000 });
  };

  const handleRemoveWithToast = (activityId: string, dayId: string) => {
    const activity = state.itinerary?.days
      .flatMap((d) => d.activities)
      .find((a) => a.id === activityId);

    actions.removeActivity(activityId, dayId);

    showToast({
      message: `Removed "${activity?.name ?? 'activity'}"`,
      action: {
        label: 'Undo',
        onClick: () => actions.undoRemove(activityId),
      },
      duration: 5000,
    });
  };

  const itineraryActions = {
    toggleExpanded: actions.toggleExpanded,
    removeActivity: handleRemoveWithToast,
    regenerateActivity: actions.regenerateActivity,
    reorderActivity: actions.reorderActivity,
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Gradient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(79,126,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,92,191,0.06) 0%, transparent 50%)',
        }}
      />

      <TopBar
        itinerary={state.itinerary}
        status={state.status}
        onShare={() => setIsShareOpen(true)}
        onNewTrip={handleNewTrip}
      />

      {/* Main content — padded for fixed top bar */}
      <main className="flex flex-col flex-1 pt-16">
        {/* ── IDLE ── */}
        {state.status === 'idle' && (
          <InputScreen
            isVisible
            onSubmit={actions.generate}
            initialValues={state.formValues}
          />
        )}

        {/* ── LOADING ── */}
        {state.status === 'loading' && (
          <GenerationScreen
            formValues={state.formValues}
            onCancel={actions.abort}
          />
        )}

        {/* ── ERROR ── */}
        {state.status === 'error' && state.error && (
          <ErrorState
            error={state.error}
            onRetry={() => actions.generate(state.formValues)}
            onStartOver={actions.reset}
            onEditPrompt={actions.reset}
          />
        )}

        {/* ── EMPTY ── */}
        {state.status === 'empty' && (
          <EmptyState onRetry={actions.reset} />
        )}

        {/* ── SUCCESS — two-panel desktop layout ── */}
        {state.status === 'success' && state.itinerary && budgetMetrics && (
          <div className={cn(
            'flex flex-1 min-h-0',
            'flex-col lg:flex-row',
          )}>
            {/* Timeline — scrollable left panel */}
            <div className="flex-1 lg:max-w-[65%] min-h-0">
              <TimelinePanel
                itinerary={state.itinerary}
                expandedIds={state.expandedIds}
                regeneratingIds={state.regeneratingIds}
                revealedDayIds={state.revealedDayIds}
                actions={itineraryActions}
                onEditActivity={handleEdit}
              />
            </div>

            {/* Budget — fixed right panel (desktop only) */}
            <div className="hidden lg:block w-[35%] min-w-[280px] border-l border-bg-border overflow-y-auto sticky top-16 self-start max-h-[calc(100vh-4rem)]">
              <div className="px-5">
                <div className="py-4 border-b border-bg-border">
                  <h2 className="text-sm font-semibold text-text-primary">Budget</h2>
                </div>
                <BudgetPanel
                  metrics={budgetMetrics}
                  itinerary={state.itinerary}
                />
              </div>
            </div>

            {/* Mobile budget bar */}
            <MobileBudgetBar
              metrics={budgetMetrics}
              itinerary={state.itinerary}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {state.itinerary && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          itinerary={state.itinerary}
          shareUrl={shareUrl}
        />
      )}

      <EditActivityModal
        isOpen={!!editingActivity}
        onClose={() => setEditingActivity(null)}
        activity={editingActivity}
        dayId={editingDayId}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

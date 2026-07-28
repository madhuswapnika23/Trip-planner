import { Plane, Share2, Plus, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/budget';
import type { Itinerary } from '@/types/itinerary';

interface TopBarProps {
  itinerary: Itinerary | null;
  onShare: () => void;
  onNewTrip: () => void;
  status: string;
}

export function TopBar({ itinerary, onShare, onNewTrip, status }: TopBarProps) {
  const showItineraryInfo = status === 'success' && itinerary;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30',
        'h-16 flex items-center justify-between px-4 lg:px-6',
        'bg-bg-surface/90 backdrop-blur-md border-b border-bg-border',
        'no-print'
      )}
    >
      {/* Left — Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-voyagr-blue to-indigo-600 flex items-center justify-center shadow-sm shadow-voyagr-blue/30">
          <Plane className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-display font-bold text-text-primary tracking-tight">
          Voyagr
        </span>
      </div>

      {/* Center — Trip summary badge (desktop only, shown on success) */}
      {showItineraryInfo && (
        <div className="hidden md:flex items-center gap-4 animate-fadeIn">
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <MapPin className="w-3.5 h-3.5 text-voyagr-blue" />
            <span className="font-medium text-text-primary">{itinerary.destination}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Calendar className="w-3.5 h-3.5" />
            <span>{itinerary.totalDays} days</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{formatCurrency(itinerary.totalBudget, itinerary.currency)}</span>
          </div>
        </div>
      )}

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {showItineraryInfo && (
          <Button
            variant="ghost"
            size="sm"
            id="share-btn"
            onClick={onShare}
            leftIcon={<Share2 className="w-4 h-4" />}
            className="hidden sm:flex"
          >
            Share
          </Button>
        )}

        {status !== 'idle' && (
          <Button
            variant="secondary"
            size="sm"
            id="new-trip-btn"
            onClick={onNewTrip}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Trip
          </Button>
        )}
      </div>
    </header>
  );
}

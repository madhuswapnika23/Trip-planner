import { useState } from 'react';
import { Copy, Check, FileText, ExternalLink } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import type { Itinerary } from '@/types/itinerary';
import { formatCurrency } from '@/utils/budget';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: Itinerary;
  shareUrl: string | null;
}

function buildMarkdown(itinerary: Itinerary): string {
  const lines: string[] = [
    `# ${itinerary.destination} — ${itinerary.totalDays} Days`,
    `*Budget: ${formatCurrency(itinerary.totalBudget, itinerary.currency)}*`,
    '',
  ];

  for (const day of itinerary.days) {
    lines.push(`## ${day.label}`);
    const active = day.activities.filter((a) => !a.isRemoved);
    for (const act of active) {
      lines.push(`### ${act.name}`);
      lines.push(`**Time:** ${act.startTime} – ${act.endTime}  |  **Location:** ${act.location}`);
      lines.push(`**Cost:** ${formatCurrency(act.estimatedCost, itinerary.currency)} (${act.costTier})`);
      lines.push('');
      lines.push(act.description);
      if (act.proTip) lines.push(`\n> 💡 **Pro Tip:** ${act.proTip}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

export function ShareModal({ isOpen, onClose, itinerary, shareUrl }: ShareModalProps) {
  const [urlCopied, setUrlCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);
  const { showToast } = useToast();

  const copyUrl = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setUrlCopied(true);
      showToast({ message: 'Link copied to clipboard ✓', duration: 2000 });
      setTimeout(() => setUrlCopied(false), 2000);
    } catch {
      showToast({ message: 'Could not copy — please copy manually', duration: 3000 });
    }
  };

  const copyMarkdown = async () => {
    const md = buildMarkdown(itinerary);
    try {
      await navigator.clipboard.writeText(md);
      setMdCopied(true);
      showToast({ message: 'Itinerary copied as Markdown ✓', duration: 2000 });
      setTimeout(() => setMdCopied(false), 2000);
    } catch {
      showToast({ message: 'Could not copy to clipboard', duration: 3000 });
    }
  };

  const activeActivityCount = itinerary.days
    .flatMap((d) => d.activities)
    .filter((a) => !a.isRemoved).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Trip">
      <div className="p-6 space-y-6">
        {/* Trip summary */}
        <div className="p-4 rounded-xl bg-bg-surface border border-bg-border">
          <h3 className="text-md font-display font-bold text-text-primary mb-1">
            {itinerary.destination}
          </h3>
          <div className="flex gap-4 text-sm text-text-secondary">
            <span>{itinerary.totalDays} days</span>
            <span>·</span>
            <span>{formatCurrency(itinerary.totalBudget, itinerary.currency)} budget</span>
            <span>·</span>
            <span>{activeActivityCount} activities</span>
          </div>
        </div>

        {/* Share URL */}
        {shareUrl ? (
          <div>
            <label className="block text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
              Shareable Link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2.5 rounded-xl border border-bg-border bg-bg-surface">
                <p className="text-xs font-mono text-text-tertiary truncate">{shareUrl}</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={copyUrl}
                leftIcon={urlCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {urlCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="text-xs text-text-tertiary mt-1.5">
              Anyone with this link can view your full itinerary. No account needed.
            </p>
          </div>
        ) : (
          <div className="text-sm text-text-tertiary text-center py-2">
            Share link not available.
          </div>
        )}

        {/* Export options */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="md"
            className="flex-1"
            onClick={copyMarkdown}
            leftIcon={mdCopied ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          >
            {mdCopied ? 'Copied!' : 'Copy as Markdown'}
          </Button>
          {shareUrl && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => window.open(shareUrl, '_blank')}
              leftIcon={<ExternalLink className="w-4 h-4" />}
            >
              Open
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

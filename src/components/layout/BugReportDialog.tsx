import { useEffect, useState } from 'react';
import { FaPaperPlane, FaXmark } from 'react-icons/fa6';
import { Button } from '@/components/ui/Button';

interface BugReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORT_EMAIL = ['eranis', '54321', '@gmail.com'].join('');

function buildMailto(message: string): string {
  const subject = encodeURIComponent('MovieSwipe bug report');
  const body = encodeURIComponent(message.trim());
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

export function BugReportDialog({ isOpen, onClose }: BugReportDialogProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setMessage('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (): void => {
    if (!message.trim()) {
      return;
    }

    window.location.href = buildMailto(message);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 px-4 py-6 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bug-report-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[28px] border border-white/10 bg-panel/95 p-5 shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent-300">Feedback</p>
            <h2 id="bug-report-title" className="mt-2 text-2xl font-semibold text-white">
              Report a bug
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Write a short note and your mail app will open with the message prefilled.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close bug report"
          >
            <FaXmark />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/80">Your message</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={6}
              placeholder="Describe what went wrong, what you expected, and any steps to reproduce it."
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent-400/45 focus:bg-white/7"
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              leadingIcon={<FaPaperPlane />}
              disabled={!message.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

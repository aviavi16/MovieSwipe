import { useEffect } from 'react';

type ShortcutMap = Partial<Record<string, () => void>>;

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target.isContentEditable;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap, options: UseKeyboardShortcutsOptions = {}): void {
  useEffect(() => {
    if (options.enabled === false) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (isTypingTarget(event.target)) {
        return;
      }

      const shortcutKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const shortcut = shortcuts[shortcutKey];
      if (!shortcut) {
        return;
      }

      event.preventDefault();
      shortcut();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options.enabled, shortcuts]);
}

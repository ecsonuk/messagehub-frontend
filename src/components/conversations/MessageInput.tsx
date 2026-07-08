import { useEffect, useRef } from 'react';

type Props = {
  message: string;
  sending: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function MessageInput({
  message,
  sending,
  onChange,
  onSend,
}: Props) {

const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  const textarea = textareaRef.current;

  if (!textarea) return;

  textarea.style.height = 'auto';
  textarea.style.height =
    Math.min(textarea.scrollHeight, 120) + 'px';
}, [message]);

  return (
	<div className="border-t bg-white p-5">

      <div className="flex gap-3">

<textarea
  ref={textareaRef}
  rows={1}
  value={message}
  onChange={(e) => onChange(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {

      if (e.shiftKey || e.altKey) {
        return;
      }

      e.preventDefault();
      onSend();
    }
  }}
  placeholder="Type your message..."
  className="
    flex-1
    resize-none
    overflow-y-auto
    rounded-xl
    border
    px-5
    py-3
    text-[15px]
    leading-6
    min-h-[52px]
    max-h-[120px]
  "
/>

        <button
          onClick={onSend}
          disabled={sending}
	  className="rounded-xl bg-blue-600 px-8 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>

      </div>

    </div>
  );
}

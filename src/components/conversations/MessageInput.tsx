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
  return (
	<div className="border-t bg-white p-5">

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSend();
            }
          }}
          placeholder="Type your message..."
	  className="flex-1 rounded-xl border px-5 py-3 text-[15px]"
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

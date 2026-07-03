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
    <div className="border-t bg-white p-4">

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
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={onSend}
          disabled={sending}
          className="rounded-lg bg-blue-600 px-6 text-white disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>

      </div>

    </div>
  );
}

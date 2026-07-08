import MessageBubble from './MessageBubble';

type Message = {
  id: string;

  direction: string;

  messageType: string;

  messageText: string | null;

  mediaType?: string;

  metaMediaId?: string;

  fileName?: string;

  mimeType?: string;

  status?: string;

  createdAt: string;
};

type Props = {
  messages: Message[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export default function MessageList({
  messages,
  bottomRef,
}: Props) {
  return (
    <div className="flex min-h-full flex-col gap-6 p-8">

      {messages.length === 0 && (
        <div className="text-center text-gray-500">
          No messages yet.
        </div>
      )}

      <div className="mt-auto space-y-4">

{messages.map((msg) => (
  <MessageBubble
    key={msg.id}

    direction={msg.direction}

    messageText={msg.messageText}

    messageType={msg.messageType}

    mediaType={msg.mediaType}

    metaMediaId={msg.metaMediaId}

    fileName={msg.fileName}

    mimeType={msg.mimeType}

    status={msg.status}

    createdAt={msg.createdAt}
  />
))}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}

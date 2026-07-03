import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

type Message = {
  id: string;
  direction: 'INBOUND' | 'OUTBOUND';
  messageText: string;
  createdAt: string;
  status?: string;
};

type Props = {
  messages: Message[];
};

export default function MessageList({
  messages,
}: Props) {

const bottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: 'smooth',
  });
}, [messages]);

  return (
<div className="flex min-h-full flex-col gap-4 p-6">

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
          message={msg.messageText}
          createdAt={msg.createdAt}
	  status={msg.status}
        />
      ))}
	<div ref={bottomRef} />
	</div>

    </div>
  );
}

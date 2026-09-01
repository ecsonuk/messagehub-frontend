'use client';

import { useEffect, useRef, useState } from 'react';
import ConversationList from '@/components/conversations/ConversationList';
import ChatHeader from '@/components/conversations/ChatHeader';
import MessageList from '@/components/conversations/MessageList';
import MessageInput from '@/components/conversations/MessageInput';

type Conversation = {
  whatsappNumber: string;
  customerName: string;
  campaignName: string | null;
  status: string;
  lastInboundMessage: string | null;
  lastInboundAt: string | null;
};

export default function ConversationsPage() {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [selectedConversation, setSelectedConversation] = useState<any[]>([]);
	const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
	const [selectedCustomerName, setSelectedCustomerName] =  useState('');
	const [message, setMessage] = useState('');
	const [sending, setSending] = useState(false);
	const [loadingConversation, setLoadingConversation] = useState(false);
	const [search, setSearch] = useState('');
	const [unread, setUnread] = useState<Record<string, boolean>>({});

const notificationSound = useRef<HTMLAudioElement | null>(null);
const chatScrollRef = useRef<HTMLDivElement>(null);
const bottomRef = useRef<HTMLDivElement>(null);

const autoScrollRef = useRef(true);
const selectedConversationTimestampRef =
  useRef<string | null>(null);


useEffect(() => {
  notificationSound.current = new Audio('/sounds/notification.mp3');
}, []);

function handleChatScroll() {
  const el = chatScrollRef.current;

  if (!el) return;

  const distanceFromBottom =
    el.scrollHeight -
    el.scrollTop -
    el.clientHeight;

  autoScrollRef.current =
    distanceFromBottom < 80;
}

  useEffect(() => {
    const token = localStorage.getItem('access_token');

fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log('API Response:', data);
    setConversations(data);
  })
  .catch(console.error);


  }, []);

// ADD THE NEW useEffect HERE

useEffect(() => {
  const interval = setInterval(async () => {
    const token = localStorage.getItem('access_token');

    const response = await fetch(
	`${process.env.NEXT_PUBLIC_API_URL}/conversations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

setConversations((previous) => {
  data.forEach((item: Conversation) => {
    const oldItem = previous.find(
      (p) => p.whatsappNumber === item.whatsappNumber,
    );

if (
  oldItem &&
  oldItem.lastInboundAt !== item.lastInboundAt &&
  item.whatsappNumber !== selectedCustomer
) {
  setUnread((u) => ({
    ...u,
    [item.whatsappNumber]: true,
  }));

notificationSound.current?.play().catch(() => {});
}

  });

  return data;
});

if (selectedCustomer) {

  const selectedItem = data.find(
    (item: Conversation) =>
      item.whatsappNumber === selectedCustomer,
  );

  if (
    selectedItem &&
    selectedConversationTimestampRef.current !==
      selectedItem.lastInboundAt
  ) {

    selectedConversationTimestampRef.current =
      selectedItem.lastInboundAt;

    await loadConversation(
      selectedCustomer,
      selectedCustomerName,
    );

    requestAnimationFrame(() => {
      if (autoScrollRef.current) {
        bottomRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });

  }

}

  }, 30000);

  return () => clearInterval(interval);
}, [selectedCustomer, selectedCustomerName]);

  async function loadConversation(number: string, customerName: string,) {

    // Immediately update UI
    setSelectedCustomer(number);
    setSelectedCustomerName(customerName);
    setLoadingConversation(true);
    setUnread((u) => ({
      ...u,
      [number]: false,
    }));

    const token = localStorage.getItem('access_token');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/conversations/${number}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    setSelectedConversation(data);
    setLoadingConversation(false);
    requestAnimationFrame(() => {
      if (autoScrollRef.current) {
        bottomRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });

}
async function sendMessage() {
  if (!selectedCustomer || !message.trim()) {
    return;
  }

  setSending(true);

  const token = localStorage.getItem('access_token');

  const response = await fetch(
	`${process.env.NEXT_PUBLIC_API_URL}/conversations/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        whatsappNumber: selectedCustomer,
        message,
      }),
    },
  );

  const result = await response.json();

if (result.success) {
  setMessage('');

  await loadConversation(
    selectedCustomer,
    selectedCustomerName,
  );

  const token = localStorage.getItem('access_token');

  const response = await fetch(
	`${process.env.NEXT_PUBLIC_API_URL}/conversations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  setConversations(data);
}

  setSending(false);
}

return (

	<div className="h-[calc(100vh-120px)] flex flex-col px-8 py-4 max-w-[1800px] mx-auto">
	<div className="grid flex-1 min-h-0 grid-cols-12 gap-4 rounded-xl bg-transparent">
	<div className="col-span-5 flex flex-col rounded-xl border bg-white shadow-sm overflow-hidden">

	<div className="p-3 border-b">
	  <input
	    type="text"
	    placeholder="Search customer..."
	    value={search}
	    onChange={(e) => setSearch(e.target.value)}
	    className="w-full rounded-xl border px-4 py-3 text-sm"
	  />
	</div>


<div className="flex-1 min-h-0 overflow-hidden">
  <ConversationList
    conversations={conversations.filter((item) => {
      const value = search.toLowerCase();

      return (
        item.customerName?.toLowerCase().includes(value) ||
        item.whatsappNumber.includes(value)
      );
    })}
    selectedCustomer={selectedCustomer}
    unread={unread}
    onSelect={loadConversation}
  />
</div>

</div>

      {/* RIGHT PANEL */}

	<div className="col-span-7 flex min-h-0 flex-col rounded-xl border bg-white shadow-sm overflow-hidden">

        {!selectedCustomer && (

          <div className="flex flex-1 items-center justify-center text-gray-500">

            Select a conversation

          </div>

        )}

        {selectedCustomer && (

          <>

	<ChatHeader
	  customerName={selectedCustomerName}
	  whatsappNumber={selectedCustomer!}
	/>

            {/* CHAT */}
<div
  ref={chatScrollRef}
  onScroll={handleChatScroll}
  className="flex-1 overflow-y-auto px-10 py-8"
>

{loadingConversation ? (
  <div className="flex h-full items-center justify-center text-gray-500">
    Loading conversation...
  </div>
) : (
  <MessageList
    messages={selectedConversation}
    bottomRef={bottomRef}
  />
)}

            </div>

            {/* INPUT */}

	<MessageInput
	  message={message}
	  sending={sending}
	  onChange={setMessage}
	  onSend={sendMessage}
	/>

          </>

        )}

      </div>

    </div>

  </div>
);

}

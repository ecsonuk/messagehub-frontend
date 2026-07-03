'use client';

import { useEffect, useState } from 'react';
import ConversationList from '@/components/conversations/ConversationList';
import ChatHeader from '@/components/conversations/ChatHeader';
import MessageList from '@/components/conversations/MessageList';
import MessageInput from '@/components/conversations/MessageInput';

type Conversation = {
  whatsappNumber: string;
  customerName: string;
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
	const [search, setSearch] = useState('');
	const [unread, setUnread] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');

fetch('http://localhost:3000/conversations', {
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
      'http://localhost:3000/conversations',
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
    }
  });

  return data;
});

    if (selectedCustomer) {
      await loadConversation(
        selectedCustomer,
        selectedCustomerName,
      );
    }
  }, 5000);

  return () => clearInterval(interval);
}, [selectedCustomer, selectedCustomerName]);

async function loadConversation(number: string, customerName: string,) {
  const token = localStorage.getItem('access_token');

  const response = await fetch(
    `http://localhost:3000/conversations/${number}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  setSelectedCustomer(number);
  setSelectedCustomerName(customerName);
  setSelectedConversation(data);
	setUnread((u) => ({
	  ...u,
	  [number]: false,
	}));

}

async function sendMessage() {
  if (!selectedCustomer || !message.trim()) {
    return;
  }

  setSending(true);

  const token = localStorage.getItem('access_token');

  const response = await fetch(
    'http://localhost:3000/conversations/send',
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
    'http://localhost:3000/conversations',
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
  <div className="h-[calc(100vh-170px)] flex flex-col p-6">
	<h1 className="text-3xl font-semibold mb-5">
      Customer Inbox
    </h1>

	<div className="grid flex-1 min-h-0 grid-cols-12 overflow-hidden rounded-lg border bg-white">
	<div className="col-span-4 border-r flex flex-col">

	<div className="p-3 border-b">
	  <input
	    type="text"
	    placeholder="Search customer..."
	    value={search}
	    onChange={(e) => setSearch(e.target.value)}
	    className="w-full rounded-lg border px-3 py-2 text-sm"
	  />
	</div>

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

      {/* RIGHT PANEL */}

	<div className="col-span-8 flex min-h-0 flex-col">

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

	<div className="flex-1 overflow-y-auto p-6">
	<MessageList
	  messages={selectedConversation}
	/>

	<div id="chat-bottom" />

	<div id="chat-bottom" />

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

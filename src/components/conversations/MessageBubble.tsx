import linkify from '@/utils/linkify';

type Props = {
  direction: string;

  messageText: string | null;

  messageType?: string;

  mediaType?: string;

  metaMediaId?: string;

  fileName?: string;

  mimeType?: string;

  status?: string;

  createdAt: string;
};

export default function MessageBubble({
  direction,
  messageText,
  messageType,
  mediaType,
  metaMediaId,
  fileName,
  mimeType,
  createdAt,
  status,
}: Props) {

    const outgoing = direction === 'OUTBOUND';

    async function downloadMedia() {
      if (!metaMediaId) {
        return;
      }

      const token = localStorage.getItem('access_token');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations/media/${metaMediaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        alert('Unable to download file.');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName ?? 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }

    return (

    <div
      className={`flex ${
        outgoing
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
	className={`max-w-[88%] rounded-2xl px-6 py-4 shadow-sm ${
          outgoing
            ? 'bg-green-100'
            : 'bg-white border'
        }`}
      >

{mediaType ? (
	<button
	  type="button"
	  onClick={downloadMedia}
	  className="block w-full cursor-pointer rounded-lg border bg-white p-3 text-left transition hover:bg-gray-50 hover:shadow-md"
	>
    <div className="font-medium">

      {mediaType === 'DOCUMENT' && '📄'}
      {mediaType === 'IMAGE' && '🖼️'}
      {mediaType === 'AUDIO' && '🎵'}
      {mediaType === 'VIDEO' && '🎥'}
      {' '}

      {fileName ?? mediaType}

    </div>

    <div className="mt-2 text-xs text-blue-600">

      Download

    </div>

  </button>

) : (
<p className="whitespace-pre-wrap break-words">
  {linkify(messageText ?? '')}
</p>
)}

<div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-500">

  <span>
    {new Date(createdAt).toLocaleString()}
  </span>

{direction === 'OUTBOUND' && (
  <span
    className={
      status === 'READ'
        ? 'text-blue-500'
        : status === 'FAILED'
        ? 'text-red-500'
        : 'text-gray-500'
    }
  >
    {status === 'READ'
      ? '✓✓'
      : status === 'DELIVERED'
      ? '✓✓'
      : status === 'FAILED'
      ? '⚠'
      : '✓'}
  </span>
)}

</div>


      </div>
    </div>
  );
}

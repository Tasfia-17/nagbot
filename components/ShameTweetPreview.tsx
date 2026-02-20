'use client';

interface ShameTweetPreviewProps {
  text: string;
  handle?: string;
}

export default function ShameTweetPreview({ text, handle = 'yourhandle' }: ShameTweetPreviewProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 max-w-xl">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
          👤
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">You</span>
            <span className="text-gray-500">@{handle}</span>
            <span className="text-gray-500">· now</span>
          </div>
          <p className="text-gray-900 mt-2 whitespace-pre-wrap">
            {text || 'Your shame tweet will appear here...'}
          </p>
          <div className="flex gap-6 mt-3 text-gray-500">
            <button className="hover:text-blue-500">💬</button>
            <button className="hover:text-green-500">🔁</button>
            <button className="hover:text-red-500">❤️</button>
            <button className="hover:text-blue-500">📤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

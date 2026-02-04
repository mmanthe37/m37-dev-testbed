import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
// STUB: import { sendChatMessage } from '@/api/client';
// STUB: import { fetchVehicleById } from '@/api/client';
import { Send, Bot, User, FileText, CheckCircle } from 'lucide-react';
import { KnowledgeAttestation } from '@gear-ai/ts-types'; // Assuming this is defined

// --- MOCK API & TYPES for demonstration ---
// In a real scenario, these would be in their respective files.
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: any[];
  attestation?: KnowledgeAttestation;
}
const fetchVehicleById = async (id: string) => ({ id, make: 'Honda', model: 'Accord', year: 2021 });
const sendChatMessage = async (payload: any): Promise<ChatMessage> => {
    console.log('Sending chat message:', payload);
    await new Promise(res => setTimeout(res, 1500)); // Simulate network delay
    return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: `Based on the 2021 Honda Accord manual, the recommended oil type is 0W-20 full synthetic. You should check the owner's manual for specific viscosity grades depending on your climate.`,
        sources: [{ source_type: 'manual', source_name: '2021_honda_accord_manual.pdf', metadata: { page: 347 } }],
        attestation: {
            query: payload.message,
            response: "The AI's full response text...",
            context_hashes: ['hash12345', 'hash67890'],
            timestamp: new Date().toISOString(),
            signature: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random()*16).toString(16)).join(''),
        },
    };
};
// --- END MOCK ---

export function ChatPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data: vehicle } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => fetchVehicleById(vehicleId!),
    enabled: !!vehicleId,
  });

  const chatMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (aiResponse) => {
      setMessages(prev => [...prev, aiResponse]);
    },
    onError: (error) => {
      const errorResponse: ChatMessage = { id: `err-${Date.now()}`, sender: 'ai', text: `Error: ${error.message}` };
      setMessages(prev => [...prev, errorResponse]);
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    chatMutation.mutate({
      userId: 'mock-user-id-12345', // from useAuthStore()
      vehicleId,
      message: input,
    });

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-700 shadow-md bg-gray-800">
        <h1 className="text-xl font-bold">Chat with your {vehicle?.year} {vehicle?.make} {vehicle?.model}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="p-2 bg-blue-600 rounded-full"><Bot className="w-6 h-6" /></div>}
            <div className={`max-w-xl p-4 rounded-lg ${msg.sender === 'user' ? 'bg-gray-700' : 'bg-gray-800 border border-gray-700'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-600 space-y-2">
                    <h4 className="font-semibold text-sm text-gray-400">Sources:</h4>
                    {msg.sources.map((source, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs bg-gray-700 p-2 rounded">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span>{source.source_name} (Page: {source.metadata.page})</span>
                        </div>
                    ))}
                </div>
              )}
              {msg.attestation && (
                <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4"/>
                        <h4 className="font-semibold text-sm">Knowledge Attestation Verified</h4>
                    </div>
                    <p className="text-xs text-gray-500 break-all mt-1">Signature: {msg.attestation.signature}</p>
                </div>
              )}
            </div>
            {msg.sender === 'user' && <div className="p-2 bg-gray-600 rounded-full"><User className="w-6 h-6" /></div>}
          </div>
        ))}
        {chatMutation.isPending && (
            <div className="flex items-start gap-3 justify-start">
                <div className="p-2 bg-blue-600 rounded-full animate-pulse"><Bot className="w-6 h-6" /></div>
                <div className="max-w-xl p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <p className="animate-pulse">The oracle is consulting the archives...</p>
                </div>
            </div>
        )}
      </main>

      <footer className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your vehicle..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatMutation.isPending}
          />
          <button type="submit" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-600" disabled={chatMutation.isPending}>
            <Send className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
}
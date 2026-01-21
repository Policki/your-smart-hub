import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Send, Mic, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickQuestions = [
  'Kaj priporočaš danes?',
  'Razloži moj paket',
  'Kako nastavim snemanje?',
  'Pokaži mojo porabo',
];

const aiResponses: Record<string, string> = {
  'Kaj priporočaš danes?': 'Glede na vaše interese priporočam:\n\n🏎️ **Formula 1 - Velika nagrada Monaka**\nV živo danes ob 15:00\n\n📺 **Stranger Things S5**\nNova sezona je zdaj na voljo!\n\nŽelite, da pošljem na TV?',
  'Razloži moj paket': 'Imate paket **Zconnect Premium**:\n\n📺 200+ TV kanalov\n🎬 HBO Max, Netflix, Disney+\n🌐 500 Mbit/s internet\n📞 Neomejeni klici\n\nMesečna cena: 59,90€\n\n💡 Glede na vašo porabo bi vam bolj ustrezal paket Premium Light za 51,90€. Želite več informacij?',
  'Kako nastavim snemanje?': 'Snemanje nastavite tako:\n\n1️⃣ Odprite TV vodič\n2️⃣ Izberite oddajo\n3️⃣ Pritisnite gumb "Snemaj"\n\nAli naj vam pokažem na daljavo? Lahko tudi nastavim avtomatsko snemanje za vaše najljubše oddaje.',
  'Pokaži mojo porabo': 'Vaša poraba ta mesec:\n\n📺 **TV:** 23 ur\n- Največ: Šport (12h), Filmi (6h)\n\n🌐 **Internet:** 45 GB od 100 GB\n- Največ: Streaming (30 GB)\n\n✅ Ste v okviru paketa!\n\nŽelite podrobnejšo analizo?',
};

export default function Assistant() {
  const { preferences } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Živjo ${preferences.name || 'uporabnik'}! 👋\n\nSem vaš AI asistent. Kako vam lahko pomagam danes?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = aiResponses[text] || 
        `Razumem vašo zahtevo. Na to temo vam lahko pomagam na več načinov:\n\n1. Preverim vaše nastavitve\n2. Poiščem ustrezne vsebine\n3. Prilagodim priporočila\n\nKaj želite, da storim?`;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-border bg-card/80 backdrop-blur-xl">
        <Link to="/home">
          <motion.div whileTap={{ scale: 0.95 }} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.div>
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-semibold">AI Asistent</h1>
            <p className="text-xs text-muted-foreground">Vedno na voljo</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-5 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'gradient-bg text-white rounded-br-md'
                    : 'bg-card border border-border rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {messages.length <= 2 && (
        <div className="px-5 py-2 flex gap-2 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q) => (
            <motion.button
              key={q}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
            >
              {q}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-4 border-t border-border bg-card/80 backdrop-blur-xl safe-area-bottom">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
          >
            <Mic className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Vprašajte karkoli..."
              className="w-full px-5 py-3 bg-secondary rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

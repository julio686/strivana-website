import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const predefinedResponses: Record<string, string> = {
  'pricing': 'Our pricing is transparent: Starter VAs at $10-12/hour, Professional at $13-17/hour, and Executive at $18+/hour. This includes everything – no setup fees, no hidden costs. You pay the hourly rate directly to your VA. We charge a one-time flat placement fee only after you hire.',
  'hours': 'Our VAs work in your time zone (US/Canada hours). They provide same-day turnaround for most tasks during business hours (9 AM - 6 PM). Executive plans offer extended or 24/7 availability.',
  'services': 'We offer comprehensive virtual assistant services: Email & Calendar Management, Travel Planning, Social Media Management, Customer Service, Data Entry, Research, Bookkeeping, and Executive Assistance. Need something specific? Just ask!',
  'start': 'Getting started takes 3 simple steps: 1) Fill out the contact form, 2) We match you with 2-3 pre-vetted VAs, 3) Interview and hire your favorite. You can start working within 24-48 hours.',
  'security': 'Security is our priority. All VAs sign NDAs, use secure communication channels, and follow strict data protection protocols. We are GDPR compliant and can accommodate HIPAA requirements for healthcare clients.',
  'location': 'Our VAs are university-educated professionals from Latin America (Colombia, Mexico, Argentina, etc.). They work in US/Canada time zones with fluent English and strong cultural alignment.',
  'vetting': 'Our vetting process is rigorous: English fluency testing, background checks, skills assessments, and multiple interviews. Only the top 5% of applicants are accepted to our network.',
  'cancel': 'We offer flexible arrangements with no long-term contracts. You can adjust hours, change VAs, or pause service with 7 days notice. New clients get a 7-day satisfaction guarantee.',
  'consultation': 'Schedule a free consultation by filling out the contact form or clicking "Schedule a Consultation." We will get back to you within 24 hours to discuss your needs and match you with the perfect VA.',
  'fee': 'We charge a one-time flat placement fee ONLY after you successfully hire. There are no ongoing agency fees, no monthly charges. You pay your VA directly – they keep 100% of their hourly rate.',
  'pay': 'You pay your VA directly via bank transfer, PayPal, or other agreed method. We handle all the compliance, contracts, and paperwork. Simple and transparent.',
  'trial': 'Yes! We offer a 7-day satisfaction guarantee. If you are not satisfied with your VA in the first week, we will find you a replacement at no additional cost.',
  'english': 'All our VAs are fluent English speakers with minimal accents. They submit voice recordings during application, and we only accept those with excellent communication skills.',
};

const suggestedQuestions = [
  'What are your pricing plans?',
  'How does the placement fee work?',
  'How do I get started?',
  'What if I am not satisfied?',
  'How do you vet your VAs?',
];

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am Ghost, your AI Marketing Director at Strivana. I have 20+ years of experience in brand building and lead generation. How can I help you today? Ask me about our virtual assistant services, pricing, or how we can help grow your business!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Check for common variations
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return predefinedResponses['pricing'];
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Welcome to Strivana. I am here to help you with any questions about our virtual assistant services. What would you like to know?';
    }
    if (lowerMessage.includes('thank')) {
      return 'You are welcome! Is there anything else I can help you with?';
    }
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return 'Thank you for chatting with us! Feel free to reach out anytime. Have a great day!';
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return 'You can reach us at info@strivanallc.com. Fill out the contact form on our website and we will get back to you within 24 hours.';
    }

    // Default response
    return 'I apologize, but I do not have specific information about that. For detailed assistance, please fill out our contact form or schedule a free consultation. Our team will be happy to help you with any specific questions!';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateResponse(userMessage.content);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="bg-strivana-purple p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-white">Ghost AI</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/80">Your Marketing Director</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-strivana-purple' : 'bg-strivana-purple-light'
            }`}>
              {message.role === 'user' ? (
                <User size={14} className="text-white" />
              ) : (
                <Sparkles size={14} className="text-strivana-purple" />
              )}
            </div>
            <div className={`max-w-[75%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block px-4 py-2.5 rounded-2xl text-sm ${
                  message.role === 'user'
                    ? 'bg-strivana-purple text-white rounded-br-sm'
                    : 'bg-white text-strivana-dark rounded-bl-sm shadow-soft'
                }`}
              >
                {message.content}
              </div>
              <div className={`text-xs text-gray-400 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-strivana-purple-light flex items-center justify-center">
              <Sparkles size={14} className="text-strivana-purple" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-soft">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-strivana-purple/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-strivana-purple/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-strivana-purple/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length < 3 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-strivana-gray hover:border-strivana-purple hover:text-strivana-purple transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-strivana-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-strivana-purple/20 focus:bg-white transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-strivana-purple text-white rounded-full flex items-center justify-center hover:bg-strivana-purple-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

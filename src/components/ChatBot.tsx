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
  'pricing': 'Our pricing starts at $10-12/hour for the Starter plan, $13-17/hour for Professional, and $18+/hour for Executive. All plans are month-to-month with no long-term contracts. Would you like to schedule a consultation to discuss which plan fits your needs?',
  'hours': 'Our VAs work in US and Canada time zones, providing same-day turnaround for most tasks. Starter and Professional plans include business hours support (9 AM - 6 PM), while our Executive plan offers extended or 24/7 availability.',
  'services': 'We offer a wide range of services including: Travel Planning, Appointment Scheduling, Personal Shopping, Research Assistance, Email Management, and Social Media Management. We also provide specialized support for Executive Assistance, Sales & Marketing, Bookkeeping, and Project Management.',
  'start': 'Getting started is easy! Simply fill out the contact form or schedule a free consultation. During the call, we will discuss your needs, match you with the perfect VA, and you can start working within 24-48 hours.',
  'security': 'We take data security very seriously. All our VAs sign comprehensive NDAs, and we use enterprise-grade encryption for all communications. Our systems are GDPR and HIPAA compliant where applicable.',
  'location': 'Our VAs are based in Latin America (Colombia, Mexico, Argentina) and work in US/Canada time zones. This allows us to provide same-day turnaround while offering 70% cost savings compared to local hiring.',
  'vetting': 'All our VAs go through a rigorous selection process including background checks, skills assessments, and multiple interviews. They are university-educated professionals with at least 3 years of experience.',
  'cancel': 'We offer flexible month-to-month contracts. You can upgrade, downgrade, or cancel your plan at any time with 7 days notice. We also provide a 7-day satisfaction guarantee for new clients.',
  'consultation': 'You can schedule a free consultation by clicking the "Schedule a Consultation" button on our website, or by filling out the contact form. We will get back to you within 24 hours to set up a time that works for you.',
};

const suggestedQuestions = [
  'What are your pricing plans?',
  'What services do you offer?',
  'How do I get started?',
  'What are your working hours?',
  'How do you ensure data security?',
];

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am Strivana AI Assistant. How can I help you today? Feel free to ask about our services, pricing, or how to get started!',
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
      return 'You can reach us at hello@strivana.com or call us at +1 (555) 123-4567. You can also fill out the contact form on our website and we will get back to you within 24 hours.';
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
            <h4 className="font-display font-semibold text-white">Strivana AI</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/80">Online</span>
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

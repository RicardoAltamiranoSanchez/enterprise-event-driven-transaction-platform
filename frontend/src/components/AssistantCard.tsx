import { useState } from 'react';
import { summarizeText } from '../services/api';
import { Loader2, Copy, Bot, Sparkles, Check } from 'lucide-react';

const AssistantCard = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isSimulated, setIsSimulated] = useState(false);

    const handleSummarize = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setSummary('');
        setCopied(false);
        setIsSimulated(false);

        try {
            const response = await summarizeText(text);
            setSummary(response.summary);
            
            // Check if simulated based on response content
            if (response.summary.includes('Resumen simulado') || response.summary.includes('IA no configurada')) {
                setIsSimulated(true);
            }
        } catch (error) {
            console.error('Error summarizing text:', error);
            setSummary('Error al generar el resumen. Por favor intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!summary) return;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-transparent mt-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                    <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">AI Assistant</h3>
                    <p className="text-sm text-gray-500">Powered by OpenAI</p>
                </div>
            </div>
            
            <div className="space-y-6">
                <div>
                    <textarea
                        className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-base text-gray-700 placeholder-gray-400 bg-white"
                        rows={6}
                        placeholder="Paste the document or text you want to analyze and summarize..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSummarize}
                        disabled={loading || !text.trim()}
                        className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                            loading || !text.trim()
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30'
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing Document...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                                <span>Generate Summary</span>
                            </>
                        )}
                    </button>
                </div>

                {summary && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-4">
                            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                isSimulated 
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-emerald-100 text-emerald-700'
                            }`}>
                                {isSimulated ? 'Simulated Result' : 'AI Generated'}
                            </span>
                            
                            <button 
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg"
                                title="Copy to clipboard"
                            >
                                {copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                            </button>
                        </div>
                        
                        <div className="prose prose-slate max-w-none">
                            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {summary}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssistantCard;

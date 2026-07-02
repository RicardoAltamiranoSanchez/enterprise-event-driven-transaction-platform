import { useState } from 'react';
import { triggerRpa } from '../services/api';
import { Loader2, Play, Search, CheckCircle, AlertCircle, Bot } from 'lucide-react';

const RpaCard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRunRpa = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        setResult(null);
        setError('');

        try {
            const response = await triggerRpa(searchTerm);
            setResult(response);
        } catch (err: any) {
            console.error('Error running RPA:', err);
            setError('Error al ejecutar el RPA. Verifique que el servicio esté activo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-transparent mt-2">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                    <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">RPA System Bot</h3>
                    <p className="text-sm text-gray-500 font-medium">Task Automation & Web Scraping</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-base text-gray-700 placeholder-gray-400 bg-white"
                        placeholder="Enter search term to automate workflow..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleRunRpa}
                        disabled={loading || !searchTerm.trim()}
                        className={`inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-bold transition-all duration-300 ${
                            loading || !searchTerm.trim()
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5'
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Executing Bot...</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 fill-current" />
                                <span>Run Automation</span>
                            </>
                        )}
                    </button>
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-4 border border-red-100">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {result && result.status === 'success' && (
                    <div className="mt-8 p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-2 mb-6 text-emerald-700 font-bold border-b border-emerald-100 pb-4">
                            <CheckCircle className="w-6 h-6" />
                            <h4 className="text-lg">Process Completed</h4>
                        </div>
                        
                        <div className="space-y-4 text-sm text-gray-700">
                            <div className="flex justify-between border-b border-emerald-50 pb-3">
                                <span className="text-gray-500">Action:</span>
                                <span className="font-semibold text-slate-800">Wiki Search & Summarize</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-50 pb-3">
                                <span className="text-gray-500">Status:</span>
                                <span className="font-semibold text-emerald-600">Summary Generated</span>
                            </div>
                            
                            <div className="pt-2">
                                <span className="text-gray-500 font-medium block mb-2">Original Text (Wikipedia):</span>
                                <p className="text-gray-600 bg-white p-4 rounded-xl border border-emerald-100/50 text-sm leading-relaxed max-h-32 overflow-y-auto shadow-sm">
                                    "{result.data.original_text}"
                                </p>
                            </div>

                            <div className="pt-2">
                                <span className="text-gray-500 font-medium block mb-2">AI Response (/assistant/summarize):</span>
                                <p className="text-gray-700 italic bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-sm leading-relaxed shadow-sm">
                                    "{result.data.wiki_summary}"
                                </p>
                            </div>
                            
                            {result.data.steps && result.data.steps.length > 0 && (
                                <div className="pt-4 mt-4 border-t border-emerald-100">
                                    <span className="text-gray-500 font-medium block mb-3">RPA Execution Logs:</span>
                                    <div className="bg-slate-900 p-4 rounded-xl text-xs space-y-2 font-mono text-slate-300 shadow-inner">
                                        {result.data.steps.map((step: string, idx: number) => (
                                            <div key={idx} className="flex gap-3">
                                                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                                <span className="opacity-90">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RpaCard;

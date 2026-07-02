
import AssistantCard from '../components/AssistantCard';

const AssistantView = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Text Summarization</h1>
        <p className="text-slate-500 mt-2">Enterprise-grade natural language processing tool for analyzing and condensing large documents.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white">
        <AssistantCard />
      </div>
    </div>
  );
};

export default AssistantView;

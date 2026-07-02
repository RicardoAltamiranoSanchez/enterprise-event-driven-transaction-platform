
import RpaCard from '../components/RpaCard';

const RpaView = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">RPA Automation</h1>
        <p className="text-slate-500 mt-2">Trigger internal Playwright bots to fetch, parse, and process external data securely.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white">
        <RpaCard />
      </div>
    </div>
  );
};

export default RpaView;

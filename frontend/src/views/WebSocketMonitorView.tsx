import { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Activity, Terminal } from 'lucide-react';

const WebSocketMonitorView = () => {
  const lastMessage = useWebSocket();
  const [logs, setLogs] = useState<{ id: string; time: string; msg: string; data: any }[]>([]);

  useEffect(() => {
    if (lastMessage) {
      setLogs((prev) => [
        {
          id: Math.random().toString(),
          time: new Date().toLocaleTimeString(),
          msg: `Event received: ${lastMessage.type}`,
          data: lastMessage.data
        },
        ...prev
      ].slice(0, 50)); // keep last 50 logs
    }
  }, [lastMessage]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Event Monitor</h1>
          <p className="text-slate-500 mt-2">Real-time WebSocket connection to backend services.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold tracking-wide">WS CONNECTED</span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden flex-1 min-h-[500px] flex flex-col">
        <div className="bg-slate-950 px-4 py-3 flex items-center gap-3 border-b border-slate-800">
            <Terminal className="w-5 h-5 text-slate-500" />
            <span className="text-slate-400 font-mono text-sm">monitor@enterprise-platform:~$ tail -f /var/log/ws-events.log</span>
        </div>
        <div className="p-6 font-mono text-sm text-slate-300 overflow-y-auto flex-1 space-y-4">
            {logs.length === 0 ? (
                <div className="text-slate-500 italic flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-spin" />
                    Waiting for incoming events...
                </div>
            ) : (
                logs.map(log => (
                    <div key={log.id} className="border-l-2 border-slate-700 pl-4 py-1">
                        <div className="text-blue-400 mb-1">[{log.time}] <span className="text-green-400">{log.msg}</span></div>
                        <pre className="text-xs bg-slate-950 p-3 rounded-lg overflow-x-auto text-slate-400 border border-slate-800/50">
                            {JSON.stringify(log.data, null, 2)}
                        </pre>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default WebSocketMonitorView;

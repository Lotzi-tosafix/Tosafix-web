
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { Wifi, Globe, Clock, Activity, Network, Zap, Play, CheckCircle, AlertTriangle, XCircle, RotateCw } from 'lucide-react';

type TestStatus = 'idle' | 'running' | 'success' | 'warning' | 'error';

interface TestResult {
  id: string;
  labelKey: string;
  status: TestStatus;
  result?: React.ReactNode;
  icon: React.ElementType;
}

const FixChecker = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isRunning, setIsRunning] = useState(false);
  
  const [results, setResults] = useState<{ [key: string]: { status: TestStatus, result?: React.ReactNode } }>({
    connect: { status: 'idle' },
    isp: { status: 'idle' },
    time: { status: 'idle' },
    ping: { status: 'idle' },
    ipv6: { status: 'idle' },
    speed: { status: 'idle' },
  });

  const updateResult = (id: string, status: TestStatus, result?: React.ReactNode) => {
    setResults(prev => ({
      ...prev,
      [id]: { status, result }
    }));
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // Reset all
    Object.keys(results).forEach(key => updateResult(key, 'running', t.statusChecking));

    // 1. Connection Check
    try {
      await fetch('https://www.gstatic.com/generate_204', { mode: 'no-cors', cache: 'no-store' });
      updateResult('connect', 'success', t.resConnected);
    } catch (e) {
      updateResult('connect', 'error', t.resNoConnection);
      setIsRunning(false);
      return; // Stop if no connection
    }

    // 2. ISP Check
    try {
      const res = await fetch('https://ipapi.co/json/');
      if(!res.ok) throw new Error();
      const data = await res.json();
      updateResult('isp', 'success', (
        <span className="flex flex-col text-sm">
          <span className="font-bold ltr:text-left rtl:text-right" dir="ltr">{data.org}</span>
          <span className="text-xs opacity-80 ltr:text-left rtl:text-right" dir="ltr">{data.ip} ({data.country_name})</span>
        </span>
      ));
    } catch (e) {
       try {
            const res2 = await fetch('https://api.db-ip.com/v2/free/self');
            const data2 = await res2.json();
            updateResult('isp', 'success', (
                 <span className="flex flex-col text-sm">
                    <span className="ltr:text-left rtl:text-right" dir="ltr">{data2.ipAddress}</span>
                    <span className="text-xs opacity-80 ltr:text-left rtl:text-right" dir="ltr">{data2.countryName}</span>
                </span>
            ));
        } catch(err) {
            updateResult('isp', 'warning', 'Unknown ISP');
        }
    }

    // 3. Time Sync Check (Using Vercel Server)
    try {
        const clientTime = Date.now();
        const res = await fetch('/api/time');
        if (!res.ok) throw new Error('Time API failed');
        const data = await res.json();
        const serverTime = data.serverTime;
        
        // Calculate diff accounting for network latency (roughly)
        // We assume request took X ms, so server time was captured X/2 ms ago
        // But for simple sync check, just raw diff is usually enough if latency is low.
        const diff = Math.abs(clientTime - serverTime);

        if (diff < 90000) { // 1.5 minutes tolerance
            updateResult('time', 'success', t.resTimeSynced);
        } else {
            const diffMin = Math.round(diff / 60000);
             // Replace placeholder {diff} manually since simple templating isn't set up
            const msg = t.resTimeError.replace('{diff}', diffMin.toString());
            updateResult('time', 'error', msg);
        }
    } catch (e) {
        updateResult('time', 'warning', t.resTimeFetchError);
    }


    // 4. Ping Check
    try {
        const start = performance.now();
        await fetch('https://www.cloudflare.com/cdn-cgi/trace', { cache: "no-store" });
        const end = performance.now();
        const ping = Math.round(end - start);
        
        let status: TestStatus = 'success';
        let text = `${ping} ms`;

        if (ping > 150) { 
            status = 'warning'; 
            text += ` (${t.resPingSlow})`; 
        }
        if (ping > 500) { 
            status = 'error'; 
            text += ` (${t.resPingVerySlow})`; 
        }
        updateResult('ping', status, <span dir="ltr">{text}</span>);

    } catch (e) {
        updateResult('ping', 'error', t.resPingError);
    }

    // 5. IPv6 Check
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        await fetch('https://ipv6.google.com', { mode: 'no-cors', signal: controller.signal });
        clearTimeout(timeoutId);
        updateResult('ipv6', 'success', t.resIPv6Supported);
    } catch (e) {
        updateResult('ipv6', 'warning', t.resIPv6NotSupported);
    }

    // 6. Speed Test
    try {
        const baseFileUrl = "https://upload.wikimedia.org/wikipedia/commons/f/fc/Crown_of_Thorns_Starfish_at_Malapascuas_Island_v._II.jpg";
        const testFile = baseFileUrl + "?t=" + Date.now();
        
        const startTime = performance.now();
        const response = await fetch(testFile);
        const blob = await response.blob();
        const endTime = performance.now();

        const durationSeconds = (endTime - startTime) / 1000;
        const sizeInBits = blob.size * 8;
        const speedBps = sizeInBits / durationSeconds;
        const speedMbps = speedBps / (1024 * 1024); 
        const speedFixed = speedMbps.toFixed(2);

        let diagnosis = "";
        let status: TestStatus = "success";

        if (speedMbps > 40) diagnosis = t.resSpeedExcellent;
        else if (speedMbps > 15) diagnosis = t.resSpeedGood;
        else if (speedMbps > 5) { diagnosis = t.resSpeedFair; status = "warning"; }
        else { diagnosis = t.resSpeedPoor; status = "error"; }

        updateResult('speed', status, (
            <div className="flex flex-col">
                <span className="font-bold text-lg ltr:text-left rtl:text-right" dir="ltr">{speedFixed} Mbps</span>
                <span className="text-xs opacity-80">{diagnosis}</span>
            </div>
        ));

    } catch (e) {
        updateResult('speed', 'error', t.resSpeedError);
    }

    setIsRunning(false);
  };

  const testList: TestResult[] = [
    { id: 'connect', labelKey: 'testConnection', status: results.connect.status, result: results.connect.result, icon: Wifi },
    { id: 'isp', labelKey: 'testISP', status: results.isp.status, result: results.isp.result, icon: Globe },
    { id: 'time', labelKey: 'testTime', status: results.time.status, result: results.time.result, icon: Clock },
    { id: 'ping', labelKey: 'testPing', status: results.ping.status, result: results.ping.result, icon: Activity },
    { id: 'ipv6', labelKey: 'testIPv6', status: results.ipv6.status, result: results.ipv6.result, icon: Network },
    { id: 'speed', labelKey: 'testSpeed', status: results.speed.status, result: results.speed.result, icon: Zap },
  ];

  const getStatusColor = (status: TestStatus) => {
      switch(status) {
          case 'success': return 'text-green-500 bg-green-500/10 border-green-500/20';
          case 'warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
          case 'error': return 'text-red-500 bg-red-500/10 border-red-500/20';
          case 'running': return 'text-primary bg-primary/10 border-primary/20 animate-pulse';
          default: return 'text-gray-400 bg-gray-500/5 border-gray-500/10';
      }
  };
  
  const getStatusIcon = (status: TestStatus) => {
       switch(status) {
          case 'success': return <CheckCircle size={20} />;
          case 'warning': return <AlertTriangle size={20} />;
          case 'error': return <XCircle size={20} />;
          case 'running': return <RotateCw size={20} className="animate-spin" />;
          default: return null;
      }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
            <div className="inline-block p-4 rounded-[2rem] glass-card mb-6">
                 <Activity className="w-12 h-12 text-accent mx-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark dark:text-text-light font-rubik">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{t.fixCheckerPageTitle}</span>
            </h1>
            <p className="mt-4 text-xl text-text-dark/70 dark:text-text-light/70 font-light max-w-2xl mx-auto">{t.fixCheckerPageSubtitle}</p>
        </header>

        <main className="glass-card rounded-[3rem] p-6 md:p-12 border border-white/40 dark:border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testList.map((test) => {
                    const Icon = test.icon;
                    const statusClass = getStatusColor(test.status);
                    
                    return (
                        <motion.div 
                            key={test.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-6 rounded-2xl border flex flex-col items-center text-center justify-between min-h-[160px] transition-all duration-300 ${statusClass} backdrop-blur-md`}
                        >
                            <div className="mb-3 p-3 rounded-full bg-white/20 dark:bg-black/10">
                                <Icon size={24} />
                            </div>
                            <h3 className="font-bold text-text-dark dark:text-text-light mb-2">{t[test.labelKey as keyof typeof t] as string}</h3>
                            <div className="font-medium text-sm flex items-center justify-center gap-2">
                                {test.status !== 'idle' && getStatusIcon(test.status)}
                                <span>{test.result || (test.status === 'idle' ? t.statusWaiting : '')}</span>
                            </div>
                        </motion.div>
                    );
                })}
             </div>

             <div className="mt-12 text-center relative z-10">
                <button
                    onClick={runDiagnostics}
                    disabled={isRunning}
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRunning ? (
                         <>
                            <RotateCw className="animate-spin w-5 h-5" />
                            {t.runningDiagnostics}
                         </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 fill-current" />
                            {t.startDiagnostics}
                        </>
                    )}
                </button>
             </div>
        </main>
      </div>
    </div>
  );
};

export default FixChecker;

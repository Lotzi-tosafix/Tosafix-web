
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { Wifi, Globe, Clock, Activity, Network, Zap, Play, CheckCircle, AlertTriangle, XCircle, RotateCw, Monitor, Cpu, Laptop, Layers } from 'lucide-react';

type TestStatus = 'idle' | 'running' | 'success' | 'warning' | 'error';

interface TestResult {
  id: string;
  labelKey: string;
  status: TestStatus;
  result?: React.ReactNode;
  icon: React.ElementType;
  fullWidth?: boolean;
}

const getStatusColor = (status: TestStatus) => {
    switch(status) {
        case 'success': return 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20';
        case 'warning': return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';
        case 'error': return 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20';
        case 'running': return 'text-primary bg-primary/10 border-primary/20 animate-pulse';
        default: return 'text-gray-500 dark:text-gray-400 bg-gray-500/5 border-gray-500/10';
    }
};

const getStatusIcon = (status: TestStatus) => {
    switch(status) {
        case 'success': return <CheckCircle size={18} />;
        case 'warning': return <AlertTriangle size={18} />;
        case 'error': return <XCircle size={18} />;
        case 'running': return <RotateCw size={18} className="animate-spin" />;
        default: return null;
    }
};

const TestCard: React.FC<{ test: TestResult, t: any }> = ({ test, t }) => {
    const Icon = test.icon;
    const statusClass = getStatusColor(test.status);
    
    return (
      <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${statusClass} backdrop-blur-md ${test.fullWidth ? 'col-span-1 sm:col-span-2' : ''}`}
      >
          <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 rounded-full bg-white/40 dark:bg-black/20 flex-shrink-0">
                  <Icon size={20} />
              </div>
              <div className="flex flex-col text-start overflow-hidden">
                   <h3 className="font-bold text-sm text-text-dark dark:text-text-light whitespace-nowrap">{t[test.labelKey as keyof typeof t] as string}</h3>
                   {test.status !== 'idle' && (
                       <div className="font-medium text-sm mt-0.5 truncate">
                           {test.result}
                       </div>
                   )}
                   {test.status === 'idle' && (
                       <div className="font-medium text-sm mt-0.5 opacity-50">-</div>
                   )}
              </div>
          </div>
           {test.status !== 'idle' && (
               <div className="flex-shrink-0 ms-2">
                   {getStatusIcon(test.status)}
               </div>
           )}
      </motion.div>
    );
};

const LtrText: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <span className="ltr:text-left rtl:text-right inline-block" dir="ltr">{children}</span>
);

const FixChecker = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isRunning, setIsRunning] = useState(false);
  
  const [results, setResults] = useState<Record<string, { status: TestStatus, result: React.ReactNode }>>({
    browser: { status: 'idle', result: '-' },
    os: { status: 'idle', result: '-' },
    screen: { status: 'idle', result: '-' },
    hardware: { status: 'idle', result: '-' },
    connect: { status: 'idle', result: t.statusWaiting },
    isp: { status: 'idle', result: t.statusWaiting },
    time: { status: 'idle', result: t.statusWaiting },
    ping: { status: 'idle', result: t.statusWaiting },
    jitter: { status: 'idle', result: t.statusWaiting },
    ipv6: { status: 'idle', result: t.statusWaiting },
    speed: { status: 'idle', result: t.statusWaiting },
  });

  const updateResult = (id: string, status: TestStatus, result?: React.ReactNode) => {
    setResults(prev => ({
      ...prev,
      [id]: { status, result }
    }));
  };

  const checkSystemInfo = () => {
      // Browser
      const userAgent = navigator.userAgent;
      let browserName = "Unknown";
      if(userAgent.includes("Edg")) browserName = "Microsoft Edge";
      else if(userAgent.includes("Chrome")) browserName = "Google Chrome";
      else if(userAgent.includes("Firefox")) browserName = "Mozilla Firefox";
      else if(userAgent.includes("Safari")) browserName = "Apple Safari";
      
      updateResult('browser', 'success', <LtrText>{browserName}</LtrText>);

      // OS
      let os = "Unknown";
      if (userAgent.indexOf("Win") !== -1) os = "Windows";
      if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
      if (userAgent.indexOf("Linux") !== -1) os = "Linux";
      if (userAgent.indexOf("Android") !== -1) os = "Android";
      if (userAgent.indexOf("like Mac") !== -1) os = "iOS";
      
      updateResult('os', 'success', os);

      // Screen
      const width = window.screen.width;
      const height = window.screen.height;
      updateResult('screen', 'success', <LtrText>{width} x {height}</LtrText>);

      // Hardware
      const cores = navigator.hardwareConcurrency || "?";
      // @ts-ignore - deviceMemory is not in standard TS types yet
      const ram = navigator.deviceMemory || "?";
      
      let hwStatus: React.ReactNode = "";
      if (typeof ram === 'number' && ram < 4) {
          hwStatus = <span className="block text-xs text-amber-500 font-bold mt-1">{t.resLowRam}</span>;
      }
      
      updateResult('hardware', 'success', (
          <div className="flex flex-col">
            <LtrText>{cores} Cores, ~{ram}GB RAM</LtrText>
            {hwStatus}
          </div>
      ));
  };

  const getPing = async (): Promise<number | null> => {
      const start = performance.now();
      try {
          await fetch('https://www.cloudflare.com/cdn-cgi/trace', { cache: "no-store" });
          return performance.now() - start;
      } catch(e) {
          return null;
      }
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // Set all to checking state
    Object.keys(results).forEach(key => {
        updateResult(key, 'running', t.statusChecking);
    });

    // Run System Info immediately
    checkSystemInfo();

    // 1. Connection Check
    try {
      await fetch('https://www.gstatic.com/generate_204', { mode: 'no-cors', cache: 'no-store' });
      updateResult('connect', 'success', t.resConnected);
    } catch (e) {
      updateResult('connect', 'error', t.resNoConnection);
      setIsRunning(false); // Stop if no internet
      return; 
    }

    // 2. IPv6 Check
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        await fetch('https://ipv6.google.com', { mode: 'no-cors', signal: controller.signal });
        clearTimeout(timeoutId);
        updateResult('ipv6', 'success', t.resIPv6Supported);
    } catch (e) {
        updateResult('ipv6', 'warning', t.resIPv6NotSupported);
    }

    // 3. ISP Check
    try {
      const res = await fetch('https://ipapi.co/json/');
      if(!res.ok) throw new Error();
      const data = await res.json();
      updateResult('isp', 'success', (
        <span className="flex flex-col text-sm">
          <span className="font-bold"><LtrText>{data.org}</LtrText></span>
          <span className="text-xs opacity-80"><LtrText>{data.ip} ({data.country_name})</LtrText></span>
        </span>
      ));
    } catch (e) {
        updateResult('isp', 'warning', 'Unknown ISP');
    }

    // 4. Time Sync Check
    try {
        const r = await fetch('/api/time');
        const d = await r.json();
        const diff = Math.abs(Date.now() - d.serverTime);
        if (diff < 60000) {
            updateResult('time', 'success', t.resTimeSynced);
        } else {
            const diffMin = Math.round(diff / 60000);
            const msg = t.resTimeError.replace('{diff}', diffMin.toString());
            updateResult('time', 'error', msg);
        }
    } catch (e) {
        updateResult('time', 'warning', t.resTimeFetchError);
    }

    // 5. Ping & Jitter Check
    let pings: number[] = [];
    for(let i=0; i<5; i++) {
        const p = await getPing();
        if(p) pings.push(p);
        await new Promise(r => setTimeout(r, 200)); 
    }

    if (pings.length > 0) {
        const avgPing = pings.reduce((a,b) => a+b, 0) / pings.length;
        
        let jitterSum = 0;
        for(let i=0; i < pings.length - 1; i++) {
            jitterSum += Math.abs(pings[i] - pings[i+1]);
        }
        const jitter = jitterSum / (pings.length - 1);

        // Ping Result
        let pStatus: TestStatus = 'success';
        let pText = `${Math.round(avgPing)} ms`;
        if (avgPing > 100) { pStatus = 'warning'; pText += ` (${t.resPingSlow})`; }
        if (avgPing > 300) { pStatus = 'error'; pText += ` (${t.resPingVerySlow})`; }
        updateResult('ping', pStatus, <LtrText>{pText}</LtrText>);

        // Jitter Result
        let jStatus: TestStatus = 'success';
        let jText = t.resJitterStable;
        if(jitter > 30) { jStatus = 'warning'; jText = t.resJitterMedium; }
        if(jitter > 100) { jStatus = 'error'; jText = t.resJitterUnstable; }
        updateResult('jitter', jStatus, (
            <span>
                <LtrText>{Math.round(jitter)} ms</LtrText> <span className="text-xs opacity-75">({jText})</span>
            </span>
        ));

    } else {
        updateResult('ping', 'error', t.resPingError);
        updateResult('jitter', 'error', t.resPingError);
    }

    // 6. Speed Test
    try {
        const fileUrl = "https://upload.wikimedia.org/wikipedia/commons/f/fc/Crown_of_Thorns_Starfish_at_Malapascuas_Island_v._II.jpg?t=" + Date.now();
        const start = performance.now();
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const duration = (performance.now() - start) / 1000;
        
        const bits = blob.size * 8;
        const mbps = (bits / duration) / (1024 * 1024);
        const speed = mbps.toFixed(2);

        let diagnosis = t.resSpeedGood;
        let status: TestStatus = "success";

        if(mbps > 50) diagnosis = t.resSpeedExcellent;
        else if(mbps < 5) { diagnosis = t.resSpeedPoor; status = "error"; }
        else if(mbps < 15) { diagnosis = t.resSpeedFair; status = "warning"; }

        updateResult('speed', status, (
            <div className="flex flex-col">
                <span className="font-bold text-lg"><LtrText>{speed} Mbps</LtrText></span>
                <span className="text-xs opacity-80">{diagnosis}</span>
            </div>
        ));

    } catch (e) {
        updateResult('speed', 'error', t.resSpeedError);
    }

    setIsRunning(false);
  };

  const systemTests: TestResult[] = [
      { id: 'browser', labelKey: 'testBrowser', status: results.browser.status, result: results.browser.result, icon: Globe },
      { id: 'os', labelKey: 'testOS', status: results.os.status, result: results.os.result, icon: Laptop },
      { id: 'screen', labelKey: 'testScreen', status: results.screen.status, result: results.screen.result, icon: Monitor },
      { id: 'hardware', labelKey: 'testHardware', status: results.hardware.status, result: results.hardware.result, icon: Cpu },
  ];

  const networkTests: TestResult[] = [
    { id: 'connect', labelKey: 'testConnection', status: results.connect.status, result: results.connect.result, icon: Wifi },
    { id: 'ipv6', labelKey: 'testIPv6', status: results.ipv6.status, result: results.ipv6.result, icon: Network },
    { id: 'isp', labelKey: 'testISP', status: results.isp.status, result: results.isp.result, icon: Layers, fullWidth: true },
    { id: 'time', labelKey: 'testTime', status: results.time.status, result: results.time.result, icon: Clock, fullWidth: true },
  ];

  const perfTests: TestResult[] = [
    { id: 'ping', labelKey: 'testPing', status: results.ping.status, result: results.ping.result, icon: Activity, fullWidth: true },
    { id: 'jitter', labelKey: 'testJitter', status: results.jitter.status, result: results.jitter.result, icon: Activity, fullWidth: true },
    { id: 'speed', labelKey: 'testSpeed', status: results.speed.status, result: results.speed.result, icon: Zap, fullWidth: true },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
            <div className="inline-block p-4 rounded-[2rem] glass-card mb-6">
                 <Activity className="w-12 h-12 text-accent mx-auto" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark dark:text-text-light font-rubik">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">{t.fixCheckerPageTitle}</span>
            </h1>
            <p className="mt-4 text-xl text-text-dark/70 dark:text-text-light/70 font-light max-w-2xl mx-auto">{t.fixCheckerPageSubtitle}</p>
        </header>

        <main className="glass-card rounded-[2.5rem] p-6 md:p-10 border border-white/40 dark:border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
             
             <div className="relative z-10 space-y-8">
                
                {/* 1. System Info */}
                <div>
                    <h2 className="text-lg font-bold text-text-dark dark:text-text-light mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{t.sysInfoTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {systemTests.map(test => <TestCard key={test.id} test={test} t={t} />)}
                    </div>
                </div>

                {/* 2. Network Tests */}
                <div>
                    <h2 className="text-lg font-bold text-text-dark dark:text-text-light mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{t.networkTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {networkTests.map(test => <TestCard key={test.id} test={test} t={t} />)}
                    </div>
                </div>

                 {/* 3. Performance Tests */}
                 <div>
                    <h2 className="text-lg font-bold text-text-dark dark:text-text-light mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{t.performanceTitle}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {perfTests.map(test => <TestCard key={test.id} test={test} t={t} />)}
                    </div>
                </div>

             </div>

             <div className="mt-12 text-center relative z-10">
                <button
                    onClick={runDiagnostics}
                    disabled={isRunning}
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

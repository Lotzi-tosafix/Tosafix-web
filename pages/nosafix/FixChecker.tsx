
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

const TestCard = ({ test, t }: { test: TestResult, t: any }) => {
    const Icon = test.icon;
    const statusClass = getStatusColor(test.status);
    
    return (
      <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${statusClass} backdrop-blur-md ${test.fullWidth ? 'col-span-1 sm:col-span-2' : ''}`}
      >
          <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/40 dark:bg-black/20">
                  <Icon size={20} />
              </div>
              <div className="flex flex-col text-start">
                   <h3 className="font-bold text-sm text-text-dark dark:text-text-light">{t[test.labelKey as keyof typeof t] as string}</h3>
                   {test.status === 'idle' && test.id.startsWith('browser') ? null : (
                       <div className="font-medium text-sm mt-0.5">
                           {test.result}
                       </div>
                   )}
              </div>
          </div>
           {test.status !== 'idle' && (
               <div className="flex-shrink-0">
                   {getStatusIcon(test.status)}
               </div>
           )}
      </motion.div>
    );
};

const FixChecker = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isRunning, setIsRunning] = useState(false);
  
  const [results, setResults] = useState<{ [key: string]: { status: TestStatus, result?: React.ReactNode } }>({
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

  const getPing = async (): Promise<number | null> => {
      const start = performance.now();
      try {
          await fetch('https://www.cloudflare.com/cdn-cgi/trace', { cache: "no-store" });
          return performance.now() - start;
      } catch(e) {
          return null;
      }
  };

  const checkSystemInfo = () => {
      // Browser
      const userAgent = navigator.userAgent;
      let browserName = "Unknown";
      if(userAgent.includes("Edg")) browserName = "Microsoft Edge";
      else if(userAgent.includes("Chrome")) browserName = "Google Chrome";
      else if(userAgent.includes("Firefox")) browserName = "Mozilla Firefox";
      else if(userAgent.includes("Safari")) browserName = "Apple Safari";
      
      updateResult('browser', 'idle', <span className="ltr:text-left rtl:text-right" dir="ltr">{browserName}</span>);

      // OS
      let os = "Unknown";
      if (userAgent.indexOf("Win") !== -1) os = "Windows";
      else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
      else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
      else if (userAgent.indexOf("Android") !== -1) os = "Android";
      else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";
      
      updateResult('os', 'idle', os);

      // Screen
      const width = window.screen.width;
      const height = window.screen.height;
      updateResult('screen', 'idle', <span className="ltr:text-left rtl:text-right" dir="ltr">{width} x {height}</span>);

      // Hardware
      const cores = navigator.hardwareConcurrency || "?";
      // Explicitly cast to any because deviceMemory is non-standard but supported in Chrome-based browsers
      const ram = (navigator as any).deviceMemory || "?";
      
      let ramDisplay = ram;
      if (ram === 8) ramDisplay = "8GB+";
      else if (ram !== "?") ramDisplay = `${ram}GB`;
      
      let hwStatus: React.ReactNode = "";
      if (typeof ram === 'number' && ram < 4) {
          hwStatus = <span className="block text-xs text-amber-500 font-bold mt-1">{t.resLowRam}</span>;
      }
      
      updateResult('hardware', 'idle', (
          <div className="flex flex-col">
            <span className="ltr:text-left rtl:text-right" dir="ltr">{cores} Cores, ~{ramDisplay} RAM</span>
            {hwStatus}
          </div>
      ));
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // Reset network tests
    const networkTests = ['connect', 'isp', 'time', 'ping', 'jitter', 'ipv6', 'speed'];
    networkTests.forEach(key => updateResult(key, 'running', t.statusChecking));

    // Run System Info immediately
    checkSystemInfo();

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

    // 3. Time Sync Check
    try {
        const clientTime = Date.now();
        const res = await fetch('/api/time');
        if (!res.ok) throw new Error('Time API failed');
        const data = await res.json();
        const serverTime = data.serverTime;
        
        const diff = Math.abs(clientTime - serverTime);

        if (diff < 90000) { // 1.5 minutes tolerance
            updateResult('time', 'success', t.resTimeSynced);
        } else {
            const diffMin = Math.round(diff / 60000);
            const msg = t.resTimeError.replace('{diff}', diffMin.toString());
            updateResult('time', 'error', msg);
        }
    } catch (e) {
        updateResult('time', 'warning', t.resTimeFetchError);
    }

    // 4. Ping & Jitter Check
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
        updateResult('ping', pStatus, <span dir="ltr">{pText}</span>);

        // Jitter Result
        let jStatus: TestStatus = 'success';
        let jText = t.resJitterStable;
        if(jitter > 30) { jStatus = 'warning'; jText = t.resJitterMedium; }
        if(jitter > 100) { jStatus = 'error'; jText = t.resJitterUnstable; }
        updateResult('jitter', jStatus, (
            <span>
                <span dir="ltr">{Math.round(jitter)} ms</span> <span className="text-xs opacity-75">({jText})</span>
            </span>
        ));

    } else {
        updateResult('ping', 'error', t.resPingError);
        updateResult('jitter', 'error', t.resPingError);
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

        if (speedMbps > 50) diagnosis = t.resSpeedExcellent;
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

  // Run system info on mount
  React.useEffect(() => {
      checkSystemInfo();
  }, []);

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

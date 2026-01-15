
// Extend window type for QRious and Html5Qrcode
declare global {
  interface Window {
    QRious?: any;
    Html5Qrcode?: any;
  }
}

import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function PassApp() {
  // --- State ---
  const [baseString, setBaseString] = useState("VYLUDKNn8Pjb8mB7R+ICpg==Z");
  const [generatedFullString, setGeneratedFullString] = useState("");
  const [currentTimePart, setCurrentTimePart] = useState("");
  const [humanTime, setHumanTime] = useState("");
  const [isCopying, setIsCopying] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [qrReady, setQrReady] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);
  const [scannedFullResult, setScannedFullResult] = useState("");
  const [logs, setLogs] = useState(["System Initialized"]);

  const canvasRef = useRef(null);
  const fsCanvasRef = useRef(null);

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-2), `${new Date().toLocaleTimeString()}: ${msg}`]);

  // --- 1. Load QR Library (QRious) via CDN ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js";
    script.async = true;
    script.onload = () => {
      setQrReady(true);
      addLog("QR Engine Ready");
    };
    document.body.appendChild(script);
    return () => { if (document.body && document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // --- 2. Load Scanner Script via CDN ---
  useEffect(() => {
    if (showScanner && !scannerReady) {
      addLog("Loading scanner...");
      const script = document.createElement('script');
      script.src = "https://unpkg.com/html5-qrcode";
      script.async = true;
      script.onload = () => {
        setScannerReady(true);
        addLog("Scanner ready.");
      };
      document.body.appendChild(script);
    }
  }, [showScanner, scannerReady]);

  // --- 3. Token Generation Logic (ITS Format) ---
  const getUpdate = useCallback((base: string) => {
    const now = new Date();
    const unixTime = Math.floor(now.getTime() / 1000).toString();
    return {
      full: `${base}${unixTime}`,
      time: unixTime,
      human: now.toLocaleTimeString()
    };
  }, []);

  // --- 4. Heartbeat Timer (Updates every second) ---
  const triggerUpdate = useCallback(() => {
    const data = getUpdate(baseString);
    setGeneratedFullString(data.full);
    setCurrentTimePart(data.time);
    setHumanTime(data.human);
  }, [baseString, getUpdate]);

  useEffect(() => {
    if (isPaused) return;

    triggerUpdate();
    const timer = setInterval(triggerUpdate, 1000);
    return () => clearInterval(timer);
  }, [isPaused, triggerUpdate]);

  // --- 5. QR Rendering Logic ---
  useEffect(() => {
    if (qrReady && generatedFullString && window.QRious) {
      if (canvasRef.current) {
        new window.QRious({ 
          element: canvasRef.current, 
          value: generatedFullString, 
          size: 280, // Increased size for dashboard
          level: 'M' 
        });
      }
      if (isFullScreen && fsCanvasRef.current) {
        // Calculate dynamic size for fullscreen
        const size = Math.min(window.innerWidth - 64, window.innerHeight - 250, 600);
        new window.QRious({ 
          element: fsCanvasRef.current, 
          value: generatedFullString, 
          size: size, 
          level: 'M' 
        });
      }
    }
  }, [generatedFullString, qrReady, isFullScreen]);

  // --- 6. Scanner Implementation ---
  useEffect(() => {
    let scanner: any = null;
    if (showScanner && scannerReady && (window as any).Html5Qrcode) {
      scanner = new (window as any).Html5Qrcode("reader");
      scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (text: string) => {
          setScannedFullResult(text); // Store the actual full scanned string
          const parts = text.split('Z');
          // Update baseString to be the part before the time sequence
          const newBase = parts.length > 1 ? parts[0] + 'Z' : text;
          setBaseString(newBase);
          setShowScanner(false);
          addLog("Scan success.");
          // Manual trigger to update immediately with the new base
          const data = getUpdate(newBase);
          setGeneratedFullString(data.full);
        },
        () => {}
      ).catch((e: any) => addLog("Camera Error: " + e));
    }
    return () => { if (scanner && scanner.isScanning) scanner.stop().catch(() => {}); };
  }, [showScanner, scannerReady, getUpdate]);

  const copy = () => {
    const el = document.createElement('textarea');
    el.value = generatedFullString;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 text-slate-900 flex flex-col items-center">
      
      {/* Full Screen Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-100 bg-white flex flex-col items-center justify-center p-0 animate-in fade-in duration-200">
          {/* Close button */}
          <button 
            onClick={() => setIsFullScreen(false)} 
            className="absolute top-4 right-4 p-3 bg-slate-100 rounded-full hover:bg-slate-200 shadow"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Card-like container */}
          <div className=''>
            {/* Title */}
            <div className="w-full flex items-center pl-2 mb-5 border-b border-b-gray-200">
            
              <span className="text-base font-semibold">Student Bus Pass</span>
            </div>
            <div className="w-full max-w-xs bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col items-center px-2 py-6 relative">
            {/* Time */}
            <div className="w-full flex items-center justify-center">
                <span className="text-xs font-mono font-bold tracking-normal">{humanTime}, {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            {/* QR code */}
            <div className="flex flex-col items-center justify-center my-2">
                <div className="bg-white pb-2 rounded-xl">
                <canvas ref={fsCanvasRef} width="150" height="150" className="w-48 h-48" />
                </div>
            </div>
            {/* Validity */}
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <span className="text-xs text-slate-400 mt-1">Tap to scan</span>
                <span className="text-sm text-slate-700 font-semibold">Valid till 11:59 PM on 29 Jan 2026</span>
            </div>
            {/* User Card */}
            <div className="w-full flex items-center bg-slate-50 rounded-xl border border-slate-200 px-4 py-3 mt-2 mb-1 gap-3">
                <img src="/pawan.png" alt="User" className="w-18 h-18 rounded-full border-2 object-cover aspect-square border-white shadow" />
                <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-semibold leading-tight">Passenger</span>
                <span className="text-base font-bold text-slate-800 leading-tight">Pawan Kushwah</span>
                <span className="text-xs text-slate-800 leading-tight">25/03/2005</span>
                <span className="text-xs text-slate-800 leading-tight">Male</span>
                </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Main UI Card */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center shadow-lg">
          <div>
            <h1 className="font-black text-xl tracking-tight uppercase">ITS QR Studio</h1>
            <p className="text-[9px] font-bold opacity-60 tracking-widest">UNIX EPOCH GENERATOR</p>
          </div>
          <button onClick={() => setIsPaused(!isPaused)} className="p-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
            {isPaused ? 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> : 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            }
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Identifier</label>
            </div>
            <input 
              type="text" 
              value={baseString}
              onChange={(e) => setBaseString(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-xs focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner"
              placeholder="Base String..."
            />
          </div>

          {/* Scanned Result Display */}
          {scannedFullResult && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl relative animate-in slide-in-from-top-2">
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1 block">Last Scanned Full String</span>
              <p className="text-[10px] font-mono font-medium text-blue-700 break-all leading-relaxed">
                {scannedFullResult}
              </p>
              <button 
                onClick={() => setScannedFullResult("")}
                className="absolute top-2 right-2 text-blue-300 hover:text-blue-500"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          )}

          {/* Time & Logic Explanation */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex flex-col gap-1">
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">ITS Unix Time</span>
              <span className="text-lg font-mono font-black text-indigo-600 tracking-tighter">{currentTimePart}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Human Clock</span>
              <span className="text-lg font-mono font-black text-slate-700 tracking-tighter">{humanTime}</span>
            </div>
          </div>

          {/* QR Area */}
          <div 
            onClick={() => {setIsFullScreen(true); setIsPaused(false);}}
            className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-4xl p-6 flex flex-col items-center cursor-pointer hover:bg-indigo-50/50 hover:border-indigo-300 transition-all active:scale-98 group"
          >
            <div className="bg-white p-3 rounded-3xl shadow-lg mb-4 relative overflow-hidden flex items-center justify-center">
              {!qrReady ? (
                <div className="w-45 h-45 flex items-center justify-center"><div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
              ) : (
                <canvas ref={canvasRef} width="200" height="200" className="w-45 h-45" />
              )}
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors flex items-center justify-center">
                <svg className="opacity-0 group-hover:opacity-100 text-indigo-600 transform scale-125" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 3h6v6M9 21H3v-6"/></svg>
              </div>
            </div>
            
            <div className="w-full flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-100 text-[10px] font-mono shadow-sm">
              <span className="truncate text-indigo-700 font-bold mr-2">{generatedFullString}</span>
              <button onClick={(e) => { e.stopPropagation(); copy(); }} className="text-slate-400 hover:text-indigo-600 p-1 rounded-md hover:bg-slate-50">
                {isCopying ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>}
              </button>
            </div>
          </div>

          {/* Scanner */}
          <div className="pt-2">
            {!showScanner ? (
              <button 
                onClick={() => setShowScanner(true)}
                className="w-full bg-slate-900 text-white py-4.5 rounded-2xl font-black text-xs tracking-widest hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
                OPEN CAMERA SCANNER
              </button>
            ) : (
              <div className="space-y-4 animate-in slide-in-from-bottom-4">
                <div id="reader" className="bg-black rounded-4xl overflow-hidden min-h-75 border-4 border-slate-900 shadow-2xl"></div>
                <button onClick={() => setShowScanner(false)} className="w-full bg-slate-100 py-3 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest">CANCEL</button>
              </div>
            )}
          </div>
        </div>

        {/* Console */}
        <div className="bg-slate-900 p-4 font-mono text-[9px] text-slate-500 border-t border-slate-800 mt-auto">
          <div className="flex justify-between border-b border-slate-800 pb-1 mb-1 font-bold text-slate-600 uppercase tracking-widest">
            <span>Terminal</span>
            <span className="text-indigo-400">ACTIVE</span>
          </div>
          {logs.map((l, i) => <div key={i} className="truncate opacity-70">{l}</div>)}
        </div>
      </div>
    </div>
  );
};
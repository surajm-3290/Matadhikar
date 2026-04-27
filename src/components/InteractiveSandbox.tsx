/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Vote, 
  CheckCircle2, 
  ChevronRight, 
  Award, 
  BarChart3, 
  ArrowRight,
  Download,
  Printer,
  ShieldCheck,
  Timer
} from "lucide-react";
import confetti from "canvas-confetti";

interface InteractiveSandboxProps {
  phaseIndex: number;
  onFinish: () => void;
}

enum SandboxPhase {
  SIMULATION = 'SIMULATION',
  GRADUATION = 'GRADUATION'
}

const CANDIDATES = [
  { id: 1, name: "Candidate A", symbol: "☀", color: "text-orange-500" },
  { id: 2, name: "Candidate B", symbol: "☘", color: "text-green-600" },
  { id: 3, name: "Candidate C", symbol: "⚖", color: "text-blue-600" },
  { id: 4, name: "Candidate D", symbol: "☸", color: "text-indigo-600" },
];

export default function InteractiveSandbox({ phaseIndex, onFinish }: InteractiveSandboxProps) {
  const [phase, setPhase] = useState<SandboxPhase>(SandboxPhase.SIMULATION);
  
  // Registration Simulation (Phase 1)
  const [regStatus, setRegStatus] = useState<null | 'VERIFYING' | 'APPROVED' | 'REJECTED'>(null);
  
  // Nomination Simulation (Phase 2)
  const [scrutinyStep, setScrutinyStep] = useState(0);
  const SCRUTINY_DOCS = [
    { title: "Age Certificate", status: "VALID", value: "25 Years (Eligible)" },
    { title: "Citizenship", status: "VALID", value: "Indian Citizen" },
    { title: "Form 26 Affidavit", status: "VALID", value: "Complete Disclosure" },
  ];

  // MCC Simulation (Phase 3)
  const [mccCases, setMccCases] = useState([
    { id: 1, scenario: "Minister uses official vehicle for rally", type: "VIOLATION", action: null },
    { id: 2, scenario: "Candidate gives speech in a school committee", type: "ALLOWED", action: null },
    { id: 3, scenario: "Voter bribing in slum areas reported", type: "VIOLATION", action: null },
  ]);

  // Voting Simulation (Phase 4)
  const [vvpatActive, setVvpatActive] = useState(false);
  const [vvpatCandidate, setVvpatCandidate] = useState<typeof CANDIDATES[0] | null>(null);
  const [vvpatTimer, setVvpatTimer] = useState(0);
  const [votes, setVotes] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [hasVoted, setHasVoted] = useState(false);

  // Counting Simulation (Phase 5)
  const [isCounting, setIsCounting] = useState(false);

  const [userName, setUserName] = useState("");
  const [inputName, setInputName] = useState("");

  // VVPAT Timer logic
  useEffect(() => {
    let interval: any;
    if (vvpatActive && vvpatTimer > 0) {
      interval = setInterval(() => {
        setVvpatTimer((t) => t - 1);
      }, 1000);
    } else if (vvpatTimer === 0) {
      setVvpatActive(false);
    }
    return () => clearInterval(interval);
  }, [vvpatActive, vvpatTimer]);

  const handleVote = (candidate: typeof CANDIDATES[0]) => {
    if (vvpatActive || hasVoted) return;
    
    // Simulate EVM Beep
    const beep = document.createElement('div');
    beep.className = 'fixed inset-0 bg-red-500/20 backdrop-blur-[2px] z-[100] flex items-center justify-center pointer-events-none';
    beep.innerHTML = '<div class="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-2xl animate-ping uppercase tracking-widest leading-none">BEEP...</div>';
    document.body.appendChild(beep);
    setTimeout(() => document.body.removeChild(beep), 1000);

    setVvpatCandidate(candidate);
    setVvpatActive(true);
    setVvpatTimer(7);
    setHasVoted(true);
    setVotes(prev => ({ ...prev, [candidate.id]: prev[candidate.id] + 1 }));
  };

  const runCountingSequence = () => {
    setIsCounting(true);
    setTimeout(() => {
      setPhase(SandboxPhase.GRADUATION);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b']
      });
    }, 4500);
  };

  const renderCurrentSimulation = () => {
    switch(phaseIndex) {
      case 0: // Phase 1: Registration
        return (
          <div className="max-w-2xl mx-auto theme-card">
            <div className="flex items-center gap-4 mb-8">
              <ShieldCheck className="text-indigo-600" size={32} />
              <div>
                <h3 className="text-xl font-bold">Voter Registration Simulator</h3>
                <p className="text-sm text-slate-500">ERO Dashboard: Verify Application #IND-8829</p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Applicant</label>
                  <p className="font-bold">Rahul Sharma</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Form Type</label>
                  <p className="font-bold">Form 6 (New Voter)</p>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Uploaded Proof</label>
                <div className="mt-2 h-32 bg-slate-200 rounded flex items-center justify-center text-slate-400 font-mono text-xs italic">
                  [DOCUMENT_IMAGE: AADHAAR_FRONT]
                </div>
              </div>
            </div>

            {regStatus ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-6 rounded-xl border-2 text-center ${regStatus === 'APPROVED' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                <CheckCircle2 className="mx-auto mb-2" />
                <p className="font-bold">Application {regStatus}</p>
                <button onClick={onFinish} className="mt-4 secondary-button">Return to Curriculum</button>
              </motion.div>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => { setRegStatus('VERIFYING'); setTimeout(() => setRegStatus('REJECTED'), 1500) }}
                  className="flex-1 px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-bold transition-all"
                >
                  Reject & Notify
                </button>
                <button 
                  onClick={() => { setRegStatus('VERIFYING'); setTimeout(() => setRegStatus('APPROVED'), 1500) }}
                  className="flex-1 primary-button py-3 text-base"
                >
                  Approve Application
                </button>
              </div>
            )}
          </div>
        );

      case 1: // Phase 2: Nomination
        return (
          <div className="max-w-2xl mx-auto theme-card">
            <h3 className="text-xl font-bold mb-6">Returning Officer Desk: Scrutiny</h3>
            <div className="space-y-4 mb-8">
              {SCRUTINY_DOCS.map((doc, i) => (
                <div key={i} className={`p-4 border rounded-xl flex items-center justify-between ${i <= scrutinyStep ? 'border-indigo-200 bg-indigo-50' : 'border-slate-100 opacity-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      {i < scrutinyStep ? <CheckCircle2 size={16} className="text-green-500" /> : <ShieldCheck size={16} className="text-indigo-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{doc.title}</p>
                      <p className="text-xs text-slate-500">{doc.value}</p>
                    </div>
                  </div>
                  {i === scrutinyStep && (
                    <button 
                      onClick={() => setScrutinyStep(prev => prev + 1)}
                      className="text-xs font-bold text-indigo-600 h-8 px-4 border border-indigo-200 rounded-lg hover:bg-white transition-colors"
                    >
                      Verify
                    </button>
                  )}
                </div>
              ))}
            </div>
            {scrutinyStep >= SCRUTINY_DOCS.length ? (
              <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-center">
                 <p className="font-bold text-green-700 mb-4">Candidate Nomination Validated!</p>
                 <button onClick={onFinish} className="primary-button px-12">Continue</button>
              </div>
            ) : (
              <p className="text-xs text-center text-slate-400 italic">Verify all documents to proceed.</p>
            )}
          </div>
        );

      case 2: // Phase 3: MCC
        return (
          <div className="max-w-3xl mx-auto theme-card">
            <div className="bg-indigo-900 -mx-6 -mt-6 p-8 mb-8 text-white rounded-t-2xl">
              <h3 className="text-2xl font-bold">cVIGIL: Violation Tracker</h3>
              <p className="text-indigo-200">Enforcing the Model Code of Conduct</p>
            </div>
            <div className="space-y-4">
              {mccCases.map((c) => (
                <div key={c.id} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                  <p className="text-slate-700 font-medium">{c.scenario}</p>
                  <div className="flex gap-2">
                    {c.action ? (
                      <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${c.action === c.type ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {c.action === c.type ? 'Correct Decison' : 'Wrong Decision'}
                      </span>
                    ) : (
                      <>
                        <button 
                          onClick={() => setMccCases(prev => prev.map(p => p.id === c.id ? {...p, action: 'ALLOWED'} : p))}
                          className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
                        >
                          Allowed
                        </button>
                        <button 
                          onClick={() => setMccCases(prev => prev.map(p => p.id === c.id ? {...p, action: 'VIOLATION'} : p))}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
                        >
                          Flag Violation
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {mccCases.every(c => c.action) && (
              <button onClick={onFinish} className="primary-button w-full mt-8">Phase Complete</button>
            )}
          </div>
        );

      case 3: // Phase 4: Voting
        return (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* The EVM Simulator */}
            <div className="theme-card relative overflow-hidden flex flex-col bg-slate-100 border-indigo-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Control Unit: AC-2024</span>
                <div className={`w-3 h-3 rounded-full animate-pulse ${hasVoted ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-green-500 shadow-[0_0_8px_green]'}`} />
              </div>

              <div className="space-y-3 flex-1">
                {CANDIDATES.map((c) => (
                  <div 
                    key={c.id}
                    className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 transition-all group"
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 font-bold text-lg ${c.color}`}>
                      {c.symbol}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{c.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">CODE: {c.id * 1024}</p>
                    </div>
                    <button
                      disabled={hasVoted || vvpatActive}
                      onClick={() => handleVote(c)}
                      className={`w-14 h-14 rounded-full border-4 border-slate-200 flex items-center justify-center transition-all ${hasVoted || vvpatActive ? 'bg-slate-50 opacity-50 cursor-not-allowed' : 'bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-400 active:scale-90'}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 shadow-inner group-hover:bg-blue-700" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-600">EVM Security Active</span>
                 </div>
                 {hasVoted && !vvpatActive && (
                   <button 
                     onClick={onFinish}
                     className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                   >
                     Complete Phase <ChevronRight size={14} />
                   </button>
                 )}
              </div>
            </div>

            {/* The VVPAT Display */}
            <div className="flex flex-col gap-6">
              <div className="dark-card flex-1 flex flex-col items-center justify-center p-12 text-center overflow-hidden">
                <div className="absolute top-4 right-6 flex items-center gap-2">
                   <Timer size={14} className="text-indigo-400" />
                   <span className="text-[10px] font-mono text-indigo-400">{vvpatTimer}s Remaining</span>
                </div>
                
                {vvpatActive && vvpatCandidate ? (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-[280px] bg-white p-8 shadow-2xl rounded shadow-slate-900/50 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 border-b border-white border-dashed" />
                    <div className="text-slate-900 font-mono text-center mb-6">
                      <p className="text-[10px] underline mb-4">VVPAT VERIFICATION SLIP</p>
                      <div className="flex justify-between text-xs mb-2">
                        <span>SL NO:</span>
                        <span className="font-bold">000001</span>
                      </div>
                      <div className="border-2 border-slate-900 p-4 my-6">
                        <span className={`text-4xl block mb-2 ${vvpatCandidate.color}`}>
                          {vvpatCandidate.symbol}
                        </span>
                        <span className="text-xl font-bold uppercase">{vvpatCandidate.name}</span>
                      </div>
                      <p className="text-[8px] opacity-60">VERIFY YOUR VOTE - DO NOT SHARE THIS SLIP</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-200 border-t border-white border-dashed" />
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/20">
                      <Vote size={40} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">VVPAT Window</h3>
                    <p className="text-sm text-white/50 max-w-xs leading-relaxed">
                      Cast your vote on the EVM Unit. The audit slip will appear here for exactly <span className="text-indigo-400 font-bold">7 seconds</span>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4: // Phase 5: Counting
        return (
          <div className="max-w-4xl mx-auto">
            <div className="theme-card overflow-hidden">
               <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-6">
                 <div>
                   <h3 className="text-xl font-extrabold text-slate-900">The Sequence of Tallying</h3>
                   <p className="text-sm text-slate-500">Simulating the rigorous verification process.</p>
                 </div>
                 <BarChart3 className="text-indigo-600" />
               </div>

               <div className="space-y-8">
                  {/* Phase 1: Postal Ballots */}
                  <div className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white" />
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 1</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">Postal Ballot Tallying</h4>
                    <p className="text-xs text-slate-500 mb-4">Verification of service voters ballots.</p>
                    {isCounting && (
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} className="h-1 bg-indigo-600 rounded-full" />
                    )}
                  </div>

                  {/* Phase 2: EVM Result */}
                  <div className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white" />
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 2</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">EVM Data Transfer</h4>
                    <p className="text-xs text-slate-500 mb-4">Electronic totals are fetched from each verified Control Unit.</p>
                    {isCounting && (
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, delay: 1 }} className="h-1 bg-indigo-600 rounded-full" />
                    )}
                  </div>

                  <div className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white" />
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 3</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">VVPAT Slip Matching</h4>
                    {isCounting && (
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, delay: 3 }} className="h-1 bg-indigo-600 rounded-full" />
                    )}
                  </div>
               </div>

               {!isCounting ? (
                 <button onClick={runCountingSequence} className="primary-button w-full mt-12 py-4 text-base group">
                   Establish Result Center <ChevronRight size={20} className="inline group-hover:translate-x-1" />
                 </button>
               ) : (
                 <div className="mt-12 p-4 bg-slate-50 text-center font-bold text-slate-500 rounded-xl">
                   Awaiting Final Tally...
                 </div>
               )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-8 pb-20">
      <div className="text-center mb-12">
        <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase mb-2 block">
          Interactive Simulation
        </span>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Phase {phaseIndex + 1} Sandbox
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {phase === SandboxPhase.SIMULATION ? (
          <motion.div 
            key="simulation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {renderCurrentSimulation()}
          </motion.div>
        ) : (
          <motion.div 
            key="grad"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            {/* GRADUATION VIEW remains same as before */}
            {!userName ? (
              <div className="theme-card max-w-md mx-auto text-center">
                <Award className="mx-auto text-indigo-600 mb-6" size={48} />
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Claim Your Certificate</h3>
                <p className="text-sm text-slate-500 mb-8">Enter your name for your Matadhikar Diploma.</p>
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Enter Full Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter' && inputName) setUserName(inputName) }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-lg"
                    autoFocus
                  />
                  <button 
                    onClick={() => { if(inputName) setUserName(inputName); }}
                    disabled={!inputName.trim()}
                    className="primary-button w-full py-4"
                  >
                    Generate Diploma
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Certificate UI code was already correct, just keeping it consistent */}
                <div className="bg-white p-12 border-8 border-slate-900 relative overflow-hidden shadow-2xl text-center">
                    <Award size={48} className="mx-auto mb-6 text-indigo-600" />
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">Election Academy Graduate</h1>
                    <p className="text-slate-500 font-medium mb-8">This acknowledgement is conferred to:</p>
                    <h2 className="text-3xl font-bold text-indigo-700 italic border-b-2 border-indigo-100 inline-block px-12 pb-2 mb-12">{userName}</h2>
                    <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-left">
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Credential ID</p>
                          <p className="font-mono text-xs">MA-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                       </div>
                       <button onClick={onFinish} className="primary-button">Finish Session</button>
                    </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

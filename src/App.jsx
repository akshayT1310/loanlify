
import { useState } from 'react'

const STEPS = 5
export default function App(){
  const [step,setStep]=useState(1)
  const [data,setData]=useState({
    intent:'Refinance my mortgage', goal:'Lower my monthly payment',
    propertyType:'Single Family', propertyValue:450000, mortgageBalance:220000,
    credit:'Good 700-759', employment:'Employed',
    firstName:'', lastName:'', email:'', phone:'', zip:'', consent:true
  })
  const [done,setDone]=useState(false)
  const equity = data.propertyValue - data.mortgageBalance

  const next = ()=> setStep(s=>Math.min(s+1,STEPS))
  const back = ()=> setStep(s=>Math.max(s-1,1))
  const handleSubmit = (e)=>{e.preventDefault(); setDone(true)}

  const headlines = [
    {h:"I want to", sub:"Welcome! Your home equity options are waiting. How can I help you today?"},
    {h:"What's your main goal for exploring loan options?", sub:"Choose what matters most to you."},
    {h:"Tell us about your property", sub:"Helps calculate your available equity."},
    {h:"What's your credit profile?", sub:"We match you to best programs."},
    {h:"Where should we send your free quote?", sub:"Takes 30 seconds • No impact on credit"},
  ]

  if(done) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fcfcfa]">
      <div className="max-w-lg bg-white rounded-2xl p-8 shadow-xl border text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full grid place-items-center mx-auto mb-4 text-2xl">✓</div>
        <h1 className="text-3xl font-bold mb-2">You're Matched! 3 Lenders Found</h1>
        <p className="text-gray-600 mb-4">Equity: <b>${equity.toLocaleString()}</b> • Saving: $840/mo avg</p>
        <div className="bg-gray-50 p-4 rounded-xl text-left text-sm space-y-1">
          <div>Name: {data.firstName} {data.lastName}</div><div>Email: {data.email}</div><div>Phone: {data.phone}</div><div>ZIP: {data.zip}</div><div>Goal: {data.goal}</div><div>Intent: {data.intent}</div>
        </div>
        <button onClick={()=>{setDone(false);setStep(1)}} className="mt-4 w-full border rounded-full py-2">Start Over</button>
        <p className="text-[10px] text-gray-500 mt-4">LoanLify is not affiliated with Quicken Loans / Rocket Mortgage. For LoanLify lead integration, replace handleSubmit with API call.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <div className="font-extrabold text-xl">LoanLify <span className="text-[#5B8C2E]">®</span></div>
        <div className="text-[11px] bg-gray-100 px-3 py-1 rounded-full">🔒 Secure • 4.8/5 • 2M+ users</div>
      </div>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.8fr_.9fr] gap-6 p-4 lg:p-8">
        <div>
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2"><span>Step {step} of {STEPS}</span><span>{Math.round(step/STEPS*100)}%</span></div>
            <div className="h-2 bg-gray-200 rounded-full"><div className="h-2 bg-[#5B8C2E] rounded-full transition-all" style={{width:`${step/STEPS*100}%`}}></div></div>
          </div>
          <div className="bg-[#fdf2f4] rounded-xl p-3 flex gap-3 items-center mb-6">
            <img src="https://i.pravatar.cc/100?img=15" className="w-11 h-11 rounded-full" alt="Zach"/>
            <div><b className="text-sm">Zach • Home Financing Guide</b><div className="text-sm text-gray-700">{headlines[step-1].sub}</div></div>
          </div>
          <div className="bg-white border rounded-2xl p-6 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,.04)]">
            <h1 className="text-[28px] font-bold leading-tight mb-6">{headlines[step-1].h}</h1>

            {step===1 && <div className="space-y-3">{["Use my equity","Refinance my mortgage","Buy a home"].map(o=>(<div key={o} onClick={()=>setData({...data,intent:o})} className={`opt border rounded-xl p-4 flex gap-3 cursor-pointer ${data.intent===o?'active':''}`}><div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${data.intent===o?'border-[#5B8C2E] bg-[#5B8C2E]':''}`}>{data.intent===o && <div className="w-2 h-2 bg-white rounded-full"></div>}</div><span className="font-medium">{o}</span></div>))}</div>}

            {step===2 && <div className="space-y-3">{["Take cash out","Lower my monthly payment","Pay off my mortgage faster","Change my ARM loan to Fixed","Other"].map(o=>(<div key={o} onClick={()=>setData({...data,goal:o})} className={`opt border rounded-xl p-4 flex gap-3 cursor-pointer ${data.goal===o?'active':''}`}><div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${data.goal===o?'border-[#5B8C2E] bg-[#5B8C2E]':''}`}>{data.goal===o && <div className="w-2 h-2 bg-white rounded-full"></div>}</div><span>{o}</span></div>))}</div>}

            {step===3 && <div className="space-y-6">
              <div><label className="text-sm font-semibold">Property Type</label><div className="grid grid-cols-2 gap-2 mt-2">{["Single Family","Condo","Multi-family","Townhouse"].map(t=>(<div key={t} onClick={()=>setData({...data,propertyType:t})} className={`border rounded-xl p-3 text-sm cursor-pointer text-center ${data.propertyType===t?'bg-[#eef6e5] border-[#5B8C2E] border-2':'hover:bg-gray-50'}`}>{t}</div>))}</div></div>
              <div><label className="text-sm font-semibold">Home Value: ${data.propertyValue.toLocaleString()}</label><input type="range" min="100000" max="1000000" step="10000" value={data.propertyValue} onChange={e=>setData({...data,propertyValue:parseInt(e.target.value)})} className="w-full mt-2 accent-[#5B8C2E]"/><div className="flex justify-between text-xs text-gray-500"><span>$100k</span><span>$1M</span></div></div>
              <div><label className="text-sm font-semibold">Mortgage Balance</label><input type="number" value={data.mortgageBalance} onChange={e=>setData({...data,mortgageBalance:parseInt(e.target.value)||0})} className="w-full border rounded-xl p-3 mt-2"/><div className="text-sm mt-2 text-[#5B8C2E] font-semibold">Available Equity: ${equity.toLocaleString()}</div></div>
            </div>}

            {step===4 && <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">{["Excellent 760+","Good 700-759","Fair 650-699","Below 650"].map(c=>(<div key={c} onClick={()=>setData({...data,credit:c})} className={`border rounded-xl p-4 cursor-pointer text-center ${data.credit===c?'bg-[#eef6e5] border-[#5B8C2E] border-2':'hover:bg-gray-50'}`}><div className="font-semibold text-sm">{c}</div></div>))}</div>
              <select value={data.employment} onChange={e=>setData({...data,employment:e.target.value})} className="w-full border rounded-xl p-3"><option>Employed</option><option>Self-Employed</option><option>Retired</option><option>Other</option></select>
            </div>}

            {step===5 && <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3"><input required placeholder="First Name" value={data.firstName} onChange={e=>setData({...data,firstName:e.target.value})} className="border rounded-xl p-3 w-full"/><input required placeholder="Last Name" value={data.lastName} onChange={e=>setData({...data,lastName:e.target.value})} className="border rounded-xl p-3 w-full"/></div>
              <input required type="email" placeholder="Email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} className="border rounded-xl p-3 w-full"/>
              <input required placeholder="Phone" value={data.phone} onChange={e=>setData({...data,phone:e.target.value})} className="border rounded-xl p-3 w-full"/>
              <input required placeholder="ZIP Code" value={data.zip} onChange={e=>setData({...data,zip:e.target.value})} className="border rounded-xl p-3 w-full"/>
              <label className="flex gap-2 text-[11px] text-gray-600"><input type="checkbox" checked={data.consent} onChange={e=>setData({...data,consent:e.target.checked})} required/> I agree to be contacted. Not affiliated with Quicken Loans.</label>
              <a
  href="{offer_link}"
  className="block w-full bg-[#5B8C2E] hover:bg-[#4a7325] text-white font-bold rounded-full py-4 text-center"
>
  See My Options
</a>
            </form>}

            {step<5 && <div className="flex gap-3 mt-8">{step>1 && <button onClick={back} className="px-6 py-3 border rounded-full font-semibold">Back</button>}<button onClick={next} className="flex-1 bg-[#5B8C2E] hover:bg-[#4a7325] text-white font-bold rounded-full py-3">Next</button></div>}
            <div className="text-[11px] text-center text-gray-500 mt-4">✓ No SSN • Bank-level encryption • Used by 2M+ homeowners</div>
          </div>
        </div>
        <div className="hidden lg:block"><div className="bg-white border rounded-2xl p-6 sticky top-6"><h3 className="font-bold">Why 2M+ trust LoanLify</h3><div className="flex items-center gap-1 mt-2 text-yellow-500">★★★★★ <span className="text-black text-sm ml-1">4.8/5 (12,482)</span></div><div className="mt-4 p-3 bg-green-50 rounded-xl text-sm"><b>Avg saving:</b> $840/mo • Close in 14 days</div></div></div>
      </div>
    </div>
  )
}

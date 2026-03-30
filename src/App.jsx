import { useState } from 'react'
import {
  Activity,
  ArrowRight,
  Building2,
  Code2,
  Cpu,
  Globe,
  LineChart,
  Mail,
  Play,
  ShieldCheck,
  Terminal,
  Wallet,
  Zap,
} from 'lucide-react'

const Button = ({ children, primary, className = '', ...props }) => {
  const baseStyle =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all focus:outline-none border-2 border-black'
  const primaryStyle =
    'bg-[#D4FF00] text-black shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#000]'
  const secondaryStyle =
    'bg-[#E9D5FF] text-black shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#000]'

  return (
    <button
      className={`${baseStyle} ${primary ? primaryStyle : secondaryStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const InteractiveTerminal = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState([])

  const runCode = () => {
    if (isRunning) return
    setIsRunning(true)
    setOutput([])

    const sequence = [
      { text: '> AUTHENTICATING PYPSX SECURE TUNNEL...', delay: 400 },
      { text: '> ESTABLISHING FIX PROTOCOL LINK...', delay: 1000 },
      { text: "> MARKET OPEN. FETCHING 'SYS' ORDER BOOK...", delay: 1600 },
      { text: '> ROUTING: MARKET BUY [100 SHARES]', delay: 2200 },
      { text: '> SUCCESS: ORDER FILLED @ Rs. 450.25 (42ms)', delay: 2800, highlight: true },
      { text: '> SYNCING LEDGER. ESTIMATING TAX WITHHOLDING...', delay: 3200 },
      { text: '> READY.', delay: 3500, success: true },
    ]

    let currentDelay = 0
    sequence.forEach((step) => {
      currentDelay += step.delay
      setTimeout(() => {
        setOutput((prev) => [...prev, step])
        if (step.success) setIsRunning(false)
      }, currentDelay)
    })
  }

  return (
    <div className="w-full max-w-xl mx-auto md:mx-0 bg-white border-4 border-black shadow-[8px_8px_0_0_#000] rounded-xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b-4 border-black bg-[#FFDEEB]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2 mr-4">
            <div className="w-4 h-4 rounded-full bg-[#FF4949] border-2 border-black"></div>
            <div className="w-4 h-4 rounded-full bg-[#FFDF00] border-2 border-black"></div>
            <div className="w-4 h-4 rounded-full bg-[#00FF66] border-2 border-black"></div>
        </div>
          <span className="text-xs font-bold text-black tracking-widest uppercase">algo_runner.py</span>
        </div>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center space-x-2 text-xs font-bold text-black disabled:opacity-50 transition-colors uppercase tracking-widest bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#000] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0_0_#000] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
        >
          <Play size={12} className={isRunning ? 'animate-pulse text-[#FF2E93]' : ''} fill="currentColor" />
          <span>{isRunning ? 'Running' : 'Execute'}</span>
        </button>
      </div>

      <div className="flex-1 p-6 text-sm font-mono text-black overflow-x-auto bg-[#FAFAFA]">
        <pre className="!bg-transparent !m-0 !p-0 leading-relaxed">
          <span className="text-[#FF2E93] font-bold">import</span> pypsx
          {'\n'}
          <span className="text-[#FF2E93] font-bold">from</span> pypsx.enums{' '}
          <span className="text-[#FF2E93] font-bold">import</span> OrderType
          {'\n\n'}
          <span className="text-neutral-500 italic"># Initialize client</span>
          {'\n'}
          client = pypsx.Client(api_key=
          <span className="text-[#0080FF] font-bold">"pk_live_..."</span>)
          {'\n\n'}
          <span className="text-neutral-500 italic"># Execute programmatic trade</span>
          {'\n'}
          response = client.orders.create(
          {'\n'}
          {'    '}symbol=<span className="text-[#0080FF] font-bold">"SYS"</span>,
          {'\n'}
          {'    '}quantity=<span className="text-[#FF6600] font-bold">100</span>,
          {'\n'}
          {'    '}side=<span className="text-[#0080FF] font-bold">"BUY"</span>,
          {'\n'}
          {'    '}type=OrderType.MARKET
          {'\n'}
          )
          {'\n\n'}
          <span className="text-[#8A2BE2] font-bold">print</span>(
          <span className="text-[#0080FF] font-bold">{'f"Order filled: {response.status}"'}</span>)
        </pre>
      </div>

      <div className="bg-black p-6 h-[180px] font-mono text-xs border-t-4 border-black overflow-y-auto">
        {output.length === 0 && !isRunning && (
          <span className="text-neutral-500 font-bold uppercase tracking-widest">_Terminal Ready</span>
        )}
        {output.map((line, i) => (
          <div
            key={i}
            className={`mb-2 font-bold tracking-wide ${
              line.success ? 'text-[#D4FF00]' : line.highlight ? 'text-[#00F0FF]' : 'text-[#FAFAFA]'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}

const ArchitectureDiagram = () => (
  <div className="p-8 bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_0_#000] flex flex-col md:flex-row items-stretch justify-between gap-6">
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#CCFBF1] border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000]">
      <Wallet className="text-black mb-3" size={32} />
      <h4 className="font-bold text-lg text-black uppercase tracking-wider text-center">Your App</h4>
      <p className="text-xs font-bold text-neutral-600 mt-1 uppercase text-center">NayaPay / SadaPay</p>
    </div>

    <div className="flex-none flex items-center justify-center w-full md:w-16 py-4 md:py-0">
      <div className="hidden md:block w-full h-2 bg-black relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4FF00] px-3 py-1 text-xs font-bold tracking-widest text-black border-2 border-black rotate-[-5deg]">
          REST
        </div>
      </div>
      <div className="md:hidden h-12 w-2 bg-black relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4FF00] px-3 py-1 text-xs font-bold tracking-widest text-black border-2 border-black rotate-[-5deg]">
          REST
        </div>
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#E0E7FF] border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] relative">
      <div className="absolute -top-3 -right-3 bg-[#FF2E93] text-white text-[10px] font-bold px-2 py-1 border-2 border-black rotate-[10deg]">
        ENGINE
      </div>
      <Terminal className="text-black mb-3" size={32} />
      <h4 className="font-bold text-lg text-black uppercase tracking-wider text-center">pyPSX</h4>
      <p className="text-xs font-bold text-neutral-600 mt-1 uppercase text-center">Routing API</p>
    </div>

    <div className="flex-none flex items-center justify-center w-full md:w-16 py-4 md:py-0">
      <div className="hidden md:block w-full h-2 bg-black relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00F0FF] px-3 py-1 text-xs font-bold tracking-widest text-black border-2 border-black rotate-[5deg]">
          FIX
        </div>
      </div>
      <div className="md:hidden h-12 w-2 bg-black relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00F0FF] px-3 py-1 text-xs font-bold tracking-widest text-black border-2 border-black rotate-[5deg]">
          FIX
        </div>
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#FEF08A] border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000]">
      <Building2 className="text-black mb-3" size={32} />
      <h4 className="font-bold text-lg text-black uppercase tracking-wider text-center">Exchange</h4>
      <p className="text-xs font-bold text-neutral-600 mt-1 uppercase text-center">PSX via Broker</p>
    </div>
  </div>
)

export default function App() {
  const [activeTab, setActiveTab] = useState('b2c')

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-black font-sans selection:bg-[#FF2E93] selection:text-white overflow-x-hidden">
      <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#D4FF00] border-2 border-black shadow-[2px_2px_0_0_#000] flex items-center justify-center rotate-[-5deg]">
              <Zap size={20} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">pyPSX</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="mailto:hi@pypsx.com"
              className="text-sm font-bold uppercase tracking-widest hover:text-[#FF2E93] transition-colors hidden sm:block"
            >
              Docs
            </a>
            <Button primary className="!px-4 !py-2 !text-xs bg-[#FF2E93] text-white hover:bg-[#FF2E93]">
              Join Pilot
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        <section className="px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white border-2 border-black px-4 py-2 font-bold text-xs uppercase tracking-widest shadow-[4px_4px_0_0_#000] mb-8 rotate-[-2deg]">
                <span className="flex h-3 w-3 rounded-full bg-[#00FF66] border border-black animate-pulse"></span>
                <span>System Status: Early Dev</span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1] mb-8 uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-[#FF2E93]">
                <span className="text-black drop-shadow-none block mb-2">The API for</span>
                Pakistan&apos;s <br />
                Stock Market.
              </h1>

              <p className="text-lg font-bold text-neutral-700 mb-10 max-w-lg leading-relaxed border-l-4 border-[#00F0FF] pl-4">
                Programmatic trading and embedded brokerage infrastructure for the PSX. Built for advanced investors, developers,
                and disruptive fintechs.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button primary onClick={() => (window.location.href = 'mailto:hi@pypsx.com')}>
                  Get API Access <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button
                  onClick={() => document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Infrastructure
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#00F0FF] rounded-full border-4 border-black -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#FFDF00] border-4 border-black rotate-12 -z-10"></div>
              <InteractiveTerminal />
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-y-4 border-black bg-[#E0E7FF]">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-white">
              Inaccessible <span className="text-black drop-shadow-none">by design.</span>
            </h2>
            <p className="font-bold text-lg max-w-2xl text-neutral-800">
              Pakistan has 240 million people, yet only 0.2% invest in the stock market. The demand exists, but legacy
              infrastructure blocks entry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#FFDEEB] border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0_0_#000] relative hover:-translate-y-1 transition-transform">
              <div className="absolute -top-5 right-8 bg-[#FF2E93] text-white font-black text-xs px-3 py-1 border-2 border-black rotate-[-5deg]">
                ROADBLOCK 1
              </div>
              <div className="w-14 h-14 bg-white border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                <Wallet className="text-black" size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-3">The Friction for Apps</h3>
              <p className="font-bold text-neutral-800 leading-relaxed">
                Millions use digital wallets. These apps want to offer stock investing, but cannot do so without spending
                years acquiring complex brokerage licenses and building legacy integrations.
              </p>
            </div>

            <div className="bg-[#FEF08A] border-4 border-black p-8 rounded-2xl shadow-[8px_8px_0_0_#000] relative hover:-translate-y-1 transition-transform">
              <div className="absolute -top-5 right-8 bg-[#FFDF00] text-black font-black text-xs px-3 py-1 border-2 border-black rotate-[5deg]">
                ROADBLOCK 2
              </div>
              <div className="w-14 h-14 bg-white border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                <Activity className="text-black" size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase mb-3">The Pain for Traders</h3>
              <p className="font-bold text-neutral-800 leading-relaxed">
                Smart, independent investors want to automate trading strategies. Instead, traditional brokers force them to
                manually click buttons on slow, closed-system screens.
              </p>
            </div>
          </div>
        </section>

        <section id="infrastructure" className="py-24 px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase inline-block relative">
              Infrastructure.
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#D4FF00] -z-10 rotate-[-1deg] border-y-2 border-black"></span>
            </h2>
            <p className="font-bold text-lg text-neutral-700 max-w-2xl mx-auto mt-6">
              One routing engine. Two distinct products relying on partner brokers for final execution.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white border-4 border-black p-2 rounded-2xl shadow-[6px_6px_0_0_#000] gap-2">
              <button
                onClick={() => setActiveTab('b2c')}
                className={`px-8 py-3 text-sm font-black uppercase tracking-widest transition-all rounded-xl border-2 ${
                  activeTab === 'b2c'
                    ? 'bg-[#00F0FF] border-black text-black shadow-[2px_2px_0_0_#000]'
                    : 'bg-transparent border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                B2C: Algo Platform
              </button>
              <button
                onClick={() => setActiveTab('b2b')}
                className={`px-8 py-3 text-sm font-black uppercase tracking-widest transition-all rounded-xl border-2 ${
                  activeTab === 'b2b'
                    ? 'bg-[#D4FF00] border-black text-black shadow-[2px_2px_0_0_#000]'
                    : 'bg-transparent border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                B2B: Brokerage API
              </button>
            </div>
          </div>

          <div className="bg-white border-4 border-black rounded-3xl p-8 md:p-12 min-h-[500px] shadow-[12px_12px_0_0_#000]">
            {activeTab === 'b2c' ? (
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center animate-in fade-in duration-300">
                <div>
                  <h3 className="text-3xl font-black uppercase mb-6">Algorithmic Trading</h3>
                  <p className="font-bold text-neutral-700 mb-8 leading-relaxed text-lg border-l-4 border-[#FF2E93] pl-4">
                    Stop manually clicking buttons. Write code, test strategies, and execute trades programmatically.
                  </p>
                  <ul className="space-y-6">
                    {[
                      { icon: Code2, title: 'Python API', desc: 'Robust developer access to execute trades programmatically.', color: 'bg-[#CCFBF1]' },
                      { icon: Activity, title: 'Backtesting Sandbox', desc: 'Comprehensive environment for risk-free strategy validation.', color: 'bg-[#FFDEEB]' },
                      { icon: Cpu, title: 'No-Code Builders', desc: 'Democratizing automated trading for non-programmers.', color: 'bg-[#FEF08A]' },
                      { icon: LineChart, title: 'Real-time Ledger', desc: 'Live PnL tracking and highly accurate estimated tax liabilities.', color: 'bg-[#E0E7FF]' },
                    ].map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start bg-[#FAFAFA] p-4 border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all"
                      >
                        <div
                          className={`w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center mr-4 shrink-0 ${feature.color}`}
                        >
                          <feature.icon size={20} className="text-black" />
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-lg mb-1">{feature.title}</h4>
                          <p className="text-sm font-bold text-neutral-600">{feature.desc}</p>
                        </div>
            </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-[8px_8px_0_0_#000] border-4 border-black relative">
                  <div className="absolute -top-5 -right-5 bg-[#D4FF00] text-black border-2 border-black font-black text-xs px-3 py-1 rotate-[10deg] shadow-[2px_2px_0_0_#000]">
                    PYTHON EXPORT
                  </div>
                  <div className="flex items-center space-x-2 mb-6 pb-4 border-b-4 border-black">
                    <Code2 size={24} className="text-black" />
                    <span className="text-sm font-black uppercase tracking-widest">strategy_cross.py</span>
                  </div>
                  <div className="font-mono text-sm space-y-2 font-bold bg-[#FAFAFA] p-4 border-2 border-black rounded-lg">
                    <div>
                      <span className="text-[#FF2E93]">def</span> <span className="text-[#0080FF]">on_tick</span>(data):
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;short_ma = get_ma(data, <span className="text-[#FF6600]">10</span>)</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;long_ma = get_ma(data, <span className="text-[#FF6600]">50</span>)</div>
                    <br />
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF2E93]">if</span> short_ma {'>'} long_ma:
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-neutral-400 italic"># Execute buy on golden cross</span></div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;psx.buy(<span className="text-[#00F0FF] bg-black px-1">"ENGRO"</span>, qty=
                      <span className="text-[#FF6600]">500</span>)
                    </div>
                    <br />
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF2E93]">elif</span> short_ma {'<'} long_ma:
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;psx.sell(<span className="text-[#00F0FF] bg-black px-1">"ENGRO"</span>)
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300 flex flex-col h-full justify-center">
                <div className="max-w-3xl mb-12 text-center mx-auto">
                  <h3 className="text-3xl font-black uppercase mb-4 inline-block bg-[#00F0FF] px-4 py-1 border-2 border-black rotate-[-1deg]">
                    Brokerage API for Apps
                  </h3>
                  <p className="font-bold text-lg text-neutral-700 leading-relaxed mt-4">
                    A plug-and-play B2B solution targeting digital wallets like NayaPay and SadaPay. Embed stock investing
                    directly into your existing app.
                  </p>
                </div>

                <ArchitectureDiagram />

                <div className="grid md:grid-cols-3 gap-6 mt-12 px-2">
                  <div className="bg-[#CCFBF1] border-2 border-black p-6 rounded-xl shadow-[4px_4px_0_0_#000]">
                    <ShieldCheck size={28} className="mb-4 text-black" />
                    <h4 className="font-black uppercase text-lg mb-2">Embed in Weeks</h4>
                    <p className="text-sm font-bold text-neutral-700">
                      Skip the years of licensing and legacy system integration. Connect securely via REST API.
                    </p>
                  </div>
                  <div className="bg-[#FFDEEB] border-2 border-black p-6 rounded-xl shadow-[4px_4px_0_0_#000]">
                    <Wallet size={28} className="mb-4 text-black" />
                    <h4 className="font-black uppercase text-lg mb-2">Frontend Focus</h4>
                    <p className="text-sm font-bold text-neutral-700">
                      You build the sleek retail app experience. We execute the backend plumbing and routing.
                    </p>
                  </div>
                  <div className="bg-[#FEF08A] border-2 border-black p-6 rounded-xl shadow-[4px_4px_0_0_#000]">
                    <Activity size={28} className="mb-4 text-black" />
                    <h4 className="font-black uppercase text-lg mb-2">Turnkey Ledger</h4>
                    <p className="text-sm font-bold text-neutral-700">
                      Our real-time dashboard handles reconciliation, live PnL tracking, and tax estimations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="pb-24 px-6 mt-12">
          <div className="bg-[#00F0FF] border-4 border-black rounded-[2rem] p-10 md:p-16 text-center shadow-[16px_16px_0_0_#000] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4FF00] rounded-full border-4 border-black translate-x-1/3 -translate-y-1/3 -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF2E93] rounded-full border-4 border-black -translate-x-1/3 translate-y-1/3 -z-0"></div>

            <div className="relative z-10 max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0_0_#000]">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                Shape the Future. <br />
                Join the Pilot.
              </h2>
              <p className="font-bold text-neutral-800 text-lg mb-8 border-l-4 border-[#FF2E93] pl-4 text-left">
                We are in early development and building a closed pilot group. Get in touch directly with the founders to
                request access.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                <div className="flex items-center text-sm font-black uppercase bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0_0_#000]">
                  <span className="w-2 h-2 bg-[#FF2E93] rounded-full mr-2"></span> Fintech Builders
                </div>
                <div className="flex items-center text-sm font-black uppercase bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0_0_#000]">
                  <span className="w-2 h-2 bg-[#D4FF00] rounded-full mr-2"></span> Algo Traders
                </div>
                <div className="flex items-center text-sm font-black uppercase bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0_0_#000]">
                  <span className="w-2 h-2 bg-[#00F0FF] rounded-full mr-2"></span> App LOIs
                </div>
              </div>

              <a
                href="mailto:hi@pypsx.com"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-black uppercase tracking-widest text-black bg-[#D4FF00] border-4 border-black hover:bg-[#FF2E93] hover:text-white transition-all shadow-[6px_6px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0_0_#000]"
              >
                <Mail className="mr-3" size={24} />
                hi@pypsx.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-white border-t-4 border-black mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-bold uppercase">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Globe size={20} />
            <span className="font-black text-lg">pyPSX</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-neutral-500">
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Pakistan Stock Exchange Infrastructure</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

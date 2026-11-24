import { useMemo, useState } from 'react'
import ReportForm from './components/ReportForm'
import { getItems } from './utils/storage'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  MapPin,
  Menu,
  Package,
  PackageSearch,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react'

const sampleItems = [
  {
    id: 1,
    name: 'Black Leather Wallet',
    category: 'Accessories',
    type: 'Found',
    location: 'University Library',
    date: 'Nov 18, 2026',
    icon: '??',
    color: 'bg-blue-50',
    description: 'A black wallet was found near the library entrance.',
  },
  {
    id: 2,
    name: 'Scientific Calculator',
    category: 'Electronics',
    type: 'Lost',
    location: 'Computer Science Block',
    date: 'Nov 17, 2026',
    icon: '??',
    color: 'bg-purple-50',
    description: 'A scientific calculator with a dark protective cover.',
  },
  {
    id: 3,
    name: 'Blue Water Bottle',
    category: 'Personal Items',
    type: 'Found',
    location: 'Main Cafeteria',
    date: 'Nov 16, 2026',
    icon: '??',
    color: 'bg-emerald-50',
    description: 'A blue reusable water bottle was left on a table.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Report an item',
    description:
      'Tell the campus community what you lost or what you found. Add useful details to help identify it.',
    icon: Package,
  },
  {
    number: '02',
    title: 'Find a possible match',
    description:
      'Browse reports and get suggestions based on item category, colour, location, and description.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Verify and return',
    description:
      'Provide a private ownership clue for review before an item is marked as returned.',
    icon: ShieldCheck,
  },
]

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeView, setActiveView] = useState('home')
  const [savedItems, setSavedItems] = useState(() => getItems())
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredItems = useMemo(() => {
  const query = searchQuery.trim().toLowerCase()

  const allItems = [
    ...savedItems.map((item) => ({
      ...item,
      name: item.itemName,
      type: item.type === 'lost' ? 'Lost' : 'Found',
      icon: '📦',
      color: 'bg-blue-50',
      isDemo: false,
    })),
    ...sampleItems.map((item) => ({
      ...item,
      isDemo: true,
    })),
  ]


  return allItems.filter((item) => {
    const matchesSearch = [
      item.name,
      item.category,
      item.type,
      item.location,
      item.description,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query)

    const matchesFilter =
      activeFilter === 'all' ||
      item.type.toLowerCase() === activeFilter

    return matchesSearch && matchesFilter
  })
}, [searchQuery, savedItems, activeFilter])

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const openReportForm = (type) => {
  setActiveView(type === 'lost' ? 'report-lost' : 'report-found')
  closeMobileMenu()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">
    {activeView !== 'home' && (
      <section className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => setActiveView('home')}
            className="text-sm font-semibold text-brand-blue hover:underline"
          >
            ← Back to Home
          </button>

          <h1 className="mt-5 text-3xl font-extrabold text-brand-navy">
            {activeView === 'report-lost' ? 'Report a Lost Item' : 'Report a Found Item'}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Provide accurate details to help reconnect belongings with their owners.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ReportForm
            type={activeView === 'report-lost' ? 'lost' : 'found'}
            onSuccess={() => {
              setSavedItems(getItems())
              setActiveView('home')
            }}
            onCancel={() => setActiveView('home')}
          />
        </div>
      </section>
    )}
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-3"
            onClick={closeMobileMenu}
            aria-label="FindIt home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm">
              <PackageSearch size={25} />
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight text-brand-navy">
                Find<span className="text-brand-blue">It</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Smart Campus Lost & Found
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm font-semibold text-brand-navy">
              Home
            </a>
            <a
              href="#recent-items"
              className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
            >
              Browse Items
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
            >
              How It Works
            </a>
            <button
              type="button"
              onClick={() => openReportForm('lost')}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
            >
              Report an Item
            </button>
            <button
                type="button"
                onClick={() => openReportForm('found')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-brand-navy transition hover:bg-slate-50"
              >
                Report Found
              </button>
          </nav>

          <a
            href="#report-options"
            className="hidden items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex"
          >
            Get Started <ArrowRight size={16} />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-brand-navy hover:bg-slate-100 md:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={closeMobileMenu}>Home</a>
              <a href="#recent-items" onClick={closeMobileMenu}>Browse Items</a>
              <a href="#how-it-works" onClick={closeMobileMenu}>How It Works</a>

              <button
                type="button"
                onClick={() => openReportForm('lost')}
                className="text-left"
              >
                Report Lost
              </button>

              <button
                type="button"
                onClick={() => openReportForm('found')}
                className="text-left"
              >
                Report Found
              </button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative isolate bg-brand-navy">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                A smarter campus community
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Lost something?
                <span className="block text-blue-300">Find it.</span>
                Found something?
                <span className="block text-emerald-300">Return it.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                FindIt connects students and campus members through one
                organised lost and found platform. Report belongings, discover
                possible matches, and help return items to their owners.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => openReportForm('lost')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-7 py-4 font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500"
                  >
                    Report Lost <ArrowRight size={18} />
                  </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  How It Works
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-300" />
                  Organised reports
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-300" />
                  Suggested matches
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-300" />
                  Ownership review
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-400/10 blur-2xl" />
              <div className="relative rounded-3xl border border-white/15 bg-white p-5 shadow-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-sm font-bold text-brand-navy">
                      Campus activity
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      A simple place to reconnect belongings
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <ShieldCheck size={25} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-6">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-blue">
                      <Search size={21} />
                    </div>
                    <p className="text-2xl font-extrabold text-brand-navy">Lost</p>
                    <p className="mt-1 text-xs text-slate-500">Find a report</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600">
                      <Package size={21} />
                    </div>
                    <p className="text-2xl font-extrabold text-brand-navy">Found</p>
                    <p className="mt-1 text-xs text-slate-500">Help its owner</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-navy">
                      Suggested match
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      Example
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                      ??
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-brand-navy">
                        Black leather wallet
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Similar category and location
                      </p>
                    </div>
                    <ArrowRight className="text-brand-blue" size={19} />
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400">
                  Illustrative preview � Not a live match
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent items */}
        <section id="recent-items" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-blue">
                Campus lost & found
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                Explore recent reports
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-500">
                Browse campus lost and found reports. Search by item,
                category, or location, and filter reports by their type.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-brand-blue md:self-auto">
              <CircleHelp size={15} />
              Demonstration data
            </div>
          </div>

          <div className="mt-9 max-w-xl">
            <label htmlFor="item-search" className="sr-only">
              Search items
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition focus-within:border-brand-blue focus-within:ring-4 focus-within:ring-blue-100">
              <Search className="shrink-0 text-slate-400" size={21} />
              <input
                id="item-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by item, category, or location..."
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { label: 'All Items', value: 'all' },
              { label: 'Lost Items', value: 'lost' },
              { label: 'Found Items', value: 'found' },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeFilter === filter.value
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className="flex items-start justify-between p-5 pb-0">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-3xl`}>
                    {item.icon}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      item.type === 'Lost'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      item.isDemo
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {item.isDemo ? 'DEMO DATA' : 'USER REPORT'}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-brand-navy">
                    {item.name}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={15} className="shrink-0 text-brand-blue" />
                      {item.location}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={15} className="shrink-0 text-brand-blue" />
                      {item.date}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <PackageSearch className="mx-auto text-slate-400" size={36} />
              <h3 className="mt-4 font-bold text-brand-navy">
                {activeFilter === 'lost'
                  ? 'No lost items found'
                  : activeFilter === 'found'
                  ? 'No found items found'
                  : 'No matching reports found'}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another item name, category, or location, or submit a new report.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('all')
                }}
                className="mt-4 font-semibold text-brand-blue hover:underline"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-blue">
                Simple process
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                How FindIt works
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                Three clear steps to help lost belongings find their way home.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon

                return (
                  <article
                    key={step.number}
                    className="relative rounded-2xl border border-slate-200 bg-slate-50 p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-blue">
                        <Icon size={27} />
                      </div>
                      <span className="text-3xl font-extrabold text-slate-200">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl font-bold text-brand-navy">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {step.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Report options */}
        <section id="report-options" className="bg-brand-navy px-5 py-16 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold text-white">
                Be part of the solution.
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                Every useful report brings a lost belonging one step closer to
                its owner. Reporting forms are the next implementation stage.
              </p>
            </div>
            <a
              href="#recent-items"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-brand-navy transition hover:bg-blue-50"
            >
              Browse reports <ChevronRight size={19} />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue">
                <PackageSearch size={22} />
              </div>
              <span className="text-xl font-extrabold">
                Find<span className="text-blue-400">It</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              A smart campus lost and found concept built to connect people
              with their belongings.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#recent-items" className="hover:text-white">Browse reports</a>
            <a href="#how-it-works" className="hover:text-white">How it works</a>
          </div>

          <div className="max-w-xs text-sm leading-6 text-slate-400">
            <p className="flex items-center gap-2 font-semibold text-white">
              <Smartphone size={17} /> Campus community
            </p>
            <p className="mt-3">
              Prototype interface. Sample listings are illustrative and do not
              represent verified real-world reports.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>� 2026 FindIt. Smart Campus Lost & Found.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

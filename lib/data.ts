// Mock financial data

export const portfolioBalance = 284_750.42;
export const monthlyIncome = 12_840.00;
export const monthlyExpenses = 4_320.80;
export const monthlySavings = 8_519.20;

export const kpiCards = [
  {
    id: "balance",
    label: "Solde Total",
    value: 284_750.42,
    change: +3.24,
    trend: "up",
    prefix: "€",
    color: "green",
    description: "Tous comptes confondus",
  },
  {
    id: "income",
    label: "Revenus du mois",
    value: 12_840.00,
    change: +8.5,
    trend: "up",
    prefix: "€",
    color: "blue",
    description: "Salaire + dividendes",
  },
  {
    id: "expenses",
    label: "Dépenses du mois",
    value: 4_320.80,
    change: -2.1,
    trend: "down",
    prefix: "€",
    color: "purple",
    description: "vs mois dernier",
  },
  {
    id: "savings",
    label: "Épargne nette",
    value: 8_519.20,
    change: +12.8,
    trend: "up",
    prefix: "€",
    color: "amber",
    description: "Taux : 66.3%",
  },
];

export const cashflowData = [
  { month: "Nov", income: 10_200, expenses: 4_800, savings: 5_400 },
  { month: "Déc", income: 13_500, expenses: 6_200, savings: 7_300 },
  { month: "Jan", income: 11_800, expenses: 4_100, savings: 7_700 },
  { month: "Fév", income: 12_400, expenses: 3_900, savings: 8_500 },
  { month: "Mar", income: 11_200, expenses: 5_300, savings: 5_900 },
  { month: "Avr", income: 14_100, expenses: 4_600, savings: 9_500 },
  { month: "Mai", income: 12_840, expenses: 4_320, savings: 8_520 },
];

export const portfolioHistory = [
  { date: "01/11", value: 248_000 },
  { date: "08/11", value: 251_400 },
  { date: "15/11", value: 249_800 },
  { date: "22/11", value: 257_200 },
  { date: "01/12", value: 262_500 },
  { date: "08/12", value: 259_100 },
  { date: "15/12", value: 264_300 },
  { date: "22/12", value: 261_800 },
  { date: "01/01", value: 267_400 },
  { date: "08/01", value: 272_900 },
  { date: "15/01", value: 275_200 },
  { date: "22/01", value: 278_600 },
  { date: "01/02", value: 276_100 },
  { date: "08/02", value: 279_800 },
  { date: "15/02", value: 281_200 },
  { date: "22/02", value: 283_400 },
  { date: "01/03", value: 280_700 },
  { date: "08/03", value: 282_300 },
  { date: "15/03", value: 284_750 },
];

export const allocationData = [
  { name: "Actions", value: 45, color: "#10b981", amount: 128_137 },
  { name: "Obligations", value: 20, color: "#3b82f6", amount: 56_950 },
  { name: "Crypto", value: 15, color: "#8b5cf6", amount: 42_712 },
  { name: "Immobilier", value: 12, color: "#f59e0b", amount: 34_170 },
  { name: "Cash", value: 8,  color: "#64748b", amount: 22_780 },
];

export const transactions = [
  { id: 1, date: "05/05/2026", label: "Salaire – Accenture",     category: "Revenus",       amount: +8_500, type: "income",  icon: "💼" },
  { id: 2, date: "04/05/2026", label: "Loyer Appartement",       category: "Logement",      amount: -1_200, type: "expense", icon: "🏠" },
  { id: 3, date: "04/05/2026", label: "Dividendes LVMH",         category: "Investissement",amount: +342,   type: "income",  icon: "📈" },
  { id: 4, date: "03/05/2026", label: "Courses Monoprix",        category: "Alimentation",  amount: -187,   type: "expense", icon: "🛒" },
  { id: 5, date: "03/05/2026", label: "Virement Livret A",       category: "Épargne",       amount: -2_000, type: "transfer",icon: "🏦" },
  { id: 6, date: "02/05/2026", label: "Netflix, Spotify, Canal+",category: "Abonnements",   amount: -57,    type: "expense", icon: "📱" },
  { id: 7, date: "02/05/2026", label: "Restaurant Le Comptoir",  category: "Restaurants",   amount: -94,    type: "expense", icon: "🍽️" },
  { id: 8, date: "01/05/2026", label: "Achat ETF MSCI World",    category: "Investissement",amount: -1_500, type: "transfer",icon: "📊" },
  { id: 9, date: "30/04/2026", label: "Freelance Design",        category: "Revenus",       amount: +1_800, type: "income",  icon: "🎨" },
  {id: 10, date: "29/04/2026", label: "Essence – Total",         category: "Transport",     amount: -85,    type: "expense", icon: "⛽" },
  {id: 11, date: "28/04/2026", label: "Assurance voiture",       category: "Assurance",     amount: -138,   type: "expense", icon: "🚗" },
  {id: 12, date: "27/04/2026", label: "Dividendes Apple",        category: "Investissement",amount: +198,   type: "income",  icon: "🍎" },
];

export const budgetCategories = [
  { name: "Logement",     budget: 1_400, spent: 1_200, color: "#3b82f6",  icon: "🏠" },
  { name: "Alimentation", budget: 600,   spent: 487,   color: "#10b981",  icon: "🛒" },
  { name: "Transport",    budget: 300,   spent: 223,   color: "#f59e0b",  icon: "🚗" },
  { name: "Loisirs",      budget: 400,   spent: 318,   color: "#8b5cf6",  icon: "🎭" },
  { name: "Santé",        budget: 200,   spent: 94,    color: "#06b6d4",  icon: "💊" },
  { name: "Abonnements",  budget: 100,   spent: 57,    color: "#ec4899",  icon: "📱" },
  { name: "Restaurants",  budget: 300,   spent: 94,    color: "#f97316",  icon: "🍽️" },
  { name: "Shopping",     budget: 250,   spent: 0,     color: "#64748b",  icon: "👕" },
];

export const stocks = [
  { ticker: "AAPL",  name: "Apple Inc.",          price: 212.48, change: +1.24, pct: +0.59, shares: 42,   value: 8_924, alloc: 6.96,  color: "#94a3b8" },
  { ticker: "NVDA",  name: "NVIDIA Corp.",         price: 875.20, change: +22.4, pct: +2.63, shares: 15,   value: 13_128, alloc: 10.24, color: "#10b981" },
  { ticker: "MSFT",  name: "Microsoft Corp.",      price: 418.62, change: -3.18, pct: -0.75, shares: 28,   value: 11_721, alloc: 9.14,  color: "#ef4444" },
  { ticker: "MC.PA", name: "LVMH Moët Hennessy",  price: 692.40, change: +8.60, pct: +1.26, shares: 12,   value: 8_309,  alloc: 6.48,  color: "#10b981" },
  { ticker: "CW8",   name: "MSCI World ETF",       price: 448.12, change: +2.84, pct: +0.64, shares: 85,   value: 38_090, alloc: 29.72, color: "#10b981" },
  { ticker: "BTC",   name: "Bitcoin",              price: 97_420, change: +1240, pct: +1.29, shares: 0.28, value: 27_277, alloc: 21.28, color: "#10b981" },
  { ticker: "ETH",   name: "Ethereum",             price: 3_218,  change: -84,   pct: -2.54, shares: 4.8,  value: 15_446, alloc: 12.05, color: "#ef4444" },
  { ticker: "IMMO",  name: "SCPI Corum Origin",    price: 1_135,  change: 0,     pct: 0,     shares: 30,   value: 34_050, alloc: 26.57, color: "#94a3b8" },
];

export const monthlySpendingByCategory = [
  { category: "Logement",    jan: 1200, fev: 1200, mar: 1200, avr: 1200, mai: 1200 },
  { category: "Alimentation",jan: 520,  fev: 480,  mar: 510,  avr: 495,  mai: 487  },
  { category: "Transport",   jan: 310,  fev: 180,  mar: 245,  avr: 290,  mai: 223  },
  { category: "Loisirs",     jan: 280,  fev: 350,  mar: 420,  avr: 310,  mai: 318  },
  { category: "Restaurants", jan: 210,  fev: 145,  mar: 190,  avr: 230,  mai: 94   },
];

export const radarData = [
  { subject: "Épargne",      A: 88, fullMark: 100 },
  { subject: "Investissement",A: 92, fullMark: 100 },
  { subject: "Budget",       A: 74, fullMark: 100 },
  { subject: "Diversif.",    A: 81, fullMark: 100 },
  { subject: "Revenus",      A: 67, fullMark: 100 },
  { subject: "Endettement",  A: 95, fullMark: 100 },
];

export const analyticsKpis = [
  { label: "Taux d'épargne",        value: "66.3%", change: "+4.2pp", up: true },
  { label: "Rendement portefeuille", value: "+14.8%", change: "+2.3pp", up: true },
  { label: "Ratio dépenses/revenus", value: "33.7%", change: "-2.1pp", up: true },
  { label: "Score santé financière", value: "87/100", change: "+3pts",  up: true },
];

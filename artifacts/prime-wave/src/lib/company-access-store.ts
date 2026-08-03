export interface CompanyAccessItem {
  id: string;
  name: string;
  email: string;
  industry: string;
  location: string;
  activeJobs: number;
  totalHires: number;
  accessGranted: boolean;
  grantedAt: string;
}

const COMPANY_ACCESS_STORAGE_KEY = 'primewave_authorized_companies_v2';

const DEFAULT_COMPANIES: CompanyAccessItem[] = [
  {
    id: 'comp-1',
    name: 'Google Inc.',
    email: 'hr@google.com',
    industry: 'AI & Cloud Infrastructure',
    location: 'Mountain View, CA / Remote',
    activeJobs: 5,
    totalHires: 12,
    accessGranted: true,
    grantedAt: '2026-07-15'
  },
  {
    id: 'comp-2',
    name: 'Microsoft Corp.',
    email: 'recruiter@microsoft.com',
    industry: 'Enterprise Software & Cloud',
    location: 'Redmond, WA / Remote',
    activeJobs: 4,
    totalHires: 9,
    accessGranted: true,
    grantedAt: '2026-07-18'
  },
  {
    id: 'comp-3',
    name: 'Zoho Corporation',
    email: 'hiring@zoho.com',
    industry: 'SaaS & Enterprise Tools',
    location: 'Chennai, India / Remote',
    activeJobs: 6,
    totalHires: 15,
    accessGranted: true,
    grantedAt: '2026-07-20'
  },
  {
    id: 'comp-4',
    name: 'Tesla Motors',
    email: 'talent@tesla.com',
    industry: 'Autonomous Systems & AI',
    location: 'Austin, TX / Remote',
    activeJobs: 3,
    totalHires: 6,
    accessGranted: true,
    grantedAt: '2026-07-25'
  }
];

function loadCompanyAccess(): CompanyAccessItem[] {
  try {
    const raw = localStorage.getItem(COMPANY_ACCESS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load company access storage:', e);
  }
  return DEFAULT_COMPANIES;
}

function saveCompanyAccess(items: CompanyAccessItem[]) {
  try {
    localStorage.setItem(COMPANY_ACCESS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('company-access-updated'));
  } catch (e) {
    console.error('Failed to save company access:', e);
  }
}

export function getAuthorizedCompanies(): CompanyAccessItem[] {
  return loadCompanyAccess();
}

export function grantCompanyAccessAction(payload: {
  name: string;
  email: string;
  industry?: string;
  location?: string;
}): CompanyAccessItem {
  const current = loadCompanyAccess();

  const newCompany: CompanyAccessItem = {
    id: `comp-${Date.now()}`,
    name: payload.name,
    email: payload.email.toLowerCase(),
    industry: payload.industry || 'Technology & Software',
    location: payload.location || 'Remote',
    activeJobs: 1,
    totalHires: 0,
    accessGranted: true,
    grantedAt: new Date().toISOString().split('T')[0]
  };

  const updated = [newCompany, ...current];
  saveCompanyAccess(updated);
  return newCompany;
}

export function toggleCompanyAccessAction(id: string): CompanyAccessItem | null {
  const current = loadCompanyAccess();
  let updatedItem: CompanyAccessItem | null = null;

  const updated = current.map(item => {
    if (item.id === id) {
      updatedItem = { ...item, accessGranted: !item.accessGranted };
      return updatedItem;
    }
    return item;
  });

  saveCompanyAccess(updated);
  return updatedItem;
}

export function isEmailAuthorizedForCompanyPortal(email: string): boolean {
  if (!email) return false;
  const current = loadCompanyAccess();
  const normalized = email.toLowerCase().trim();
  return current.some(c => c.email.toLowerCase() === normalized && c.accessGranted);
}

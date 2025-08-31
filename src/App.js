import React, { useState, useEffect } from 'react';
import { auth } from './supabase';
import { 
  LayoutDashboard, 
  DollarSign, 
  Briefcase, 
  Building2, 
  Home, 
  Package, 
  Truck, 
  Users, 
  UserCheck, 
  Settings,
  Menu,
  X,
  LogOut,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

const AstraCoreApp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');

  // Kontrola autentizace při načtení
  useEffect(() => {
    let mounted = true;

    // Kontrola aktuálního uživatele
    auth.getUser().then(({ data: { user } }) => {
      if (mounted) {
        setUser(user);
        setLoading(false);
      }
    });

    // Naslouchání změnám autentizace
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        if (loading) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Prázdný dependency array!

  // Přihlášení
  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setError('Vyplňte email a heslo');
      return;
    }

    setLoginLoading(true);
    setError('');

    try {
      const { error } = await auth.signIn(loginForm.email, loginForm.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Neplatné přihlašovací údaje');
        } else {
          setError(error.message);
        }
      }
    } catch (err) {
      setError('Chyba při přihlašování');
    } finally {
      setLoginLoading(false);
    }
  };

  // Odhlášení
  const handleLogout = async () => {
    await auth.signOut();
    setCurrentPage('dashboard');
    setLoginForm({ email: '', password: '' });
  };

  const handleForgotPassword = () => {
    alert('Funkce "Zapomenuté heslo" bude implementována později');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'zakazky', label: 'Zakázky', icon: Briefcase },
    { id: 'stavebni-projekty', label: 'Stavební Projekty', icon: Building2 },
    { id: 'nemovitosti', label: 'Nemovitosti', icon: Home },
    { id: 'sklady', label: 'Sklady', icon: Package },
    { id: 'flotila', label: 'Flotila', icon: Truck },
    { id: 'klienti', label: 'Klienti', icon: Users },
    { id: 'dodavatele', label: 'Dodavatelé', icon: UserCheck },
    { id: 'zamestnanci', label: 'Zaměstnanci', icon: Users },
    { id: 'nastaveni', label: 'Nastavení', icon: Settings },
  ];

  // Logo component - přesunuté mimo render pro optimalizaci
  const Logo = React.memo(({ size = 'large' }) => (
    <div className={`flex items-center ${size === 'small' ? 'space-x-2' : 'space-x-3'}`}>
      <div className={`${size === 'small' ? 'w-8 h-8' : 'w-12 h-12'} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#F56500" 
            strokeWidth="2"
          />
          <path 
            d="M20 50 L50 20 L80 50 L50 80 Z" 
            fill="none" 
            stroke="#F56500" 
            strokeWidth="2"
          />
        </svg>
      </div>
      <div>
        <div className={`font-bold text-white ${size === 'small' ? 'text-lg' : 'text-2xl'}`}>
          AstraCore
        </div>
        <div className={`text-orange-400 ${size === 'small' ? 'text-xs' : 'text-sm'} tracking-wider`}>
          SOLUTIONS
        </div>
      </div>
    </div>
  ));

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Logo />
          <div className="mt-8 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-orange-400 mr-2" />
            <span className="text-slate-300">Načítání...</span>
          </div>
        </div>
      </div>
    );
  }

  // Login Page - memoizované pro lepší výkon
  const LoginPage = React.memo(() => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
          <p className="text-slate-400 mt-4">Přihlaste se do firemního systému</p>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => {
                  setLoginForm(prev => ({...prev, email: e.target.value}));
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="vas.email@astracore.pro"
                disabled={loginLoading}
                autoComplete="email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Heslo
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm(prev => ({...prev, password: e.target.value}));
                    if (error) setError('');
                  }}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent pr-12"
                  placeholder="••••••••"
                  disabled={loginLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  disabled={loginLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loginLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Přihlašování...
                </div>
              ) : (
                'Přihlásit se'
              )}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={handleForgotPassword}
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
              disabled={loginLoading}
            >
              Zapomněli jste heslo?
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  // Dashboard Content
  const DashboardContent = React.memo(() => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-slate-400 mt-2 sm:mt-0">
          {new Date().toLocaleDateString('cs-CZ', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Aktivní zakázky', value: '12', change: '+2', icon: Briefcase },
          { title: 'Měsíční obrat', value: '2.4M Kč', change: '+15%', icon: DollarSign },
          { title: 'Stavební projekty', value: '5', change: '0', icon: Building2 },
          { title: 'Vozidla v provozu', value: '8/10', change: '-1', icon: Truck },
        ].map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-400' : 
                  stat.change.startsWith('-') ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {stat.change !== '0' && stat.change} {stat.change !== '0' ? 'vs minulý měsíc' : 'beze změny'}
                </p>
              </div>
              <div className="p-3 bg-slate-700 rounded-lg">
                <stat.icon className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Rychlé akce</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Nová zakázka', icon: Briefcase, action: () => setCurrentPage('zakazky') },
            { label: 'Vystavit fakturu', icon: DollarSign, action: () => setCurrentPage('finance') },
            { label: 'Přidat klienta', icon: Users, action: () => setCurrentPage('klienti') },
            { label: 'Nový zápis do deníku', icon: Building2, action: () => setCurrentPage('zakazky') },
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors group"
            >
              <action.icon className="w-8 h-8 text-orange-400 group-hover:text-orange-300 mb-2" />
              <span className="text-sm text-slate-300 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Welcome message with user info */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-2">
          Vítejte zpět! 👋
        </h2>
        <p className="text-slate-400">
          Přihlášen jako: <span className="text-orange-400">{user?.email}</span>
        </p>
        <p className="text-slate-500 text-sm mt-1">
          Naposledy přihlášen: {new Date().toLocaleString('cs-CZ')}
        </p>
      </div>
    </div>
  ));

  // Page Content Router
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'finance':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Finance</h1>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400">Finanční přehledy a faktury</p>
              <p className="text-sm text-slate-500 mt-2">Připojeno k databázi - data budou načítána z Supabase</p>
            </div>
          </div>
        );
      case 'zakazky':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Zakázky</h1>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400">Přehled všech zakázek</p>
              <p className="text-sm text-slate-500 mt-2">Připojeno k databázi - data budou načítána z Supabase</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white capitalize">
              {navigationItems.find(item => item.id === currentPage)?.label || 'Stránka'}
            </h1>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400">Obsah sekce bude implementován...</p>
              <p className="text-sm text-slate-500 mt-2">Připojeno k databázi - data budou načítána z Supabase</p>
            </div>
          </div>
        );
    }
  };

  // Main App Layout
  const MainApp = () => (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <Logo size="small" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg text-left transition-all
                    ${currentPage === item.id
                      ? 'bg-orange-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all"
            >
              <LogOut size={20} className="mr-3" />
              Odhlásit se
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <header className="bg-slate-800 border-b border-slate-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">
                {user?.email?.split('@')[0]}
              </span>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {renderPageContent()}
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );

  return user ? <MainApp /> : <LoginPage />;
};

export default AstraCoreApp;

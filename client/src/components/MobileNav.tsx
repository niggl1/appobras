import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileText,
  Camera,
  MapPin,
  Users,
  Wrench,
  DollarSign,
  Calendar,
  Ruler,
  Settings,
  LogOut,
  Bell,
  User,
  ChevronRight,
  HardHat
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Início", href: "/", icon: <Home className="h-5 w-5" /> },
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Obras", href: "/obras", icon: <Building2 className="h-5 w-5" />, badge: 5 },
  { label: "Ordens de Serviço", href: "/ordens", icon: <ClipboardList className="h-5 w-5" />, badge: 3 },
  { label: "Diário de Obra", href: "/diario", icon: <FileText className="h-5 w-5" /> },
  { label: "Orçamentos", href: "/orcamentos", icon: <DollarSign className="h-5 w-5" /> },
  { label: "Medições", href: "/medicoes", icon: <Ruler className="h-5 w-5" /> },
  { label: "Mão de Obra", href: "/mao-de-obra", icon: <HardHat className="h-5 w-5" /> },
  { label: "Fornecedores", href: "/fornecedores", icon: <Wrench className="h-5 w-5" /> },
  { label: "Galeria", href: "/galeria", icon: <Camera className="h-5 w-5" /> },
  { label: "Mapa", href: "/mapa", icon: <MapPin className="h-5 w-5" /> },
];

// Menu de navegação inferior para mobile
export function MobileBottomNav() {
  const [location] = useLocation();
  
  const bottomNavItems = [
    { label: "Início", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Obras", href: "/obras", icon: <Building2 className="h-5 w-5" /> },
    { label: "Diário", href: "/diario", icon: <FileText className="h-5 w-5" /> },
    { label: "Mais", href: "#menu", icon: <Menu className="h-5 w-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {bottomNavItems.map((item) => {
          const isActive = location === item.href;
          
          if (item.href === "#menu") {
            return (
              <MobileMenuSheet key={item.label}>
                <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-amber-500 transition-colors">
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              </MobileMenuSheet>
            );
          }
          
          return (
            <Link key={item.label} href={item.href}>
              <a className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-amber-500' : 'text-gray-500 hover:text-amber-500'
              }`}>
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 w-12 h-0.5 bg-amber-500 rounded-t-full" />
                )}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Menu lateral deslizante para mobile
export function MobileMenuSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-4 bg-amber-500">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <Building2 className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-left">
              <SheetTitle className="text-white">AppObras</SheetTitle>
              <p className="text-amber-100 text-sm">Gestão de Obras</p>
            </div>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Menu Principal</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.label} href={item.href}>
                    <a 
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-amber-500' : 'text-gray-500'}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <Badge className="bg-amber-500 text-white">{item.badge}</Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>
        </ScrollArea>
        
        {/* Footer do menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <User className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Utilizador</p>
              <p className="text-xs text-gray-500">Engenheiro</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Header mobile
export function MobileHeader() {
  const [location] = useLocation();
  
  const getPageTitle = () => {
    const titles: Record<string, string> = {
      '/': 'AppObras',
      '/dashboard': 'Dashboard',
      '/obras': 'Obras',
      '/ordens': 'Ordens de Serviço',
      '/diario': 'Diário de Obra',
      '/orcamentos': 'Orçamentos',
      '/medicoes': 'Medições',
      '/mao-de-obra': 'Mão de Obra',
      '/fornecedores': 'Fornecedores',
      '/galeria': 'Galeria',
      '/mapa': 'Mapa de Obras',
    };
    return titles[location] || 'AppObras';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 md:hidden safe-area-inset-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <h1 className="font-semibold text-lg">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </Button>
          <MobileMenuSheet>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </MobileMenuSheet>
        </div>
      </div>
    </header>
  );
}

// Componente de card otimizado para mobile
export function MobileCard({ 
  children, 
  className = "",
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 active:scale-[0.98] transition-transform ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Componente de ação rápida para mobile
export function MobileQuickAction({
  icon,
  label,
  onClick,
  color = "amber"
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: "amber" | "blue" | "green" | "red" | "purple";
}) {
  const colorClasses = {
    amber: "bg-amber-100 text-amber-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <button 
      className="flex flex-col items-center gap-2 p-3 rounded-xl active:scale-95 transition-transform"
      onClick={onClick}
    >
      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}

// Componente de lista otimizada para mobile
export function MobileListItem({
  icon,
  title,
  subtitle,
  rightContent,
  onClick
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div 
      className="flex items-center gap-3 p-4 bg-white border-b border-gray-100 active:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      {icon && (
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{title}</p>
        {subtitle && <p className="text-sm text-gray-500 truncate">{subtitle}</p>}
      </div>
      {rightContent && (
        <div className="flex-shrink-0">
          {rightContent}
        </div>
      )}
      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
    </div>
  );
}

// Hook para detectar se é mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  });

  return isMobile;
}

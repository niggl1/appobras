import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import MagazineViewer from "./pages/MagazineViewer";
import RevistaEditor from "./pages/RevistaEditor";
import CondominioManager from "./pages/CondominioManager";
import Templates from "./pages/Templates";
import TransitionEffects from "./pages/TransitionEffects";
import Notificacoes from "./pages/Notificacoes";
import Votar from "./pages/Votar";
import { ItemCompartilhadoPage } from "./pages/ItemCompartilhadoPage";
import AgendaVencimentos from "./pages/AgendaVencimentos";
import Contrato from "./pages/Contrato";
import Apresentacao from "./pages/Apresentacao";
import CadastroMorador from "./pages/CadastroMorador";
import AssembleiaPublica from "./pages/AssembleiaPublica";
import NotificarMoradorPage from "./pages/NotificarMoradorPage";
import HistoricoInfracoesPage from "./pages/HistoricoInfracoesPage";
import NotificacaoPublicaPage from "./pages/NotificacaoPublicaPage";
import DemoLayouts from "./pages/DemoLayouts";
import LandingApp from "./pages/LandingApp";
import LandingRevista from "./pages/LandingRevista";
import LandingRelatorio from "./pages/LandingRelatorio";
import MoradorLogin from "./pages/MoradorLogin";
import MoradorDashboard from "./pages/MoradorDashboard";
import MoradorRecuperarSenha from "./pages/MoradorRecuperarSenha";
import MoradorRedefinirSenha from "./pages/MoradorRedefinirSenha";
import Login from "./pages/Login";
import Registar from "./pages/Registar";
import RecuperarSenha from "./pages/RecuperarSenha";
import RedefinirSenha from "./pages/RedefinirSenha";
import Perfil from "./pages/Perfil";
import AdminFuncoes from "./pages/AdminFuncoes";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminLogs from "./pages/AdminLogs";
import FuncionarioLogin from "./pages/FuncionarioLogin";
import FuncionarioDashboard from "./pages/FuncionarioDashboard";
import FuncionarioRecuperarSenha from "./pages/FuncionarioRecuperarSenha";
import FuncionarioRedefinirSenha from "./pages/FuncionarioRedefinirSenha";
import MembroLogin from "./pages/MembroLogin";
import MembroEsqueciSenha from "./pages/MembroEsqueciSenha";
import MembroRedefinirSenha from "./pages/MembroRedefinirSenha";
import HistoricoAcessosPage from "./pages/HistoricoAcessosPage";
import CompartilhadoPage from "./pages/CompartilhadoPage";
import CompartilhamentosPage from "./pages/CompartilhamentosPage";
import TimelineVisualizarPage from "./pages/TimelineVisualizarPage";
import AppBuilder from "./pages/AppBuilder";
import RelatorioBuilder from "./pages/RelatorioBuilder";
import OrdensServico from "@/pages/OrdensServico";
import OrdemServicoDetalhe from "@/pages/OrdemServicoDetalhe";
import OrdensServicoConfig from "@/pages/OrdensServicoConfig";
// CriarProjeto removido - sistema focado em manutenção
import AppViewer from "./pages/AppViewer";
import AppView from "./pages/AppView";
import HistoricoTarefasSimples from "./pages/HistoricoTarefasSimples";
import AppRedefinirSenha from "./pages/AppRedefinirSenha";
import TimelinePage from "./pages/TimelinePage";
import GestorRedefinirSenha from "./pages/GestorRedefinirSenha";
import RelatoriosManutencaoPage from "./pages/RelatoriosManutencaoPage";
import WhatsAppButton from "./components/WhatsAppButton";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/registar" component={Registar} />
      <Route path="/recuperar-senha" component={RecuperarSenha} />
      <Route path="/redefinir-senha/:token" component={RedefinirSenha} />
      <Route path="/app/recuperar-senha/:token" component={AppRedefinirSenha} />
      <Route path="/demo" component={Demo} />
      <Route path="/demo-layouts" component={DemoLayouts} />
      <Route path="/app" component={LandingApp} />
      <Route path="/revista" component={LandingRevista} />
      <Route path="/relatorio" component={LandingRelatorio} />
      <Route path="/templates" component={Templates} />
      <Route path="/contrato" component={Contrato} />
      <Route path="/apresentacao" component={Apresentacao} />
      <Route path="/transicoes" component={TransitionEffects} />
      <Route path="/revista/:shareLink" component={MagazineViewer} />
      <Route path="/app/:shareLink" component={AppViewer} />
      <Route path="/meuapp/:id" component={AppView} />
      
      {/* Voting route */}
      <Route path="/votar/:id" component={Votar} />
      
      {/* Shared item routes */}
      <Route path="/compartilhado/:tipo/:token" component={ItemCompartilhadoPage} />
      <Route path="/compartilhado/:token" component={CompartilhadoPage} />
      <Route path="/timeline/:token">{(params) => <TimelineVisualizarPage token={params.token} />}</Route>
      
      {/* Public registration */}
      <Route path="/cadastro/:token" component={CadastroMorador} />
      
      {/* Public assembly access */}
      <Route path="/assembleia/:id" component={AssembleiaPublica} />
      
      {/* Public notification response */}
      <Route path="/notificacao/:token" component={NotificacaoPublicaPage} />
      
      {/* Portal do Morador */}
      <Route path="/morador/login" component={MoradorLogin} />
      <Route path="/morador/recuperar-senha" component={MoradorRecuperarSenha} />
      <Route path="/morador/redefinir-senha/:token" component={MoradorRedefinirSenha} />
      <Route path="/morador" component={MoradorDashboard} />
      
      {/* Portal do Membro da Equipe */}
      <Route path="/equipe/login" component={MembroLogin} />
      <Route path="/equipe/esqueci-senha" component={MembroEsqueciSenha} />
      <Route path="/equipe/redefinir-senha" component={MembroRedefinirSenha} />
      
      {/* Portal do Funcionário */}
      <Route path="/funcionario/login" component={FuncionarioLogin} />
      <Route path="/funcionario/recuperar-senha" component={FuncionarioRecuperarSenha} />
      <Route path="/funcionario/redefinir-senha" component={FuncionarioRedefinirSenha} />
      <Route path="/funcionario/dashboard" component={FuncionarioDashboard} />
      <Route path="/funcionario/:section" component={FuncionarioDashboard} />
      
      {/* Protected routes */}
      <Route path="/perfil" component={Perfil} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/notificacoes" component={Notificacoes} />
      <Route path="/dashboard/vencimentos">{() => { window.location.href = '/dashboard/agenda-vencimentos'; return null; }}</Route>
      <Route path="/dashboard/notificar-morador" component={NotificarMoradorPage} />
      <Route path="/dashboard/historico-infracoes" component={HistoricoInfracoesPage} />
      <Route path="/admin/funcoes" component={AdminFuncoes} />
      <Route path="/admin/usuarios" component={AdminUsuarios} />
      <Route path="/admin/logs" component={AdminLogs} />
      <Route path="/dashboard/historico-acessos" component={HistoricoAcessosPage} />
      <Route path="/dashboard/apps/novo" component={AppBuilder} />
      <Route path="/dashboard/relatorios/novo" component={RelatorioBuilder} />
      {/* Rota de ordens-servico agora usa o Dashboard.tsx */}
      <Route path="/dashboard/ordens-servico/configuracoes" component={OrdensServicoConfig} />
      <Route path="/dashboard/ordens-servico/:id" component={OrdemServicoDetalhe} />
      {/* Rota criar-projeto removida - sistema focado em manutenção */}
      <Route path="/dashboard/funcoes-simples" component={HistoricoTarefasSimples} />
      <Route path="/dashboard/relatorios-manutencao" component={RelatoriosManutencaoPage} />
      <Route path="/dashboard/compartilhamentos" component={CompartilhamentosPage} />
      <Route path="/dashboard/revistas/nova">{() => { window.location.href = '/dashboard/revistas'; return null; }}</Route>
      <Route path="/dashboard/:section" component={Dashboard} />
      <Route path="/condominio/:id" component={CondominioManager} />
      <Route path="/revista/editor/:id" component={RevistaEditor} />
      
      {/* Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <WhatsAppButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

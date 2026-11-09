import {
  Zap,
  Shield,
  ShieldCheck,
  BarChart3,
  Clock,
  ListChecks,
  Ban,
  EyeOff,
  Download,
  ChevronDown,
  Menu,
  X,
  Mail,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  HelpCircle,
  BookOpen,
  LifeBuoy,
  Home,
  ExternalLink,
} from "lucide-react";

const iconMap = {
  Zap,
  Shield,
  ShieldCheck,
  BarChart3,
  Clock,
  ListChecks,
  Ban,
  EyeOff,
  Download,
  ChevronDown,
  Menu,
  X,
  Mail,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  HelpCircle,
  BookOpen,
  LifeBuoy,
  Home,
  ExternalLink,
};

export function Icon({ name, className = "h-5 w-5", ...props }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component className={className} {...props} aria-hidden="true" />;
}

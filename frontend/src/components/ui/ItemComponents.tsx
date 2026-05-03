import { 
  Leaf, Lightbulb, Users, Target, Award, Shield, Zap, 
  Settings, Droplets, Recycle, Factory, HardHat, 
  Globe, Briefcase, Handshake, CheckCircle 
} from 'lucide-react';

export const getIcon = (iconName?: string) => {
  const name = iconName?.toLowerCase();
  
  // Ukuran dan styling umum
  const iconStyle = "w-12 h-12";

  switch (name) {
    // --- Lingkungan & Keberlanjutan ---
    case 'leaf': return <Leaf className={`${iconStyle} text-green-500`} />;
    case 'recycle': return <Recycle className={`${iconStyle} text-green-600`} />;
    case 'droplets': return <Droplets className={`${iconStyle} text-blue-400`} />;
    case 'globe': return <Globe className={`${iconStyle} text-emerald-500`} />;

    // --- Kelistrikan & Inovasi ---
    case 'zap': return <Zap className={`${iconStyle} text-blue-500`} />;
    case 'lightbulb': return <Lightbulb className={`${iconStyle} text-yellow-500`} />;
    case 'settings': return <Settings className={`${iconStyle} text-slate-500`} />;

    // --- Operasional & Safety ---
    case 'factory': return <Factory className={`${iconStyle} text-slate-600`} />;
    case 'hardhat': return <HardHat className={`${iconStyle} text-orange-500`} />;
    case 'shield': return <Shield className={`${iconStyle} text-blue-600`} />;

    // --- Corporate & Partnership ---
    case 'users': return <Users className={`${iconStyle} text-green-500`} />;
    case 'handshake': return <Handshake className={`${iconStyle} text-blue-500`} />;
    case 'target': return <Target className={`${iconStyle} text-red-500`} />;
    case 'award': return <Award className={`${iconStyle} text-yellow-500`} />;
    case 'briefcase': return <Briefcase className={`${iconStyle} text-slate-700`} />;
    case 'checkcircle': return <CheckCircle className={`${iconStyle} text-green-500`} />;

    default: return <Leaf className={`${iconStyle} text-slate-400`} />;
  }
};
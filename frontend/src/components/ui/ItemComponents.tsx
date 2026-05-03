import { Leaf, Lightbulb, Users, Target, Award, Shield, Zap } from 'lucide-react';

export const getIcon = (iconName?: string) => {
    const name = iconName?.toLowerCase();
    switch (name) {
      case 'leaf': return <Leaf className="w-12 h-12 text-green-500" />;
      case 'zap': return <Zap className="w-12 h-12 text-blue-500" />;
      case 'lightbulb': return <Lightbulb className="w-12 h-12 text-yellow-500" />;
      case 'award': return <Award className="w-12 h-12 text-yellow-500" />;
      case 'shield': return <Shield className="w-12 h-12 text-blue-500" />;
      case 'users': return <Users className="w-12 h-12 text-green-500" />;
      case 'target': return <Target className="w-12 h-12 text-blue-500" />;
      default: return <Leaf className="w-12 h-12 text-slate-400" />;
    }
  };

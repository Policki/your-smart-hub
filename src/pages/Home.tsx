import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { MessageCircle, Tv, TrendingUp, Gift, ChevronRight, Play, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickActions = [
  { icon: MessageCircle, label: 'AI Asistent', path: '/assistant', color: 'from-blue-500 to-cyan-400' },
  { icon: Tv, label: 'TV Daljinec', path: '/tv', color: 'from-purple-500 to-pink-400' },
  { icon: TrendingUp, label: 'Moja poraba', path: '/packages', color: 'from-green-500 to-emerald-400' },
  { icon: Gift, label: 'Nagrade', path: '/profile', color: 'from-orange-500 to-yellow-400' },
];

const recommendations = [
  { title: 'Premiera: Formula 1', subtitle: 'Danes ob 15:00', emoji: '🏎️', type: 'V živo' },
  { title: 'Stranger Things S5', subtitle: 'Nova sezona', emoji: '📺', type: 'Serija' },
  { title: 'Dokumentarec: Narava', subtitle: '4K HDR', emoji: '🌍', type: 'Film' },
];

const usageStats = [
  { label: 'Gledalnost', value: '23h', max: 50, color: 'bg-primary' },
  { label: 'Internet', value: '45 GB', max: 100, color: 'bg-accent' },
];

export default function Home() {
  const { preferences } = useUser();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dobro jutro';
    if (hour < 18) return 'Dober dan';
    return 'Dober večer';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-5 py-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{getGreeting()},</p>
          <h1 className="text-2xl font-display font-bold">
            {preferences.name || 'Uporabnik'} {preferences.avatar}
          </h1>
        </div>
        <Link to="/assistant" className="relative">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center glow"
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">2</span>
          </span>
        </Link>
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.path} to={action.path}>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{action.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>

      {/* AI suggestion card */}
      <motion.div variants={itemVariants}>
        <Link to="/assistant">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-3xl glass-card border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 gradient-bg opacity-10 rounded-full blur-2xl" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground">AI Priporočilo</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Glede na vašo uporabo bi lahko prihranili 8€/mesec s paketom Premium Light
                </p>
                <span className="text-primary text-sm font-medium mt-2 flex items-center gap-1">
                  Poglej več <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Usage stats */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Moja poraba</h2>
          <Link to="/packages" className="text-primary text-sm font-medium">Podrobnosti</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {usageStats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(parseInt(stat.value) / stat.max) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${stat.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* For you section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="font-display font-semibold text-lg">Za vas</h2>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border"
            >
              <span className="text-3xl">{rec.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">{rec.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                  {rec.type}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

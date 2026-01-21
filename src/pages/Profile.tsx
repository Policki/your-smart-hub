import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { 
  ArrowLeft, 
  ChevronRight, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Gift,
  Star,
  Trophy,
  Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: Bell, label: 'Obvestila', subtitle: 'Upravljaj opozorila', path: '/settings' },
  { icon: Shield, label: 'Zasebnost', subtitle: 'Podatki in varnost', path: '/settings' },
  { icon: HelpCircle, label: 'Pomoč', subtitle: 'Pogosta vprašanja', path: '/settings' },
  { icon: Settings, label: 'Nastavitve', subtitle: 'Jezik, zvok, gesla', path: '/settings' },
];

const achievements = [
  { icon: '🎬', label: '50 ur gledanja', unlocked: true },
  { icon: '⭐', label: 'Zvest uporabnik', unlocked: true },
  { icon: '🏆', label: 'Premium član', unlocked: false },
];

export default function Profile() {
  const { preferences, updatePreferences, resetPreferences } = useUser();
  const navigate = useNavigate();

  const toggleTheme = () => {
    updatePreferences({ theme: preferences.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleLogout = () => {
    resetPreferences();
    navigate('/');
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
      className="min-h-screen bg-background px-5 py-6 pb-24"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
        <Link to="/home">
          <motion.div whileTap={{ scale: 0.95 }} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.div>
        </Link>
        <h1 className="text-xl font-display font-bold">Moj profil</h1>
      </motion.div>

      {/* Profile card */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl glass-card mb-6 text-center"
      >
        <div className="w-20 h-20 rounded-full gradient-bg mx-auto flex items-center justify-center text-4xl mb-4">
          {preferences.avatar || '👤'}
        </div>
        <h2 className="text-xl font-display font-bold">{preferences.name || 'Uporabnik'}</h2>
        <p className="text-muted-foreground text-sm">Premium naročnik</p>
        
        {/* Interests */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {preferences.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Rewards section */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Nagrade & točke</h3>
          <Link to="/profile" className="text-primary text-sm font-medium">Vse</Link>
        </div>
        
        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Vaše točke</p>
              <p className="text-3xl font-display font-bold">2,450</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl gradient-bg text-white text-sm font-medium"
            >
              Unovči
            </motion.button>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl text-center transition-all ${
                achievement.unlocked
                  ? 'bg-card border border-border'
                  : 'bg-secondary/50 opacity-50'
              }`}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <p className="text-xs mt-2 text-muted-foreground">{achievement.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Theme toggle */}
      <motion.div variants={itemVariants} className="mb-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-full p-4 rounded-2xl bg-card border border-border flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            {preferences.theme === 'dark' ? (
              <Moon className="w-5 h-5 text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-warning" />
            )}
            <div className="text-left">
              <p className="font-medium">Tema</p>
              <p className="text-sm text-muted-foreground">
                {preferences.theme === 'dark' ? 'Temna' : 'Svetla'}
              </p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
            preferences.theme === 'dark' ? 'bg-primary' : 'bg-secondary'
          }`}>
            <motion.div
              animate={{ x: preferences.theme === 'dark' ? 20 : 0 }}
              className="w-5 h-5 rounded-full bg-white shadow-sm"
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Menu items */}
      <motion.div variants={itemVariants} className="space-y-2 mb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-2xl bg-card border border-border flex items-center gap-4"
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Logout */}
      <motion.div variants={itemVariants}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center gap-2 text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Odjava</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, MessageCircle, Tv, User, Sparkles } from 'lucide-react';

const navItems = [
  { path: '/home', icon: Home, label: 'Domov' },
  { path: '/assistant', icon: MessageCircle, label: 'AI' },
  { path: '/tv', icon: Tv, label: 'TV' },
  { path: '/packages', icon: Sparkles, label: 'Paketi' },
  { path: '/profile', icon: User, label: 'Profil' },
];

export default function BottomNavigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-colors"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`flex flex-col items-center ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-2 w-8 h-1 rounded-full gradient-bg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon 
                  className={`w-6 h-6 transition-all ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} 
                />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

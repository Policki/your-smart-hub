import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingDown, TrendingUp, Zap, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const packages = [
  {
    id: 1,
    name: 'Premium Light',
    price: '51,90€',
    savings: '8€/mesec',
    recommended: true,
    features: ['150+ TV kanalov', 'HBO Max', '300 Mbit/s', 'Neomejeni klici'],
  },
  {
    id: 2,
    name: 'Premium',
    price: '59,90€',
    current: true,
    features: ['200+ TV kanalov', 'HBO Max, Netflix, Disney+', '500 Mbit/s', 'Neomejeni klici'],
  },
  {
    id: 3,
    name: 'Premium Max',
    price: '79,90€',
    features: ['250+ TV kanalov', 'Vse streaming platforme', '1 Gbit/s', 'Neomejeni klici', '5G mobilni podatki'],
  },
];

const usageData = [
  { label: 'TV vsebine', used: 23, total: 'ur', trend: 'up', change: '+12%' },
  { label: 'Internet', used: 45, total: '100 GB', trend: 'down', change: '-5%' },
  { label: 'Streaming', used: 30, total: 'GB', trend: 'up', change: '+20%' },
];

export default function Packages() {
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
      className="min-h-screen bg-background px-5 py-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/home">
          <motion.div whileTap={{ scale: 0.95 }} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.div>
        </Link>
        <div>
          <h1 className="text-xl font-display font-bold">AI Predlogi paketov</h1>
          <p className="text-sm text-muted-foreground">Prilagojeno vaši porabi</p>
        </div>
      </div>

      {/* AI Analysis card */}
      <motion.div
        variants={itemVariants}
        className="p-5 rounded-3xl glass-card border border-primary/20 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold">AI Analiza</h3>
            <p className="text-xs text-muted-foreground">Posodobljeno danes</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Na podlagi vaše uporabe zadnjih 30 dni smo analizirali vaš vzorec gledanja in uporabe interneta.
          <span className="text-primary font-medium"> Lahko bi prihranili 8€ mesečno</span> z bolj prilagojenim paketom.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {usageData.map((data) => (
            <div key={data.label} className="text-center p-3 bg-secondary/50 rounded-xl">
              <p className="text-2xl font-display font-bold">{data.used}</p>
              <p className="text-xs text-muted-foreground">{data.total}</p>
              <div className={`flex items-center justify-center gap-1 mt-1 text-xs ${
                data.trend === 'up' ? 'text-success' : 'text-primary'
              }`}>
                {data.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {data.change}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Package recommendations */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="font-display font-semibold text-lg">Priporočeni paketi</h2>
        
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            whileTap={{ scale: 0.98 }}
            className={`p-5 rounded-2xl border-2 transition-all ${
              pkg.recommended
                ? 'border-primary bg-primary/5'
                : pkg.current
                ? 'border-border bg-card'
                : 'border-border bg-card'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg">{pkg.name}</h3>
                  {pkg.recommended && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                      Priporočeno
                    </span>
                  )}
                  {pkg.current && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                      Trenutni
                    </span>
                  )}
                </div>
                {pkg.savings && (
                  <p className="text-success text-sm font-medium mt-1">
                    Prihranek: {pkg.savings}
                  </p>
                )}
              </div>
              <p className="text-2xl font-display font-bold">{pkg.price}</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {pkg.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full rounded-xl ${
                pkg.recommended ? 'gradient-bg text-white' : ''
              }`}
              variant={pkg.recommended ? 'default' : 'outline'}
            >
              {pkg.current ? 'Trenutni paket' : pkg.recommended ? 'Zamenjaj paket' : 'Izberi'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Explanation */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-4 rounded-2xl bg-secondary/50"
      >
        <p className="text-sm text-muted-foreground">
          💡 <span className="font-medium">Zakaj Premium Light?</span><br />
          Vaša povprečna uporaba (23h TV, 45GB internet) ne izkorišča polnega paketa Premium. 
          S Premium Light dobite vse, kar potrebujete, in prihranite 96€ letno.
        </p>
      </motion.div>
    </motion.div>
  );
}

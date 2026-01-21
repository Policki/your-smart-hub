import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Zap, 
  Sparkles,
  Tv,
  Music,
  Gamepad2,
  Trophy,
  Bot,
  Check,
  RotateCcw
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { PackageCard } from '@/components/PackageCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  getData, 
  saveData, 
  calculatePackagePrice, 
  getAIPackageSuggestion,
  CustomPackage 
} from '@/lib/storage';

const standardPackages = [
  {
    name: 'ZConnect S',
    price: 14.99,
    data: 20,
    calls: '100',
    features: ['20 GB podatkov', '100 minut klicev', '100 SMS', 'Osnovna podpora'],
  },
  {
    name: 'ZConnect M',
    price: 24.99,
    data: 50,
    calls: '300',
    features: ['50 GB podatkov', '300 minut klicev', 'Neomejeni SMS', 'Prioritetna podpora'],
    isPopular: true,
  },
  {
    name: 'ZConnect L',
    price: 39.99,
    data: 100,
    calls: 'neomejeno',
    features: ['100 GB podatkov', 'Neomejeni klici', 'Neomejeni SMS', 'Premium podpora'],
  },
];

const dataOptions = [
  { value: 20, label: '20 GB' },
  { value: 50, label: '50 GB' },
  { value: 100, label: '100 GB' },
  { value: 200, label: '200 GB' },
];

const callsOptions = [
  { value: '100', label: '100 minut' },
  { value: '300', label: '300 minut' },
  { value: 'neomejeno', label: 'Neomejeno' },
];

export const Package = () => {
  const [view, setView] = useState<'packages' | 'custom'>('packages');
  const [data] = useState(getData());
  const [customPkg, setCustomPkg] = useState<CustomPackage>(data.package);
  const [aiDescription, setAiDescription] = useState('');
  const [showAiResult, setShowAiResult] = useState(false);

  const updateCustomPackage = (updates: Partial<CustomPackage>) => {
    const newPkg = { ...customPkg, ...updates };
    newPkg.price = calculatePackagePrice(newPkg);
    setCustomPkg(newPkg);
  };

  const saveCustomPackage = () => {
    const allData = getData();
    allData.package = customPkg;
    saveData(allData);
    toast.success('Paket shranjen!', {
      description: 'Vaš ZConnect Custom paket je posodobljen.',
    });
  };

  const resetPackage = () => {
    const defaultPkg: CustomPackage = {
      data: 50,
      calls: '300',
      tvPackage: false,
      musicPackage: false,
      aiPackage: false,
      gamingPackage: false,
      sportsPackage: false,
      price: 19.98,
    };
    setCustomPkg(defaultPkg);
    toast.info('Paket ponastavljen');
  };

  const generateAISuggestion = () => {
    const suggestion = getAIPackageSuggestion(aiDescription, data.profile.interests);
    const newPkg = { 
      ...customPkg, 
      ...suggestion,
      price: calculatePackagePrice({ ...customPkg, ...suggestion })
    };
    setCustomPkg(newPkg);
    setShowAiResult(true);
    toast.success('AI predlog pripravljen!', {
      description: 'Preverite prilagojene nastavitve.',
    });
  };

  const getPackageSummary = () => {
    const parts = [`${customPkg.data} GB podatkov`];
    if (customPkg.calls === 'neomejeno') {
      parts.push('neomejeni klici');
    } else {
      parts.push(`${customPkg.calls} minut klicev`);
    }
    if (customPkg.tvPackage) parts.push('TV paket');
    if (customPkg.musicPackage) parts.push('glasbeni paket');
    if (customPkg.aiPackage) parts.push('AI pomočnik');
    if (customPkg.gamingPackage) parts.push('gaming paket');
    if (customPkg.sportsPackage) parts.push('športni paket');
    
    return `Vaš paket vključuje ${parts.join(', ')}.`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold">Paketi</h1>
          <p className="text-muted-foreground">Izberite ali ustvarite svoj paket</p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex gap-2 mt-4">
          <Button
            variant={view === 'packages' ? 'default' : 'outline'}
            onClick={() => setView('packages')}
            className={view === 'packages' ? 'gradient-primary' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Paketi
          </Button>
          <Button
            variant={view === 'custom' ? 'default' : 'outline'}
            onClick={() => setView('custom')}
            className={view === 'custom' ? 'gradient-primary' : ''}
          >
            <Zap className="w-4 h-4 mr-2" />
            ZConnect Custom
          </Button>
        </div>
      </div>

      <div className="px-5">
        <AnimatePresence mode="wait">
          {view === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {standardPackages.map((pkg, index) => (
                <PackageCard
                  key={pkg.name}
                  {...pkg}
                  onSelect={() => {
                    toast.info(`Paket ${pkg.name} izbran`, {
                      description: 'V MVP to prikaže samo obvestilo.',
                    });
                  }}
                />
              ))}

              {/* Custom Package Card */}
              <PackageCard
                name="ZConnect Custom"
                price={customPkg.price}
                data={customPkg.data}
                calls={customPkg.calls === 'neomejeno' ? '∞' : customPkg.calls}
                features={[
                  'Prilagodljiv vmesnik',
                  'Ročni konfigurator',
                  'AI predlogi paketov',
                  'Vsi dodatki po izbiri',
                ]}
                isCustom
                onSelect={() => setView('custom')}
              />
            </motion.div>
          )}

          {view === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* AI Suggestion */}
              <div className="rounded-2xl p-5 gradient-card shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Predlog</h3>
                    <p className="text-sm text-muted-foreground">Opišite svoje navade</p>
                  </div>
                </div>

                <Textarea
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="npr. Veliko igram igre, ob koncih tedna gledam nogomet, vsak dan poslušam glasbo..."
                  className="bg-secondary border-border mb-3 min-h-[80px]"
                />

                <Button
                  onClick={generateAISuggestion}
                  disabled={!aiDescription.trim()}
                  className="w-full gradient-primary text-primary-foreground shadow-glow"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Predlagaj paket
                </Button>

                {showAiResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 rounded-xl bg-success/20 border border-success/30"
                  >
                    <div className="flex items-center gap-2 text-success mb-1">
                      <Check className="w-4 h-4" />
                      <span className="font-medium">AI predlog pripravljen!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Paket je bil prilagojen vašim potrebam. Preverite nastavitve spodaj.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Manual Configurator */}
              <div className="rounded-2xl p-5 gradient-card shadow-card">
                <h3 className="font-bold text-lg mb-4">Ustvari svoj paket</h3>

                {/* Data Selection */}
                <div className="mb-5">
                  <label className="text-sm font-medium mb-2 block">Podatki</label>
                  <div className="flex gap-2 flex-wrap">
                    {dataOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateCustomPackage({ data: option.value })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          customPkg.data === option.value
                            ? 'gradient-primary text-primary-foreground shadow-glow'
                            : 'bg-secondary text-secondary-foreground hover:bg-muted'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calls Selection */}
                <div className="mb-5">
                  <label className="text-sm font-medium mb-2 block">Klici</label>
                  <Select
                    value={customPkg.calls}
                    onValueChange={(value) => updateCustomPackage({ calls: value })}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {callsOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Add-ons */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Dodatne storitve</h4>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                    <div className="flex items-center gap-3">
                      <Tv className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">TV paket</p>
                        <p className="text-xs text-muted-foreground">+9,99 €/mesec</p>
                      </div>
                    </div>
                    <Switch
                      checked={customPkg.tvPackage}
                      onCheckedChange={(checked) => updateCustomPackage({ tvPackage: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                    <div className="flex items-center gap-3">
                      <Music className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium">Glasbeni paket</p>
                        <p className="text-xs text-muted-foreground">+4,99 €/mesec</p>
                      </div>
                    </div>
                    <Switch
                      checked={customPkg.musicPackage}
                      onCheckedChange={(checked) => updateCustomPackage({ musicPackage: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium">Premium AI paket</p>
                        <p className="text-xs text-muted-foreground">+2,99 €/mesec</p>
                      </div>
                    </div>
                    <Switch
                      checked={customPkg.aiPackage}
                      onCheckedChange={(checked) => updateCustomPackage({ aiPackage: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                    <div className="flex items-center gap-3">
                      <Gamepad2 className="w-5 h-5 text-warning" />
                      <div>
                        <p className="font-medium">Gaming paket</p>
                        <p className="text-xs text-muted-foreground">+5,99 €/mesec</p>
                      </div>
                    </div>
                    <Switch
                      checked={customPkg.gamingPackage}
                      onCheckedChange={(checked) => updateCustomPackage({ gamingPackage: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Športni paket</p>
                        <p className="text-xs text-muted-foreground">+7,99 €/mesec</p>
                      </div>
                    </div>
                    <Switch
                      checked={customPkg.sportsPackage}
                      onCheckedChange={(checked) => updateCustomPackage({ sportsPackage: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl p-5 gradient-primary shadow-glow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary-foreground/80">Okvirna cena</span>
                  <span className="text-3xl font-bold text-primary-foreground">
                    {customPkg.price.toFixed(2)} €
                  </span>
                </div>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  {getPackageSummary()}
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={resetPackage}
                    variant="outline"
                    className="flex-1 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Ponastavi
                  </Button>
                  <Button
                    onClick={saveCustomPackage}
                    className="flex-1 bg-background text-primary hover:bg-background/90"
                  >
                    Shrani paket
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

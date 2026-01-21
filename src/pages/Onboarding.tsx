import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const interests = [
  { id: 'sports', emoji: '⚽', label: 'Šport' },
  { id: 'movies', emoji: '🎬', label: 'Filmi' },
  { id: 'series', emoji: '📺', label: 'Serije' },
  { id: 'news', emoji: '📰', label: 'Novice' },
  { id: 'music', emoji: '🎵', label: 'Glasba' },
  { id: 'documentary', emoji: '🎥', label: 'Dokumentarci' },
  { id: 'kids', emoji: '🧸', label: 'Otroci' },
  { id: 'gaming', emoji: '🎮', label: 'Igre' },
];

const avatars = ['👤', '👨', '👩', '🧑', '👴', '👵', '🧔', '👱‍♀️', '🦸', '🦹', '🧙', '🎅'];

const themes = [
  { id: 'light', label: 'Svetla', preview: 'bg-white' },
  { id: 'dark', label: 'Temna', preview: 'bg-gray-900' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { updatePreferences } = useUser();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');

  const steps = [
    { title: 'Dobrodošli v Zconnect', subtitle: 'Ustvarimo vaš personaliziran profil' },
    { title: 'Kako vam je ime?', subtitle: 'Da vas bomo lahko pozdravili' },
    { title: 'Izberite avatar', subtitle: 'Vaš vizualni identifikator' },
    { title: 'Kaj vas zanima?', subtitle: 'Izberite vsaj 2 kategoriji' },
    { title: 'Izberite temo', subtitle: 'Prilagodite videz aplikacije' },
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return name.length >= 2;
      case 2: return true;
      case 3: return selectedInterests.length >= 2;
      case 4: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      updatePreferences({
        name,
        avatar: selectedAvatar,
        interests: selectedInterests,
        theme: selectedTheme,
        onboardingCompleted: true,
      });
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'gradient-bg' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Header */}
            <div className="py-8">
              <h1 className="text-3xl font-display font-bold text-foreground">
                {steps[step].title}
              </h1>
              <p className="text-muted-foreground mt-2">
                {steps[step].subtitle}
              </p>
            </div>

            {/* Step content */}
            <div className="flex-1">
              {step === 0 && (
                <div className="flex flex-col items-center justify-center h-full">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center mb-8"
                  >
                    <Sparkles className="w-16 h-16 text-white" />
                  </motion.div>
                  <p className="text-center text-muted-foreground max-w-xs">
                    Aplikacija, ki se prilagodi vašim potrebam in željam
                  </p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vnesite vaše ime..."
                    className="w-full px-6 py-4 text-xl bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    autoFocus
                  />
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-4 gap-4">
                  {avatars.map((avatar) => (
                    <motion.button
                      key={avatar}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-full aspect-square rounded-2xl text-4xl flex items-center justify-center border-2 transition-all ${
                        selectedAvatar === avatar
                          ? 'border-primary bg-primary/10 glow'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      {avatar}
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                        selectedInterests.includes(interest.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl">{interest.emoji}</span>
                      <span className="font-medium">{interest.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTheme(theme.id as 'light' | 'dark')}
                      className={`w-full p-6 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                        selectedTheme === theme.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${theme.preview} border border-border`} />
                      <span className="text-lg font-medium">{theme.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="px-6 pb-8 pt-4 flex gap-4">
        {step > 0 && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="rounded-2xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex-1 rounded-2xl gradient-bg text-white font-semibold h-14"
        >
          {step === steps.length - 1 ? 'Začnimo!' : 'Naprej'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

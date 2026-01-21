import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Power, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Home,
  RotateCcw,
  Menu,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Tv,
  Cast,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const channels = [
  { id: 1, name: 'SLO 1', number: 1 },
  { id: 2, name: 'SLO 2', number: 2 },
  { id: 3, name: 'POP TV', number: 3 },
  { id: 4, name: 'Planet TV', number: 4 },
  { id: 5, name: 'HBO', number: 10 },
  { id: 6, name: 'Sport TV', number: 20 },
];

const devices = [
  { id: 1, name: 'Dnevna soba', active: true },
  { id: 2, name: 'Spalnica', active: false },
  { id: 3, name: 'Otroška soba', active: false },
];

export default function TVRemote() {
  const [isPowered, setIsPowered] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(channels[0]);
  const [activeDevice, setActiveDevice] = useState(devices[0]);

  const RemoteButton = ({ 
    children, 
    onClick, 
    className = '',
    size = 'md'
  }: { 
    children: React.ReactNode; 
    onClick?: () => void; 
    className?: string;
    size?: 'sm' | 'md' | 'lg';
  }) => {
    const sizeClasses = {
      sm: 'w-12 h-12',
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    };

    return (
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`${sizeClasses[size]} rounded-2xl bg-card border border-border flex items-center justify-center active:bg-secondary transition-colors ${className}`}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-background px-5 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/home">
          <motion.div whileTap={{ scale: 0.95 }} className="p-2 -ml-2 rounded-xl hover:bg-secondary">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.div>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-display font-bold">TV Daljinec</h1>
          <p className="text-sm text-muted-foreground">{activeDevice.name}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl bg-card border border-border"
        >
          <Cast className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>

      {/* Device selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {devices.map((device) => (
          <motion.button
            key={device.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveDevice(device)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeDevice.id === device.id
                ? 'gradient-bg text-white'
                : 'bg-card border border-border text-foreground'
            }`}
          >
            {device.name}
          </motion.button>
        ))}
      </div>

      {/* Current channel display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-3xl glass-card text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Tv className="w-5 h-5 text-primary" />
          <span className={`text-sm font-medium ${isPowered ? 'text-success' : 'text-muted-foreground'}`}>
            {isPowered ? 'Vklopljeno' : 'Izklopljeno'}
          </span>
        </div>
        <h2 className="text-3xl font-display font-bold gradient-text">
          {currentChannel.number}
        </h2>
        <p className="text-muted-foreground">{currentChannel.name}</p>
      </motion.div>

      {/* Remote control */}
      <div className="bg-card rounded-3xl border border-border p-6 space-y-6">
        {/* Top row - Power & Volume */}
        <div className="flex justify-between items-center">
          <RemoteButton
            onClick={() => setIsPowered(!isPowered)}
            className={isPowered ? 'bg-destructive/10 border-destructive/30' : ''}
          >
            <Power className={`w-6 h-6 ${isPowered ? 'text-destructive' : 'text-muted-foreground'}`} />
          </RemoteButton>

          <div className="flex items-center gap-2">
            <RemoteButton onClick={() => setIsMuted(!isMuted)} size="sm">
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-destructive" />
              ) : (
                <Volume2 className="w-5 h-5 text-foreground" />
              )}
            </RemoteButton>
            <div className="flex flex-col gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-8 rounded-lg bg-secondary flex items-center justify-center"
              >
                <ChevronUp className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-8 rounded-lg bg-secondary flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* D-pad */}
        <div className="flex justify-center">
          <div className="relative w-44 h-44">
            {/* Up */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
            {/* Down */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
            {/* Left */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            {/* Right */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
            {/* Center OK */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold glow"
            >
              OK
            </motion.button>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4">
          <RemoteButton size="sm">
            <Home className="w-5 h-5 text-foreground" />
          </RemoteButton>
          <RemoteButton size="sm">
            <RotateCcw className="w-5 h-5 text-foreground" />
          </RemoteButton>
          <RemoteButton size="sm">
            <Menu className="w-5 h-5 text-foreground" />
          </RemoteButton>
          <RemoteButton size="sm">
            <Settings className="w-5 h-5 text-foreground" />
          </RemoteButton>
        </div>

        {/* Playback controls */}
        <div className="flex justify-center gap-3">
          <RemoteButton size="sm">
            <SkipBack className="w-5 h-5 text-foreground" />
          </RemoteButton>
          <RemoteButton size="md" className="gradient-bg border-0">
            <Play className="w-6 h-6 text-white fill-white" />
          </RemoteButton>
          <RemoteButton size="sm">
            <SkipForward className="w-5 h-5 text-foreground" />
          </RemoteButton>
        </div>
      </div>

      {/* Quick channel selection */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Hitri dostop</h3>
        <div className="grid grid-cols-3 gap-3">
          {channels.map((channel) => (
            <motion.button
              key={channel.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentChannel(channel)}
              className={`p-4 rounded-2xl text-center transition-all ${
                currentChannel.id === channel.id
                  ? 'gradient-bg text-white'
                  : 'bg-card border border-border'
              }`}
            >
              <p className="text-xl font-bold">{channel.number}</p>
              <p className="text-xs mt-1 opacity-80">{channel.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

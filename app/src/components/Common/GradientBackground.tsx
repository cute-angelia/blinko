import { ReactNode, Component, ErrorInfo } from 'react';
import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import * as reactSpring from '@react-spring/three'
import { RootStore } from '@/store/root';
import { BlinkoStore } from '@/store/blinkoStore';
import { cn } from '@heroui/react';

class GradientErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ShaderGradient error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-purple-600" />;
    }

    return this.props.children;
  }
}

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const GradientBackground = ({ children, className }: GradientBackgroundProps) => {
  const blinko = RootStore.Get(BlinkoStore)

  return (
    <div className={cn("relative w-full h-[100vh]", className)}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}; 
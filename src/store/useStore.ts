import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  functionInput: string;
  setFunctionInput: (input: string) => void;
  xRange: [number, number];
  setXRange: (range: [number, number]) => void;
  yRange: [number, number];
  setYRange: (range: [number, number]) => void;
  showGrid: boolean;
  toggleGrid: () => void;
  showAxes: boolean;
  toggleAxes: () => void;
  showPoints: boolean;
  togglePoints: () => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  pointSize: number;
  setPointSize: (size: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  recentFunctions: string[];
  addRecentFunction: (func: string) => void;
  clearRecentFunctions: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      functionInput: 'x^2',
      setFunctionInput: (input) => set({ functionInput: input }),
      xRange: [-5, 5],
      setXRange: (range) => set({ xRange: range }),
      yRange: [-5, 5],
      setYRange: (range) => set({ yRange: range }),
      showGrid: true,
      toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
      showAxes: true,
      toggleAxes: () => set((state) => ({ showAxes: !state.showAxes })),
      showPoints: false,
      togglePoints: () => set((state) => ({ showPoints: !state.showPoints })),
      lineWidth: 2,
      setLineWidth: (width) => set({ lineWidth: width }),
      pointSize: 6,
      setPointSize: (size) => set({ pointSize: size }),
      animationSpeed: 1,
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      recentFunctions: [],
      addRecentFunction: (func) =>
        set((state) => ({
          recentFunctions: [
            func,
            ...state.recentFunctions.filter((f) => f !== func),
          ].slice(0, 5),
        })),
      clearRecentFunctions: () => set({ recentFunctions: [] }),
    }),
    {
      name: 'calculus-visualizer-storage',
    }
  )
); 
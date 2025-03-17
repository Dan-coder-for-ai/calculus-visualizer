declare module 'plotly.js-dist' {
  export interface Data {
    x?: number[];
    y?: number[];
    name?: string;
    type?: string;
    mode?: string;
    line?: {
      color?: string;
      width?: number;
      dash?: string;
    };
    marker?: {
      size?: number;
      color?: string;
    };
    fill?: string;
  }

  export interface Layout {
    title?: string;
    xaxis?: {
      title?: string;
      showgrid?: boolean;
      showline?: boolean;
      zeroline?: boolean;
      range?: [number, number];
    };
    yaxis?: {
      title?: string;
      showgrid?: boolean;
      showline?: boolean;
      zeroline?: boolean;
      range?: [number, number];
    };
    showlegend?: boolean;
    margin?: {
      t?: number;
      r?: number;
      b?: number;
      l?: number;
    };
  }

  export interface Config {
    responsive?: boolean;
    displayModeBar?: boolean;
  }

  export interface PlotParams {
    data: Data[];
    layout?: Partial<Layout>;
    config?: Partial<Config>;
  }

  export function newPlot(
    root: HTMLElement,
    data: Data[],
    layout?: Partial<Layout>,
    config?: Partial<Config>
  ): Promise<void>;

  export function react(
    root: HTMLElement,
    data: Data[],
    layout?: Partial<Layout>,
    config?: Partial<Config>
  ): Promise<void>;

  export function relayout(
    root: HTMLElement,
    layout: Partial<Layout>
  ): Promise<void>;
} 
declare class Panel {}

declare class Stats {
  public REVISION: number;
  public dom: HTMLDivElement;
  public domElement: HTMLDivElement;
  public Panel: Panel;

  public addPanel(panel: Panel): Panel;

  public showPanel(id: string): void;

  public begin(): void;

  public end(): void;

  public update(): void;

  public setMode(id: string): void;
}

declare function initStats(type?: string | number): Stats;

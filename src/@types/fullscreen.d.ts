interface Element {
  /** Safari */
  webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
  /** Safari(iPhone) */
  webkitEnterFullscreen?: () => void;
}

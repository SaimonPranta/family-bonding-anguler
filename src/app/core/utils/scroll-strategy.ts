import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';

export function menuScrollStrategy(overlay: Overlay): () => BlockScrollStrategy {
  return () => overlay.scrollStrategies.block();
}
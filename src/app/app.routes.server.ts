import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'reset-password/:token',
    renderMode: RenderMode.Server  // ⬅️ penting!
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

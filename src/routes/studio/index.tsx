import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense, useState, useEffect } from 'react';

const Studio = lazy(() => import('sanity').then(m => ({ default: m.Studio })));

export const Route = createFileRoute('/studio/')({
  component: StudioPage,
});

function StudioPage() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background">Загрузка редактора...</div>}>
        <LazyStudio />
      </Suspense>
    </div>
  );
}

function LazyStudio() {
  const [cfg, setCfg] = useState<any>(null);
  useEffect(() => {
    import('../../../sanity.config').then(m => setCfg(m.default));
  }, []);

  if (!cfg) return null;
  
  return <Studio config={cfg} />;
}

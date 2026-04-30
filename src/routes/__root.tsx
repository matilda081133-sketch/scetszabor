import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "СПЕЦЗАБОР — установка заборов в СПб и ЛО" },
      {
        name: "description",
        content:
          "Изготовление и монтаж заборов под ключ в Санкт-Петербурге и Ленинградской области. Профлист, евроштакетник, 3D-сетка, жалюзи, ворота. Реальная гарантия по договору.",
      },
      { property: "og:title", content: "СПЕЦЗАБОР — установка заборов в СПб и ЛО" },
      {
        property: "og:description",
        content:
          "Инженерный замер, монтаж по ГОСТ, фотофиксация скрытых работ. Реальная гарантия.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "СПЕЦЗАБОР — установка заборов в СПб и ЛО" },
      { name: "description", content: "Solid Spb Fences is a website for a fence installation company serving St. Petersburg and Leningrad Oblast." },
      { property: "og:description", content: "Solid Spb Fences is a website for a fence installation company serving St. Petersburg and Leningrad Oblast." },
      { name: "twitter:description", content: "Solid Spb Fences is a website for a fence installation company serving St. Petersburg and Leningrad Oblast." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f1287189-7998-4055-9e4e-73e0835c7201/id-preview-c5abdbe7--9138e12c-c3e0-4bb8-a790-4add5967a43e.lovable.app-1777564523620.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f1287189-7998-4055-9e4e-73e0835c7201/id-preview-c5abdbe7--9138e12c-c3e0-4bb8-a790-4add5967a43e.lovable.app-1777564523620.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

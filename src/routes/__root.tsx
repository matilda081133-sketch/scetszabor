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
      { name: "yandex-verification", content: "f84650af349ca373" },
      { title: "СПЕЦЗАБОР | Заборы под ключ в СПб и ЛО" },
      {
        name: "description",
        content:
          "Профессиональное строительство и установка заборов СПЕЦЗАБОР в Санкт-Петербурге и Ленинградской области. Профлист, евроштакетник, 3D-сетка, жалюзи, ворота. Гарантия 10 лет.",
      },
      { property: "og:title", content: "СПЕЦЗАБОР | Заборы под ключ в СПб и ЛО" },
      {
        property: "og:description",
        content:
          "Инженерный замер, монтаж по ГОСТ, фотофиксация скрытых работ. Реальная гарантия 10 лет на все работы.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "СПЕЦЗАБОР | Заборы под ключ в СПб и ЛО" },
      { property: "og:image", content: "/favicon.png" },
      { name: "twitter:image", content: "/favicon.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
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

import { CookieConsent } from "../components/site/CookieConsent";

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <CookieConsent />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

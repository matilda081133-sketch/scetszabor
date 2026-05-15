import { j as jsxRuntimeExports } from "./sanity-core-D7KvhOfd.js";
import { a as reactExports } from "./lucide-02V0d3fb.js";
import "util";
import "os";
const Studio = reactExports.lazy(() => import("./sanity-core-D7KvhOfd.js").then((n) => n.fO).then((m) => ({
  default: m.Studio
})));
function StudioPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen w-screen flex items-center justify-center bg-background", children: "Загрузка редактора..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyStudio, {}) }) });
}
function LazyStudio() {
  const [cfg, setCfg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    import("./pane2-Dv27bPk-.js").then((n) => n.n).then((m) => setCfg(m.default));
  }, []);
  if (!cfg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Studio, { config: cfg });
}
export {
  StudioPage as component
};

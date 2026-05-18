import { j as jsxRuntimeExports } from "./sanity-core-3hUdnev6.js";
import { a as reactExports, L as LayoutDashboard, j as Settings, k as LogOut, l as Save, P as Phone, n as RussianRuble, o as Type } from "./lucide-DH97pPXW.js";
import { u as useCMS } from "./cms-DQSl0w_-.js";
import "util";
import "os";
import "./router-6tRNnX8B.js";
import "./worker-entry-BdWGRx4M.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = reactExports.useState(false);
  const [password, setPassword] = reactExports.useState("");
  const {
    content,
    updateContent
  } = useCMS();
  const [form, setForm] = reactExports.useState(content);
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "fence2024") {
      setIsLoggedIn(true);
    } else {
      alert("Неверный пароль");
    }
  };
  const handleSave = () => {
    updateContent(form);
    alert("Изменения успешно сохранены!");
  };
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-black flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#111] p-8 rounded-2xl border border-white/10 w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-12 h-12 text-[#FFD700] mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Вход в панель управления" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-2", children: "СпецЗабор CMS v1.0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-gray-400 uppercase mb-2", children: "Пароль" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FFD700] transition-colors", placeholder: "••••••••" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-[#FFD700] text-black font-bold py-3 rounded-xl hover:bg-[#FFC000] transition-colors", children: "Войти" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 bg-[#111] border-r border-white/5 p-6 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-[#FFD700] rounded flex items-center justify-center text-black font-bold", children: "С" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tracking-tight", children: "СПЕЦЗАБОР" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-2 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 bg-[#FFD700]/10 text-[#FFD700] rounded-xl font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" }),
        " Контент"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsLoggedIn(false), className: "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors mt-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" }),
        " Выйти"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-10 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Настройки сайта" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mt-1", children: "Редактирование основных данных и цен" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, className: "flex items-center gap-2 bg-[#FFD700] text-black px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-5 h-5" }),
          " Сохранить всё"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#111] p-6 rounded-2xl border border-white/5 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/5 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-[#FFD700]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Контакты" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 mb-2", children: "Телефон компании" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.phone, onChange: (e) => setForm({
                ...form,
                phone: e.target.value
              }), className: "w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 mb-2", children: "Email для заявок" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.email, onChange: (e) => setForm({
                ...form,
                email: e.target.value
              }), className: "w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#111] p-6 rounded-2xl border border-white/5 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/5 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RussianRuble, { className: "w-5 h-5 text-[#FFD700]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Калькулятор и цены" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 mb-2", children: "Базовая цена за п.м. (руб)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: form.basePrice, onChange: (e) => setForm({
              ...form,
              basePrice: Number(e.target.value)
            }), className: "w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-[#111] p-6 rounded-2xl border border-white/5 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/5 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "w-5 h-5 text-[#FFD700]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Главный экран (Hero)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 mb-2", children: "Главный заголовок" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: form.heroTitle, onChange: (e) => setForm({
                ...form,
                heroTitle: e.target.value
              }), className: "w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-gray-500 mb-2", children: "Подзаголовок" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.heroSubtitle, onChange: (e) => setForm({
                ...form,
                heroSubtitle: e.target.value
              }), rows: 3, className: "w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminPage as component
};

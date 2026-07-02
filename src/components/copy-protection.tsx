import { useEffect } from "react";

/**
 * Client-side deterrents against casual copying: disables right-click, drag,
 * text selection, and common devtools/view-source shortcuts. Determined users
 * can still bypass this — real IP protection requires legal notices, not JS.
 */
export function CopyProtection() {
  useEffect(() => {
    const prevent = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      // F12
      if (e.key === "F12") return prevent(e);
      // Ctrl/Cmd + U (view source), S (save), P (print)
      if ((e.ctrlKey || e.metaKey) && ["u", "s", "p"].includes(k)) return prevent(e);
      // Ctrl/Cmd + Shift + I / J / C (devtools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(k))
        return prevent(e);
      // Ctrl/Cmd + A (select all) & C (copy) — allow copy in inputs/textareas
      const target = e.target as HTMLElement | null;
      const isField =
        !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (!isField && (e.ctrlKey || e.metaKey) && ["a", "c", "x"].includes(k)) return prevent(e);
    };

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("selectstart", (e) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      prevent(e);
    });
    document.addEventListener("copy", (e) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      prevent(e);
    });
    window.addEventListener("keydown", onKey);

    // Global CSS: disable user-select & image drag on non-form elements
    const style = document.createElement("style");
    style.setAttribute("data-copy-protect", "true");
    style.textContent = `
      html, body { -webkit-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
      input, textarea, [contenteditable="true"] { -webkit-user-select: text; user-select: text; }
      img { -webkit-user-drag: none; user-drag: none; pointer-events: auto; }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      window.removeEventListener("keydown", onKey);
      style.remove();
    };
  }, []);

  return null;
}

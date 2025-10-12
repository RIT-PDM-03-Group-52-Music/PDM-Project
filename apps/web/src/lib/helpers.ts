export const uid = (prefix = "id") =>
    `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;

export const nowIso = () => new Date().toISOString();

export const normalizeApiPath = (path: string, query?: string) => {
    let p = path.startsWith("/") ? path : `/${path}`;
    if (p.startsWith("/api/")) p = p.slice(4);
    if (!query) return p;

    const parts = query.split("&");
    const encoded = parts
        .map((kv) => {
            const [rawK, rawV] = kv.split("=");
            const k = rawK ?? "";
            const v = rawV ?? "";
            const safeV = /%[0-9A-Fa-f]{2}/.test(v) ? v : encodeURIComponent(v);
            return `${encodeURIComponent(k)}=${safeV}`;
        })
        .join("&");

    return `${p}?${encoded}`;
};

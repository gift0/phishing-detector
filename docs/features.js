// docs/features.js

function extractFeatures(url) {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname || "";
        const path = parsed.pathname || "";
        const query = parsed.search || "";

        const feats = {};

        // ============================
        // Lexical / structure
        // ============================
        feats.url_length = url.length > 75 ? 1 : 0;
        feats.hostname_length = host.length > 30 ? 1 : 0;
        feats.path_length = path.length > 15 ? 1 : 0;
        feats.num_subdirs = (path.match(/\//g) || []).length > 3 ? 1 : 0;
        feats.num_dots = (url.match(/\./g) || []).length > 3 ? 1 : 0;
        feats.num_hyphens = (url.match(/-/g) || []).length > 3 ? 1 : 0;
        feats.num_digits = (url.match(/[0-9]/g) || []).length > 5 ? 1 : 0;
        feats.num_special_chars = (url.match(/[@_!$%^&*(){}\[\]|\\:;"'<>,?~`+=]/g) || []).length > 2 ? 1 : 0;

        feats.at_symbol = url.includes("@") ? 1 : 0;
        feats.double_slash_in_path = path.includes("//") ? 1 : 0;
        feats.contains_ip = /^[0-9.]+$/.test(host) ? 1 : 0;

        // ============================
        // Protocol / keywords
        // ============================
        // NOTE: HTTPS alone is not safe. Only penalize if it's plain HTTP.
        feats.no_https = url.toLowerCase().startsWith("http://") ? 1 : 0;

        feats.https_in_domain = host.toLowerCase().includes("https") ? 1 : 0;
        feats.domain_tokens = host.split(".").filter(Boolean).length > 4 ? 1 : 0;
        feats.long_domain = host.length > 50 ? 1 : 0;

        feats.suspicious_tld = [".zip", ".tk", ".xyz", ".top", ".club"].some(tld =>
            host.toLowerCase().endsWith(tld)
        ) ? 1 : 0;

        feats.phish_keywords = ["login", "verify", "update", "bank", "secure", "account"].some(kw =>
            url.toLowerCase().includes(kw)
        ) ? 1 : 0;

        // ============================
        // File extensions
        // ============================
        const lurl = url.toLowerCase();
        feats.has_exe = lurl.endsWith(".exe") ? 1 : 0;
        feats.has_php = lurl.includes(".php") ? 1 : 0;
        feats.has_html = (lurl.includes(".html") || lurl.includes(".htm")) ? 1 : 0;

        // ============================
        // Ratios & query
        // ============================
        feats.path_to_host_ratio = host.length > 0 && path.length / host.length > 1.5 ? 1 : 0;
        feats.num_query_params = (query.match(/=/g) || []).length > 3 ? 1 : 0;
        feats.num_fragments = (url.match(/#/g) || []).length > 0 ? 1 : 0;

        console.log("🔎 Extracted features (binarized):", feats);

        return feats;
    } catch (e) {
        console.error("Invalid URL:", url);
        return null;
    }
}

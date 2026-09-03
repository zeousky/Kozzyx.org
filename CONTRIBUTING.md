# Contributing to kozzyx.org

Hey — thanks for wanting to help out! Whether it's a typo, a bug, or something new, it's genuinely appreciated. Here's the quick version.

## Getting set up

```bash
git clone https://github.com/Officialckazros/Kozzyx.org.git
cd Kozzyx.org
python3 -m http.server 8080
# open http://localhost:8080/pages/
```

> **Heads up:** you can't open the `.html` files directly from your file manager. The strict Content Security Policy (`strict-dynamic` + SHA-256 hashes on every inline script) is blocked on `file://` URLs, so pages come up blank. Always go through a local server.

## The CSP hash workflow

Every inline `<script>` has a matching SHA-256 hash in the page's CSP `<meta>` tag. If you touch an inline script — even one character — the browser will refuse to run it until the hash is updated.

So, after editing any inline script:

1. Regenerate the hashes.
2. Reload the page on your local server and confirm there are **no CSP errors** in the console.
3. Only then commit.

## Pull requests

- Keep changes focused — one topic per PR.
- Match the existing style; no new frameworks or build steps for the markup.
- If you changed a desktop page, check whether its `_mobile` variant needs the same fix.
- Test on a local server before pushing.

That's it. Thanks again! 💜

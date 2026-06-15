# kozzyx.org

[![License](https://img.shields.io/github/license/Officialckazros/Kozzyx.org?style=flat-square&color=blue)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSP](https://img.shields.io/badge/CSP-strict-success?style=flat-square)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkozzyx.org&style=flat-square&up_message=online&down_message=offline)](https://kozzyx.org)

The website for **KozzyX** — an all-in-one Discord bot: moderation, AI, tickets, polls, giveaways, and one-command server setup. Free.

🔗 Live at **[kozzyx.org](https://kozzyx.org)**

## What's here

Plain HTML, CSS, and JavaScript — no framework, no build step for the markup. Every page runs behind a strict Content Security Policy with a SHA-256 hash on each inline script, so the site stays fast and locks down hard in the browser.

| Page | What it is |
|---|---|
| `index` | Landing page |
| `dashboard` | Live bot dashboard |
| `commands` | Full command reference |
| `features` | Feature tour |
| `faq` | Common questions |
| `team` | Who's behind it |
| `contact` / `report` | Get in touch / report abuse |
| `privacy` / `terms` | The legal bits |

Most pages ship a desktop and a `_mobile` variant.

## Running it locally

> **Heads up:** you can't just double-click the HTML files. The strict CSP (`strict-dynamic` + per-script SHA-256 hashes) is blocked by browsers on `file://` URLs, so you'll just get a blank page.

Serve it over HTTP instead:

```bash
git clone https://github.com/Officialckazros/Kozzyx.org.git
cd Kozzyx.org
python3 -m http.server 8080
# open http://localhost:8080/pages/
```

## Layout

```
pages/                HTML pages (flattened to the web root on deploy)
css/                  Stylesheets
js/                   Page logic, shared helpers, the CSP shield
assets/               Vendored libs (React, GSAP) + bundled inline scripts
robots.txt
.well-known/security.txt
```

## The CSP hash thing

Every inline `<script>` block has a matching SHA-256 hash in the page's CSP `<meta>` tag. Change a single character in an inline script and the browser will refuse to run it — that's intentional, not a bug. Regenerate the hashes after editing inline scripts, then check the page loads on your local server before committing.

## Contributing

PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[GPL-3.0](LICENSE).

---

Built and paid for by me. If it's useful to you, a kind word goes a long way. 💜

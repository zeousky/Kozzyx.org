# kozzyx.org

[![License](https://img.shields.io/github/license/Officialckazros/Kozzyx.org?style=flat-square&color=blue)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSP](https://img.shields.io/badge/CSP-strict-success?style=flat-square)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkozzyx.org&style=flat-square&up_message=online&down_message=offline)](https://kozzyx.org)

The official website for **KozzyX**, an all-in-one Discord bot providing moderation, AI features, ticketing, polls, giveaways, and one-command server setup.

Live at **[kozzyx.org](https://kozzyx.org)**.

## Overview

The site is built with plain HTML, CSS, and JavaScript, with no framework and no build step for the markup. Every page is served behind a strict Content Security Policy that applies a SHA-256 hash to each inline script, keeping the site fast while enforcing strong in-browser restrictions.

## Pages

| Page | Description |
| --- | --- |
| `index` | Landing page |
| `dashboard` | Live bot dashboard |
| `commands` | Full command reference |
| `features` | Feature overview |
| `faq` | Frequently asked questions |
| `team` | Project contributors |
| `contact` / `report` | Contact and abuse-reporting forms |
| `privacy` / `terms` | Legal documentation |

Most pages provide both a desktop and a `_mobile` variant.

## Running Locally

The strict Content Security Policy (`strict-dynamic` with per-script SHA-256 hashes) is not enforced by browsers on `file://` URLs, so opening the HTML files directly results in a blank page. Serve the site over HTTP instead:

```bash
git clone https://github.com/Officialckazros/Kozzyx.org.git
cd Kozzyx.org
python3 -m http.server 8080
# open http://localhost:8080/pages/
```

## Repository Structure

```
pages/                HTML pages (flattened to the web root on deploy)
css/                  Stylesheets
js/                   Page logic, shared helpers, and the CSP shield
assets/               Vendored libraries (React, GSAP) and bundled inline scripts
robots.txt
.well-known/security.txt
```

## Content Security Policy

Every inline `<script>` block has a corresponding SHA-256 hash in the page's CSP `<meta>` tag. Modifying a single character of an inline script causes the browser to refuse to execute it; this is intentional. After editing any inline script, regenerate the hashes and verify that the page loads on a local server before committing.

## Contributing

Contributions are welcome. Please review [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

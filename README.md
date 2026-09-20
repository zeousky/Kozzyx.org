# kozzyx.org

Static website for **KozzyX**, an archived Discord server-management bot.

Live at **[kozzyx.org](https://kozzyx.org)**.

## What's here

Plain HTML, CSS, and a little JavaScript. No framework, no build step.

| Path | What it is |
|---|---|
| `/` | Landing page |
| `/privacy` | Privacy policy |
| `/terms` | Terms |
| `/404.html` | Missing page |

## Running it locally

```bash
git clone https://github.com/zeousky/Kozzyx.org.git
cd Kozzyx.org
python3 -m http.server 8080
# open http://localhost:8080/
```

## Deploy

Push `main`. GitHub Actions publishes the repo root to GitHub Pages. Details are in [`AGENTS.md`](AGENTS.md).

## License

[MIT](LICENSE).

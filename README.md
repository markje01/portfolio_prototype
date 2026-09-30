# Marcus Kje: portfolio (prototype)

Personal portfolio website. Multimedia Design, 3rd semester, Content Creation, IBA Erhvervsakademi Kolding, 2026.

Plain HTML, CSS and JavaScript: no frameworks, no build step, no database.

## Run it locally

**Option 1 (quickest):** download the repository (green "Code" button, then "Download ZIP"), unzip it and double-click `index.html`.

**Option 2 (recommended, everything works):** some browsers block the Phil the Phish game and the PDF viewer when a page is opened straight from the disk. Start a small local web server in the unzipped folder instead, for example:

- with Python: `python -m http.server 8000`, then open http://localhost:8000
- or with the VS Code extension "Live Server": right-click `index.html`, then "Open with Live Server"

## Structure

| Path | Contents |
|---|---|
| `index.html` | Home |
| `artworks.html` | Artworks (filters, popup gallery) |
| `media-design.html` | Media design projects |
| `info.html` | Info and contact form |
| `erosion.html` | Erosion.exe, the experimental sub-site |
| `404.html` | Page not found |
| `css/` | `style.css` (whole site), `erosion.css` (Erosion.exe) |
| `js/data.js` | All texts for the works: titles, years, materials, descriptions |
| `js/main.js` | Menus, filters, popup, carousel, events, contact form |
| `js/erosion.js` | Erosion.exe effects |
| `img/`, `fonts/`, `files/` | Images, the self-hosted Inter font, the GLS playbook PDF |
| `projects/phil-the-phish/` | The Phil the Phish web game |

The contact form is a demo: it checks the fields but does not send messages yet.

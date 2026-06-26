# young-and-free
A fast way to find free or cheap activities for kids near me.

## Local website
The app must be served over HTTP/HTTPS to load the event CSV files and the map tiles.

Run a local server from the project folder, for example:

```bash
cd /workspaces/young-and-free
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Features
- Filter activities by age range
- Search by activity, location, or tag
- Easy static site with sample listings

## Files
- `index.html` — page layout and content
- `styles.css` — presentation and responsive styling
- `app.js` — interactive filtering logic

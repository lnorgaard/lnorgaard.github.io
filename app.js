const csvPaths = [
  "event-csvs/EventBrochure-20260625-1923.csv",
  "event-csvs/EventBrochure-20260625-2018.csv"
];
let activities = [];

const ageFilter = document.getElementById("ageFilter");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const searchInput = document.getElementById("searchInput");
const activityList = document.getElementById("activityList");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const locationCoordinates = {
  "BLUE DIAMOND LIBRARY": { lat: 36.0677, lng: -115.4553 },
  "BUNKERVILLE LIBRARY": { lat: 36.4910, lng: -114.0255 },
  "CENTENNIAL HILLS LIBRARY": { lat: 36.2533, lng: -115.2610 },
  "EAST LAS VEGAS LIBRARY": { lat: 36.1634, lng: -115.0688 },
  "ENTERPRISE LIBRARY": { lat: 36.0417, lng: -115.1620 },
  "GOODSPRINGS LIBRARY": { lat: 36.0110, lng: -115.3990 },
  "GREEN VALLEY LIBRARY": { lat: 36.0391, lng: -114.9859 },
  "HERITAGE PARK SENIOR FACILITY": { lat: 36.0398, lng: -114.9790 },
  "INDIAN SPRINGS LIBRARY": { lat: 36.6240, lng: -115.5940 },
  "JAMES I. GIBSON LIBRARY": { lat: 36.0108, lng: -114.9810 },
  "LAUGHLIN LIBRARY": { lat: 35.1523, lng: -114.5759 },
  "MEADOWS LIBRARY": { lat: 36.2099, lng: -115.2249 },
  "MESQUITE LIBRARY": { lat: 36.8044, lng: -114.0672 },
  "MOAPA TOWN LIBRARY": { lat: 36.5873, lng: -114.5464 },
  "MOAPA VALLEY LIBRARY": { lat: 36.5930, lng: -114.5530 },
  "MT. CHARLESTON LIBRARY": { lat: 36.3319, lng: -115.6425 },
  "PASEO VERDE LIBRARY": { lat: 36.0112, lng: -115.0516 },
  "RAINBOW LIBRARY": { lat: 36.2171, lng: -115.2284 },
  "SAHARA WEST LIBRARY": { lat: 36.1563, lng: -115.2945 },
  "SANDY VALLEY LIBRARY": { lat: 35.9124, lng: -115.5114 },
  "SEARCHLIGHT LIBRARY": { lat: 35.1895, lng: -114.9506 },
  "SIEGFRIED & ROY PARK": { lat: 36.1010, lng: -115.1510 },
  "SPRING VALLEY LIBRARY": { lat: 36.0955, lng: -115.2126 },
  "SUMMERLIN LIBRARY": { lat: 36.1367, lng: -115.2807 },
  "SUNRISE LIBRARY": { lat: 36.1063, lng: -114.9678 },
  "WEST CHARLESTON LIBRARY": { lat: 36.1525, lng: -115.2603 },
  "WEST HENDERSON LIBRARY": { lat: 35.9987, lng: -115.3075 },
  "WEST LAS VEGAS LIBRARY": { lat: 36.1719, lng: -115.1417 },
  "WHITNEY LIBRARY": { lat: 36.0908, lng: -115.0448 },
  "WINDMILL LIBRARY": { lat: 35.9987, lng: -115.3075 },
  "PARKING LOT - JAMES I. GIBSON": { lat: 36.0108, lng: -114.9810 },
  "JAMES I. GIBSON PARKING LOT": { lat: 36.0108, lng: -114.9810 }
};

let map = null;
let markersLayer = null;

function getLocationCoordinates(location) {
  const normalized = location.trim().toUpperCase();
  if (locationCoordinates[normalized]) return { key: normalized, coords: locationCoordinates[normalized], displayName: location.trim() };

  for (const key of Object.keys(locationCoordinates)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return { key, coords: locationCoordinates[key], displayName: location.trim() };
    }
  }

  return null;
}

function initMap() {
  if (typeof L === "undefined") {
    console.error("Leaflet failed to load.");
    const legend = document.getElementById("mapLegend");
    if (legend) {
      legend.textContent = "Map could not be initialized because the map library failed to load.";
    }
    return;
  }

  map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  markersLayer = L.layerGroup().addTo(map);
  map.setView([36.17, -115.14], 10);
}

function updateMap(filtered) {
  if (!map) return;
  markersLayer.clearLayers();

  const locationGroups = {};

  filtered.forEach((activity) => {
    const location = activity.location || "";
    const matched = getLocationCoordinates(location);
    if (!matched) return;
    const key = matched.key;
    if (!locationGroups[key]) {
      locationGroups[key] = { displayName: matched.displayName || key, count: 0, coords: matched.coords };
    }
    locationGroups[key].count += 1;
  });

  const bounds = [];
  Object.values(locationGroups).forEach((group) => {
    const marker = L.circleMarker([group.coords.lat, group.coords.lng], {
      radius: 10 + Math.min(group.count, 10),
      fillColor: "#2563eb",
      color: "#1d4ed8",
      weight: 2,
      fillOpacity: 0.85
    });
    marker.bindPopup(`<strong>${group.displayName}</strong><br>${group.count} event${group.count === 1 ? "" : "s"}`);
    marker.addTo(markersLayer);
    bounds.push([group.coords.lat, group.coords.lng]);
  });

  const legend = document.getElementById("mapLegend");
  legend.innerHTML = `
    <h3>Event counts by library</h3>
    <ul>${Object.values(locationGroups)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((group) => `<li><strong>${group.count}</strong> ${group.displayName}</li>`)
      .join("")}
    </ul>
  `;

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseAgeBounds(text) {
  if (!text) return [0, 99];
  const normalized = text.replace(/[\u2013\u2014]/g, "-").replace(/\*/g, "");
  const match = normalized.match(/ages?\s*(\d+)(?:-(\d+)|\s*to\s*(\d+)|\+)?/i);

  if (match) {
    const min = Number(match[1]);
    const max = match[2] ? Number(match[2]) : match[3] ? Number(match[3]) : match[1] === "18" ? 99 : Number(match[1]);
    return [min, max];
  }

  if (/all ages/i.test(normalized)) return [0, 99];
  if (/babies/i.test(normalized)) return [0, 3];
  if (/toddlers/i.test(normalized)) return [1, 4];
  if (/preschoolers/i.test(normalized)) return [3, 5];
  if (/tweens/i.test(normalized)) return [8, 12];
  if (/teens/i.test(normalized)) return [13, 17];
  if (/families/i.test(normalized)) return [0, 17];
  if (/adults/i.test(normalized)) return [18, 99];

  return [0, 99];
}

function computeAgeRange(text) {
  const [min, max] = parseAgeBounds(text);
  return max === 99 ? `${min}+` : `${min}-${max}`;
}

function isValidEvent(row) {
  if (!row.Title) return false;
  if (/^\d{2}\/\d{2}\/\d{4}/.test(row.Title)) return false;
  if (/^\u{E2}\u{A1}\u{BE}|^|^|^/.test(row.Title)) return false;
  if (/REGISTERED EVENTS?|All Types/i.test(row.Title + row.Description + row.Category)) return false;
  if (row.Location === "All Locations" && row.Time === "") return false;
  return true;
}

function csvToActivities(csvText) {
  const lines = csvText.split(/\r?\n/);
  const rows = [];
  let current = [];
  let insideQuotes = false;

  for (const line of lines) {
    const quoteCount = (line.match(/"/g) || []).length;
    if (insideQuotes) {
      current.push(line);
      if (quoteCount % 2 === 1) {
        rows.push(current.join("\n"));
        current = [];
        insideQuotes = false;
      }
      continue;
    }

    if (quoteCount % 2 === 1) {
      current.push(line);
      insideQuotes = true;
      continue;
    }

    rows.push(line);
  }

  const header = parseCsvLine(rows[0] || "");
  const dataRows = rows.slice(1).filter((line) => line.trim() !== "");
  const parsedRows = dataRows.map((line) => {
    const values = parseCsvLine(line);
    const item = {};
    header.forEach((column, index) => {
      item[column.trim()] = values[index] ? values[index].trim() : "";
    });
    return item;
  });

  return parsedRows
    .filter(isValidEvent)
    .map((row, index) => {
      const audience = [row.Audience, row.Category].filter(Boolean).join(" • ");
      const ageText = `${row.Description} ${row.Audience}`;
      return {
        id: index + 1,
        date: row.Date,
        name: row.Title,
        description: row.Description,
        location: row.Location,
        time: row.Time,
        category: row.Category,
        audience: row.Audience,
        tags: audience ? audience.split(" • ").map((tag) => tag.trim()).filter(Boolean) : [],
        ageRange: computeAgeRange(ageText),
        ageBounds: parseAgeBounds(ageText)
      };
    });
}

function activityMatchesAge(activity, ageValue) {
  if (ageValue === "all") return true;
  if (!activity.ageBounds) return true;

  const filterRanges = {
    "0-3": [0, 3],
    "4-7": [4, 7],
    "8-12": [8, 12],
    "13-17": [13, 17]
  };

  const [low, high] = filterRanges[ageValue];
  const [min, max] = activity.ageBounds;

  return min <= high && max >= low;
}

function parseActivityDate(activity) {
  const timestamp = parseEventDate(activity);
  return new Date(timestamp);
}

function matchesDateRange(activity, start, end) {
  if (!start && !end) return true;
  const activityDate = parseActivityDate(activity);
  if (Number.isNaN(activityDate.getTime())) return true;

  if (start) {
    const startDateValue = new Date(start);
    if (activityDate < startDateValue) return false;
  }

  if (end) {
    const endDateValue = new Date(end);
    endDateValue.setHours(23, 59, 59, 999);
    if (activityDate > endDateValue) return false;
  }

  return true;
}

function parseEventDate(activity) {
  const dateText = activity.date || "";
  const timeText = activity.time || "";

  const dateMatch = dateText.match(/([A-Za-z]+),?\s+([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  let year, month, day;
  if (dateMatch) {
    const monthName = dateMatch[2].toLowerCase();
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december"
    ];
    year = Number(dateMatch[4]);
    month = monthNames.indexOf(monthName);
    day = Number(dateMatch[3]);
  }

  const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
  let hour = 0;
  let minute = 0;
  if (timeMatch) {
    hour = Number(timeMatch[1]);
    minute = Number(timeMatch[2] || "0");
    const period = timeMatch[3].toLowerCase();
    if (period === "pm" && hour !== 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;
  }

  if (year !== undefined && month >= 0 && day !== undefined) {
    return new Date(year, month, day, hour, minute).getTime();
  }

  const parsed = new Date(`${dateText} ${timeText}`);
  if (!Number.isNaN(parsed.getTime())) return parsed.getTime();

  const fallback = Date.parse(dateText);
  return Number.isNaN(fallback) ? 0 : fallback;
}

function compareActivities(a, b) {
  const aTime = parseEventDate(a);
  const bTime = parseEventDate(b);
  if (aTime !== bTime) return aTime - bTime;
  return (a.name || "").localeCompare(b.name || "");
}

function renderActivities() {
  const ageValue = ageFilter.value;
  const searchValue = searchInput.value.trim().toLowerCase();
  const startValue = startDate.value;
  const endValue = endDate.value;

  const filtered = activities.filter((activity) => {
    const matchesAge = activityMatchesAge(activity, ageValue);
    const matchesDate = matchesDateRange(activity, startValue, endValue);
    const matchesSearch =
      activity.name.toLowerCase().includes(searchValue) ||
      activity.description.toLowerCase().includes(searchValue) ||
      activity.location.toLowerCase().includes(searchValue) ||
      activity.category.toLowerCase().includes(searchValue) ||
      activity.audience.toLowerCase().includes(searchValue);

    return matchesAge && matchesDate && matchesSearch;
  }).sort(compareActivities);

  updateMap(filtered);

  activityList.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    resultCount.textContent = "0 free activities found.";
    return;
  }

  emptyState.classList.add("hidden");
  resultCount.textContent = `${filtered.length} free activity${filtered.length === 1 ? "" : "ies"} found.`;

  filtered.forEach((activity) => {
    const card = document.createElement("article");
    card.className = "activity-card";
    card.innerHTML = `
      <h3>${activity.name}</h3>
      <p>${activity.description}</p>
      <div class="activity-meta">
        <span class="tag">Age ${activity.ageRange}</span>
        <span class="tag">${activity.location}</span>
        <span class="tag">${activity.tags.join(" • ")}</span>
      </div>
      <p style="margin-top: 0.8rem; color: #6b7280; font-size: 0.94rem;">${activity.date} • ${activity.time}</p>
    `;
    activityList.appendChild(card);
  });
}

function showLoading() {
  resultCount.textContent = "Loading events...";
  emptyState.classList.add("hidden");
}

function loadEvents() {
  showLoading();

  if (window.location.protocol === "file:") {
    resultCount.textContent = "This page must be served over HTTP/HTTPS to load CSV data and the map. Run a local web server and open the page from http://localhost.";
    emptyState.classList.remove("hidden");
    initMap();
    return;
  }

  initMap();

  const fetches = csvPaths.map((path) =>
    fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        return response.text();
      })
      .then(csvToActivities)
  );

  Promise.all(fetches)
    .then((results) => {
      activities = results.flat();
      renderActivities();
    })
    .catch((error) => {
      console.error("Failed to load events:", error);
      resultCount.textContent = "Unable to load events. Please try again later.";
      emptyState.classList.remove("hidden");
    });
}

ageFilter.addEventListener("change", renderActivities);
startDate.addEventListener("change", renderActivities);
endDate.addEventListener("change", renderActivities);
searchInput.addEventListener("input", renderActivities);

loadEvents();

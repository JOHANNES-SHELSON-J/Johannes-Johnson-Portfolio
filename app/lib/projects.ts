export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  approach: string[];
  results: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "privacy-aware-routing",
    title: "Privacy-Aware Routing (In Progress)",
    subtitle:
      "Camera-aware route optimization using PostGIS + pgRouting + OpenStreetMap (OSM) data to reduce ALPR exposure.",
    stack: ["PostgreSQL", "PostGIS", "pgRouting", "OSM", "SQL", "QGIS"],
    metrics: [
      { label: "Status", value: "In Progress" },
      { label: "Goal", value: "< 3 cameras per route" },
      { label: "Camera buffer", value: "25–30m proximity check" },
    ],
    problem:
      "Standard shortest-path routing ignores privacy. The goal is to compute practical routes that minimize exposure to ALPR cameras, even if the route is longer than the shortest route.",
    approach: [
      "Imported OSM road network into PostGIS and prepared routable edges for pgRouting.",
      "Mapped start/end lat-long to nearest network nodes (vertices) for routing.",
      "Generated candidate routes (shortest path + alternatives within a corridor).",
      "Computed camera exposure by counting ALPR points within a buffer distance around each route geometry.",
      "Selected the best route under the camera threshold (currently < 5; working toward < 3) with minimum exposure and reasonable distance.",
      "Optimizing query execution using spatial indexes (GiST) and reduced corridor search space.",
    ],
    results: [
      "Prototype returns camera-minimized routes with measurable trade-off vs shortest distance.",
      "Identified that strict camera avoidance can increase route length significantly (privacy vs time trade-off).",
      "Next: enforce < 3 cameras constraint and improve runtime on larger networks.",
    ],
    links: [
      // Keep empty for now if you don't want links yet
      // { label: "Repo", href: "https://github.com/..." },
    ],
  },

  {
    slug: "job-title-data-aggregator",
    title: "Job Title Data Aggregator",
    subtitle:
      "Aggregated 50K+ job records, standardized 5K+ job titles using NLP + fuzzy matching.",
    stack: ["Python", "SQL", "Pandas", "NLP", "PostgreSQL"],
    metrics: [
      { label: "Records", value: "50,000+" },
      { label: "Titles standardized", value: "5,000+" },
      { label: "Consistency improvement", value: "35%" },
    ],
    problem:
      "Job titles across sources are inconsistent, making salary and demand analysis unreliable.",
    approach: [
      "Collected job data from multiple sources and loaded into PostgreSQL.",
      "Applied text preprocessing (lowercasing, punctuation removal, token cleanup).",
      "Used fuzzy matching + mapping rules to standardize titles.",
      "Built SQL aggregations to analyze salary ranges, demand, and skills by standardized roles.",
    ],
    results: [
      "Improved dataset consistency by ~35%.",
      "Reduced manual comparison effort by ~50% using automated SQL aggregation queries.",
      "Enabled analysis across 200+ standardized roles.",
    ],
  },

  {
    slug: "pizza-sales-dashboard",
    title: "Pizza Sales Analytics Dashboard",
    subtitle:
      "Built KPI dashboards tracking revenue, orders, category performance, and trends (12K+ transactions).",
    stack: ["SQL", "Power BI", "Power Query", "DAX"],
    metrics: [
      { label: "Transactions", value: "12,000+" },
      { label: "Dashboards", value: "KPI + Trends" },
      { label: "Manual effort reduced", value: "~40%" },
    ],
    problem:
      "Sales reporting was manual and slow, making it hard to monitor performance and trends.",
    approach: [
      "Cleaned and modeled transactional data using SQL joins and aggregations.",
      "Created measures in DAX for KPIs (revenue, AOV, orders, category mix).",
      "Designed interactive Power BI dashboards with slicers and drill-downs.",
    ],
    results: [
      "Reduced manual Excel reporting effort by ~40%.",
      "Improved visibility into category and time-based performance.",
    ],
  },

  {
    slug: "car-wash-repair-system",
    title: "Car Wash & Repair Management System",
    subtitle:
      "Database-driven web app for scheduling, billing, and invoicing (100+ monthly transactions).",
    stack: ["PostgreSQL", "Django", "Bootstrap"],
    metrics: [
      { label: "Monthly transactions", value: "100+" },
      { label: "Efficiency improvement", value: "50%" },
      { label: "Schema", value: "Normalized" },
    ],
    problem:
      "Manual service scheduling and invoicing caused errors and inefficiencies.",
    approach: [
      "Designed a normalized relational schema to reduce redundancy.",
      "Built CRUD workflows for customers, vehicles, services, and invoices.",
      "Implemented scheduling and billing flows to streamline operations.",
    ],
    results: [
      "Improved operational efficiency by ~50%.",
      "Reduced data redundancy and improved billing accuracy.",
    ],
  },
];
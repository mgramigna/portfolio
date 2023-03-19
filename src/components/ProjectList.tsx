import { IconExternalLink } from "@tabler/icons-react";
import { useState } from "react";

const projectTypes = ["work", "personal"] as const;
const languages = ["java", "javascript", "lua", "rust", "typescript"] as const;
const frameworks = [
  "astro",
  "graphql",
  "next.js",
  "nodejs",
  "prisma",
  "react",
  "tailwindcss",
  "trpc",
] as const;
const tags = [...projectTypes, ...languages, ...frameworks] as const;
type Tag = (typeof tags)[number];
type Project = {
  name: string;
  lastWorkedOn: Date | "present";
  tags: Tag[];
  blurb?: string;
  url?: string;
};

const projects: Project[] = [
  {
    name: "Survivor Survivor League",
    tags: [
      "personal",
      "typescript",
      "trpc",
      "react",
      "next.js",
      "prisma",
      "tailwindcss",
    ],
    blurb:
      "Full-stack web app for users to predict the results of the television show Survivor",
    lastWorkedOn: "present",
  },
  {
    name: "Pictal Health",
    tags: ["personal", "typescript", "graphql"],
    blurb:
      "Prototype implementation of interoperable health data model in backend",
    lastWorkedOn: new Date("2022-04-01"),
  },
  {
    name: "Vote Smart Arlington",
    tags: ["personal", "javascript", "react"],
    blurb:
      "website for viewing town members’ voting history as an informational resource for the 2021 local election",
    url: "https://votesmartarlington.com",
    lastWorkedOn: new Date("2021-04-05"),
  },
  {
    name: "Advent of Code 2022",
    tags: ["personal", "rust"],
    blurb:
      "My journey learning the Rust program language by doing the advent of code 2022",
    url: "https://github.com/mgramigna/aoc2022",
    lastWorkedOn: new Date("2023-01-02"),
  },
  {
    name: "Portfolio Site",
    tags: ["personal", "typescript", "astro", "react", "tailwindcss"],
    blurb: "This website!",
    lastWorkedOn: "present",
    url: "https://github.com/mgramigna/portfolio",
  },
  {
    name: "Letterboxd Review Analysis",
    tags: ["personal", "typescript", "react"],
    blurb: "Experimentation with sentiment analysis of movie reviews",
    url: "https://github.com/mgramigna/letterboxd-review-analysis",
    lastWorkedOn: new Date("2020-12-25"),
  },
  {
    name: "Letterboxd Movie Recommendations",
    tags: ["personal", "typescript", "react"],
    blurb: "A movie recommendation system based on previously watched movies",
    url: "https://github.com/mgramigna/letterboxd-movie-recommendations",
    lastWorkedOn: new Date("2020-09-09"),
  },
  {
    name: "Neovim Development",
    tags: ["personal", "lua"],
    blurb:
      "Various development to open source repositories in the Neovim development community",
    lastWorkedOn: "present",
  },
  {
    name: "mCODE Open Source Projects",
    tags: ["work", "javascript", "nodejs"],
    blurb:
      "Framework for extracting meaningful structured health data from electronic health record systems",
    lastWorkedOn: new Date("2021-08-09"),
    url: "https://github.com/mcode/mcode-extraction-framework",
  },
  {
    name: "Flux Notes Data Capture",
    tags: ["work", "javascript", "react", "nodejs"],
    blurb:
      "Usable web app for clinical documentation of high quality data for cancer patients",
    lastWorkedOn: new Date("2019-10-01"),
    url: "https://github.com/fluxnotes/flux",
  },
  {
    name: "Synthea",
    tags: ["work", "java"],
    blurb: "Synthetic population generator",
    lastWorkedOn: new Date("2020-04-10"),
    url: "https://github.com/synthetichealth/synthea",
  },
  {
    name: "eCQM Open Source Prototypes",
    tags: [
      "work",
      "typescript",
      "javascript",
      "java",
      "nodejs",
      "next.js",
      "react",
      "tailwindcss",
    ],
    blurb: "Various prototypes for clinical quality reporting in hospitals",
    url: "https://github.com/projecttacoma",
    lastWorkedOn: "present",
  },
];

export default function ProjectList() {
  const [activeFilters, setActiveFilters] = useState<Tag[]>([]);

  const renderPill = (tag: Tag, clickable?: boolean) => {
    return (
      <div
        className={`rounded-full ${
          projectTypes.includes(tag as any)
            ? `bg-orange-600 ${clickable && "hover:bg-orange-900"}`
            : languages.includes(tag as any)
            ? `bg-green-600 ${clickable && "hover:bg-green-900"}`
            : `bg-blue-600 ${clickable && "hover:bg-blue-900"}`
        } p-1`}
      >
        {tag}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <div className="pr-8 text-lg sm:text-2xl">Filters:</div>
          <div className="flex flex-wrap gap-x-2">
            {tags
              .filter((t) => !activeFilters.includes(t))
              .map((t) => (
                <div
                  key={`filter-${t}`}
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveFilters([...activeFilters, t]);
                  }}
                >
                  {renderPill(t, true)}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-12">
        {activeFilters.length === 0 ? (
          <div className="font-extralight italic">(No filters applied)</div>
        ) : (
          <div className="flex flex-wrap gap-x-2">
            {activeFilters.map((t) => (
              <div
                key={`filter-${t}`}
                className="cursor-pointer"
                onClick={() => {
                  const newActiveFilters = [...activeFilters];
                  newActiveFilters.splice(newActiveFilters.indexOf(t), 1);
                  setActiveFilters([...newActiveFilters]);
                }}
              >
                {renderPill(t, true)}
              </div>
            ))}
            <button
              className="rounded-lg border-2 px-1 hover:bg-stone-900"
              onClick={() => {
                setActiveFilters([]);
              }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 place-items-center gap-y-8 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects
          .filter((p) => {
            if (activeFilters.length === 0) return true;
            return activeFilters.every((f) => p.tags.includes(f));
          })
          .sort((a, b) => {
            if (a.lastWorkedOn === "present" && b.lastWorkedOn === "present") {
              return a.name < b.name ? -1 : 1;
            }

            if (a.lastWorkedOn === "present") {
              return -1;
            } else if (b.lastWorkedOn === "present") {
              return 1;
            }

            return a.lastWorkedOn < b.lastWorkedOn ? 1 : -1;
          })
          .map((p) => (
            <div
              key={p.name}
              className="flex h-64 w-full flex-col justify-between rounded-lg border-2 bg-stone-900 sm:w-72"
            >
              <div className="text-center text-xl">
                {p.name}
                {p.url && (
                  <a href={p.url} target="_blank" className="inline-block">
                    <IconExternalLink />
                  </a>
                )}
                <div className="text-center text-sm font-extralight italic">
                  {p.lastWorkedOn === "present"
                    ? "(Ongoing)"
                    : `(Last worked on ${p.lastWorkedOn.toLocaleDateString()})`}
                </div>
              </div>
              <div className="text-center text-lg">{p.blurb}</div>
              <div className="flex flex-wrap justify-center gap-2 p-4">
                {p.tags.map((t) => (
                  <div key={`${p.name}-${t}`}>{renderPill(t)}</div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { siteConfig } from "../siteConfig";

const API_URL = "https://api.masjidal.com/timings";
const API_ACCEPT = "application/vnd.masjidal.com.v1+json";
// Prayer times are local to the musalla, so "now" is always read in its timezone,
// whatever timezone the visitor's device is set to.
const MASJID_TIME_ZONE = "America/Vancouver";
const DAYS_SHOWN = 7;
const CLOCK_TICK_MS = 30_000;

type PrayerKey = "fajr" | "sunrise" | "zuhr" | "asr" | "maghrib" | "isha";
type IconName = "moon" | "sun" | "horizon";

type DayTimings = {
  date: string;
  hijri_date: string;
  hijri_month: string;
  salah: Record<PrayerKey, string>;
  iqamah: Partial<Record<Exclude<PrayerKey, "sunrise"> | "jummah1" | "jummah2" | "jummah3", string>>;
};

type FetchResult = { startDate: string; days: DayTimings[] } | { startDate: string; error: true };

const PRAYERS: { key: PrayerKey; name: string; icon: IconName }[] = [
  { key: "fajr", name: "Fajr", icon: "moon" },
  { key: "sunrise", name: "Sunrise", icon: "horizon" },
  { key: "zuhr", name: "Dhuhr", icon: "sun" },
  { key: "asr", name: "Asr", icon: "sun" },
  { key: "maghrib", name: "Maghrib", icon: "horizon" },
  { key: "isha", name: "Isha", icon: "moon" },
];

const JUMUAH = [
  { key: "jummah1", label: "1st" },
  { key: "jummah2", label: "2nd" },
  { key: "jummah3", label: "3rd" },
] as const;

const masjidClock = new Intl.DateTimeFormat("en-CA", {
  timeZone: MASJID_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function masjidNow() {
  const parts = Object.fromEntries(masjidClock.formatToParts(new Date()).map((part) => [part.type, part.value]));
  return { dateKey: `${parts.year}-${parts.month}-${parts.day}`, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

function addDays(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/** Minutes after midnight for times like "6:48 AM"; null for blanks such as "N/A". */
function minutesOf(time: string | undefined) {
  const match = time?.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return null;
  const hours = (Number(match[1]) % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0);
  return hours * 60 + Number(match[2]);
}

function formatCountdown(minutes: number) {
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

function findNextPrayer(today: DayTimings, tomorrow: DayTimings | undefined, now: number) {
  for (const prayer of PRAYERS) {
    if (prayer.key === "sunrise") continue;
    const start = minutesOf(today.salah[prayer.key]);
    if (start !== null && start > now) return { prayer, time: today.salah[prayer.key], minutesUntil: start - now, tomorrow: false };
  }
  const fajr = minutesOf(tomorrow?.salah.fajr);
  if (!tomorrow || fajr === null) return null;
  return { prayer: PRAYERS[0], time: tomorrow.salah.fajr, minutesUntil: 24 * 60 - now + fajr, tomorrow: true };
}

/** Index of the most recent entry (sunrise included) that has already started today. */
function findCurrentIndex(today: DayTimings, now: number) {
  let current = -1;
  PRAYERS.forEach((prayer, index) => {
    const start = minutesOf(today.salah[prayer.key]);
    if (start !== null && start <= now) current = index;
  });
  return current;
}

function Clock({ time }: { time: string }) {
  const [digits, period] = time.split(" ");
  return <span className="pt-clock"><strong>{digits}</strong>{period && <span>{period}</span>}</span>;
}

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {name === "moon" && <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />}
      {name === "sun" && <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>}
      {name === "horizon" && <path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 6.5v2.5M5.3 10.3l1.5 1.5M18.7 10.3l-1.5 1.5" />}
    </svg>
  );
}

function Fallback() {
  return (
    <p className="widget-fallback">
      Timetable not appearing? <a href={siteConfig.awqatUrl} target="_blank" rel="noreferrer">Open prayer times in a new tab <span aria-hidden="true">↗</span></a>
    </p>
  );
}

export default function PrayerTimes() {
  const { masjidalApiKey } = siteConfig;
  const [now, setNow] = useState(masjidNow);
  const [result, setResult] = useState<FetchResult | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(masjidNow()), CLOCK_TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  // Refetches when the date rolls over at midnight, so "today" always comes first.
  useEffect(() => {
    if (!masjidalApiKey) return;
    const startDate = now.dateKey;
    const controller = new AbortController();
    const query = new URLSearchParams({ start_date: startDate, end_date: addDays(startDate, DAYS_SHOWN - 1) });
    fetch(`${API_URL}?${query}`, { headers: { "x-api-key": masjidalApiKey, Accept: API_ACCEPT }, signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Masjidal timings request failed with ${response.status}`);
        return response.json() as Promise<{ data?: { timings?: DayTimings[] } }>;
      })
      .then((body) => {
        const days = body.data?.timings ?? [];
        if (days.length === 0) throw new Error("Masjidal returned no timings");
        setResult({ startDate, days });
        setSelectedDay(0);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setResult({ startDate, error: true });
      });
    return () => controller.abort();
  }, [masjidalApiKey, now.dateKey]);

  if (!masjidalApiKey || (result && "error" in result)) return <Fallback />;
  if (!result) return <div className="pt-card pt-loading" aria-busy="true">Loading prayer times…</div>;

  const { days } = result;
  const todayIndex = Math.max(0, days.findIndex((_, index) => addDays(result.startDate, index) === now.dateKey));
  const today = days[todayIndex];
  const day = days[selectedDay] ?? today;
  const isToday = selectedDay === todayIndex;
  const next = findNextPrayer(today, days[todayIndex + 1], now.minutes);
  const currentIndex = isToday ? findCurrentIndex(today, now.minutes) : -1;
  const jumuah = JUMUAH.filter(({ key }) => minutesOf(day.iqamah[key]) !== null);

  return (
    <div className="pt-card">
      {next && (
        <div className="pt-next">
          <div>
            <p className="pt-label">Next prayer</p>
            <p className="pt-next-name">{next.prayer.name}{next.tomorrow && <small>Tomorrow</small>}</p>
          </div>
          <div className="pt-next-time">
            <Clock time={next.time} />
            <p className="pt-countdown">in <b>{formatCountdown(next.minutesUntil)}</b></p>
          </div>
        </div>
      )}

      <div className="pt-day">
        <div>
          <p className="pt-date">{day.date}</p>
          <p className="pt-hijri">{day.hijri_month} {day.hijri_date.split(",")[0]}</p>
        </div>
        <div className="pt-nav">
          <button className="pt-arrow" type="button" aria-label="Previous day" disabled={selectedDay === 0} onClick={() => setSelectedDay(selectedDay - 1)}>‹</button>
          <div className="pt-dots">
            {days.map((dayOption, index) => (
              <button
                className="pt-dot"
                type="button"
                key={dayOption.date}
                aria-label={`Show ${dayOption.date}`}
                aria-pressed={index === selectedDay}
                onClick={() => setSelectedDay(index)}
              />
            ))}
          </div>
          <button className="pt-arrow" type="button" aria-label="Next day" disabled={selectedDay === days.length - 1} onClick={() => setSelectedDay(selectedDay + 1)}>›</button>
        </div>
      </div>

      <ul className="pt-grid">
        {PRAYERS.map((prayer, index) => {
          const isNext = isToday && next && !next.tomorrow && next.prayer.key === prayer.key;
          const state = isNext ? "is-next" : index < currentIndex ? "is-past" : "";
          const iqamah = prayer.key === "sunrise" ? undefined : day.iqamah[prayer.key];
          return (
            <li className={`pt-tile ${state}`} key={prayer.key}>
              <span className="pt-tile-name"><span className="pt-icon"><Icon name={prayer.icon} /></span>{prayer.name}</span>
              <Clock time={day.salah[prayer.key]} />
              {minutesOf(iqamah) !== null && <p className="pt-iqamah">Iqamah {iqamah}</p>}
            </li>
          );
        })}
      </ul>

      {jumuah.length > 0 && (
        <div className="pt-jumuah">
          <div className="pt-jumuah-title">
            <span className="pt-icon pt-icon-solid" aria-hidden="true">★</span>
            <div><p className="pt-jumuah-name">Jumu&apos;ah</p><p className="pt-jumuah-note">Every Friday</p></div>
          </div>
          <div className="pt-jumuah-times">
            {jumuah.map(({ key, label }) => <p key={key}><small>{label}</small><b>{day.iqamah[key]}</b></p>)}
          </div>
        </div>
      )}

      <div className="pt-footer">
        <a href={siteConfig.awqatUrl} target="_blank" rel="noreferrer">Monthly timetable <span aria-hidden="true">↗</span></a>
        <a href="https://www.mymasjidal.com" target="_blank" rel="noreferrer">Powered by <b>Masjidal</b></a>
      </div>
    </div>
  );
}

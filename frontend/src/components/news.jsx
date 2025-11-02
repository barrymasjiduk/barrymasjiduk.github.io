// news.jsx
import * as React from "react";
import { Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { services, other } from "@/hooks/useData";

const sampleNews = [
  {
    id: 1,
    title: "Eid Mubarak!",
    excerpt: "Alhamdulillah, the moon has been sighted, Eid will be on Monday. Eid Salah will be at 08:00 AM and 10:00 AM.",
    date: "2025-08-01",
    tag: "Announcement",
    image: "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "10th Of Muharram",
    excerpt: "The reward of fasting on the 10th of Muharram is important.......",
    date: "2025-08-05",
    tag: "Naseehat",
    image: "https://images.unsplash.com/photo-1633677658580-2535af0cfb00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

const sampleServices = services();
const otherinfo = other();


function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
  } catch {
    return d;
  }
}

const NewsCard = ({ item }) => (
  <article className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow">
    {item.image && (
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
      </div>
    )}
    <div className="p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-flex rounded-full bg-primary/10 text-primary px-2 py-0.5">{item.tag}</span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(item.date)}
        </span>
      </div>
      <h3 className="text-base md:text-lg font-semibold text-gray-900">{item.title}</h3>
      <p className="mt-1 text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
      <button className="mt-3 inline-flex items-center gap-1 text-primary text-sm hover:underline">
        Read more <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </article>
);

const News = ({ news = sampleNews, services = sampleServices }) => {
  return (
    <section className="text-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">News & Articles</h2>
            <p className="text-sm text-gray-600">Latest from Barry Masjid</p>
          </div>
          <a href="/news" className="text-primary text-sm hover:underline hidden sm:inline">
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: News cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>

          {/* Right: Services list */}
          <aside className="lg:col-span-1">
            <div className="rounded-xl bg-white shadow p-5">
                <h3 className="text-lg font-semibold text-gray-900">Our Services</h3>
                <ul className="mt-3 space-y-3">
                    {services
                    .filter(([_, value]) => value) // Only keep true values
                    .map(([title], i) => (
                        <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{title}</span>
                        </li>
                    ))}
                {/* Divider line before extra info */}
                <li className="pt-3 mt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">Other Info</p>
                    <p className="text-sm text-gray-600 mt-1">{otherinfo}</p>
                </li>
                </ul>


              <a
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-primary text-sm hover:underline"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default News;

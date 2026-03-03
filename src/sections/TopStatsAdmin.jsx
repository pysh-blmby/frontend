const stats = [
  {
    id: 1,
    title: "Total Revenue",
    value: "₹2,34,820",
    change: "+12.4%",
    icon: "💰",
  },
  {
    id: 2,
    title: "Total Orders",
    value: "1,284",
    change: "+8.1%",
    icon: "📦",
  },
  {
    id: 3,
    title: "Total Customers",
    value: "3,942",
    change: "+5.6%",
    icon: "👥",
  },
  {
    id: 4,
    title: "Low Stock Items",
    value: "6",
    change: "Needs Attention",
    icon: "⚠️",
  },
];

const TopStatsAdmin = () => {
  return (
    <section className="w-full py-8 sm:py-12 bg-linear-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Glow Effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition duration-500"></div>

              {/* Top Row */}
              <div className="flex items-center justify-between mb-5 sm:mb-8 relative z-10">
                <div className="text-2xl sm:text-4xl bg-white/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                  {stat.icon}
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium tracking-wide">
                  {stat.change}
                </span>
              </div>

              {/* Value */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 relative z-10">
                {stat.value}
              </h2>

              {/* Title */}
              <p className="text-xs sm:text-sm text-zinc-400 relative z-10 tracking-wide">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopStatsAdmin;

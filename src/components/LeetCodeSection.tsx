import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useEffect, useState } from "react";
import { Code2, Github, Activity, Star, Users, BookOpen, Clock, Target } from "lucide-react";

interface LeetCodeStats {
  solved: string | number;
  contestRating: string | number;
  easy: string | number;
  medium: string | number;
  hard: string | number;
  streak: string | number;
  ranking: string | number;
}

interface GitHubStats {
  repos: string | number;
  followers: string | number;
  following: string | number;
  stars: string | number;
  gists: string | number;
  year: string | number;
  commits: string | number;
}


function LanguageStats() {
  const languages = [
    { name: "TypeScript", percent: 63.92, color: "#3178c6" },
    { name: "JavaScript", percent: 11.83, color: "#f7df1e" },
    { name: "PHP", percent: 9.87, color: "#4f5b93" },
    { name: "HTML", percent: 9.55, color: "#e34f26" },
    { name: "CSS", percent: 3.22, color: "#1572b6" },
    { name: "PLpgSQL", percent: 1.61, color: "#336791" },
  ];

  return (
    <div className="glass-card p-8 h-full">
      <h3 className="text-xl font-bold text-primary mb-8 glow-text tracking-tight uppercase font-mono-display">Most Used Languages</h3>
      <div className="h-2 w-full rounded-full overflow-hidden flex mb-8 bg-muted/20">
        {languages.map((lang) => (
          <div key={lang.name} style={{ width: `${lang.percent}%`, backgroundColor: lang.color }} className="h-full transition-all duration-1000" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-3 group">
            <div className="w-3 h-3 rounded-full shadow-[0_0_5px_currentColor] group-hover:scale-125 transition-transform" style={{ backgroundColor: lang.color, color: lang.color }} />
            <span className="text-sm font-medium text-foreground/90">{lang.name}</span>
            <span className="text-xs text-muted-foreground ml-auto font-mono-display">{lang.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeetCodeSection() {
  const [activeTab, setActiveTab] = useState<"leetcode" | "github">("leetcode");
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lcCalendar, setLcCalendar] = useState<Record<string, number> | null>(null);

  const [lcStats, setLcStats] = useState<LeetCodeStats>({
    solved: "167",
    contestRating: "1,419",
    easy: "94",
    medium: "63",
    hard: "10",
    streak: "70",
    ranking: "450,231",
  });

  const [ghStats, setGhStats] = useState<GitHubStats>({
    repos: "12",
    followers: "4",
    following: "2",
    stars: "1",
    gists: "0",
    year: "2025",
    commits: "500+",
  });

  useEffect(() => {
    const fetchData = async (force = false) => {
      const CACHE_KEY_LC = "portfolio_lc_stats";
      const CACHE_KEY_GH = "portfolio_gh_stats";
      const CACHE_TIME = 5 * 60 * 1000;

      const cachedLc = localStorage.getItem(CACHE_KEY_LC);
      const cachedGh = localStorage.getItem(CACHE_KEY_GH);
      const now = new Date().getTime();

      if (!force && cachedLc && cachedGh) {
        const lcData = JSON.parse(cachedLc);
        const ghData = JSON.parse(cachedGh);
        if (now - lcData.timestamp < CACHE_TIME) {
          setLcStats(lcData.stats);
          setLcCalendar(lcData.calendar);
          setGhStats(ghData.stats);
          setLastRefreshed(new Date(lcData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      try {
        const [lcMainRes, contestRes, calendarRes, ghUserRes, ghReposRes] = await Promise.allSettled([
          fetch(`https://leetcode-api-faisalshohag.vercel.app/Het_Barasara`),
          fetch(`https://alfa-leetcode-api.onrender.com/Het_Barasara/contest`),
          fetch(`https://alfa-leetcode-api.onrender.com/Het_Barasara/calendar`),
          fetch(`https://api.github.com/users/hetbarasara-maker`),
          fetch(`https://api.github.com/users/hetbarasara-maker/repos?per_page=100`)
        ]);

        let solvedData: any = null;
        let contestData: any = null;
        let calendarData: any = null;
        let ghUserData: any = null;
        let ghReposData: any = null;

        if (lcMainRes.status === 'fulfilled' && lcMainRes.value.ok) solvedData = await lcMainRes.value.json();
        if (contestRes.status === 'fulfilled' && contestRes.value.ok) contestData = await contestRes.value.json();
        if (calendarRes.status === 'fulfilled' && calendarRes.value.ok) calendarData = await calendarRes.value.json();
        if (ghUserRes.status === 'fulfilled' && ghUserRes.value.ok) ghUserData = await ghUserRes.value.json();
        if (ghReposRes.status === 'fulfilled' && ghReposRes.value.ok) ghReposData = await ghReposRes.value.json();

        setLcStats(prev => {
          const newLc = {
            solved: solvedData?.totalSolved ?? prev.solved,
            contestRating: contestData?.contestRating ? Math.round(contestData.contestRating).toLocaleString() : prev.contestRating,
            easy: solvedData?.easySolved ?? prev.easy,
            medium: solvedData?.mediumSolved ?? prev.medium,
            hard: solvedData?.hardSolved ?? prev.hard,
            streak: calendarData?.streak ?? prev.streak,
            ranking: solvedData?.ranking ?? prev.ranking,
          };

          let calObj = null;
          if (solvedData?.submissionCalendar && typeof solvedData.submissionCalendar === 'object') {
            calObj = solvedData.submissionCalendar;
          } else if (calendarData?.submissionCalendar) {
            try { calObj = JSON.parse(calendarData.submissionCalendar); } catch (e) { }
          }

          if (calObj) {
            setLcCalendar(calObj);
          }
          localStorage.setItem(CACHE_KEY_LC, JSON.stringify({ stats: newLc, calendar: calObj || {}, timestamp: now }));
          return newLc;
        });

        setGhStats(prev => {
          const totalStars = Array.isArray(ghReposData)
            ? ghReposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
            : Number(prev.stars);

          const newGh = {
            repos: ghUserData?.public_repos ?? prev.repos,
            followers: ghUserData?.followers ?? prev.followers,
            following: ghUserData?.following ?? prev.following,
            stars: Array.isArray(ghReposData) ? (totalStars || 1) : prev.stars,
            gists: ghUserData?.public_gists ?? prev.gists,
            year: ghUserData?.created_at ? new Date(ghUserData.created_at).getFullYear() : prev.year,
            commits: prev.commits,
          };
          localStorage.setItem(CACHE_KEY_GH, JSON.stringify({ stats: newGh, timestamp: now }));
          return newGh;
        });

        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (error) {
        console.error("Stats error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const handleRefresh = () => fetchData(true);
    window.addEventListener('update-stats', handleRefresh);

    // Auto-sync stats every 5 minutes in the background
    const syncInterval = setInterval(() => {
      fetchData(true);
    }, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('update-stats', handleRefresh);
      clearInterval(syncInterval);
    };
  }, []);

  const profileLink = activeTab === "leetcode"
    ? "https://leetcode.com/u/Het_Barasara/"
    : "https://github.com/hetbarasara-maker";

  const usernameHandle = activeTab === "leetcode" ? "@Het_Barasara" : "@hetbarasara-maker";

  return (
    <SectionWrapper
      id="leetcode"
      title={activeTab === "leetcode" ? "LeetCode Stats" : "GitHub Contributions"}
      subtitle={activeTab === "leetcode" ? "Real-time algorithmic problem solving analytics" : "Visualization of my open source contributions"}
    >
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="bg-secondary/30 p-1 sm:p-1.5 rounded-2xl glass-card flex gap-1 border border-foreground/[0.05]">
          <button
            onClick={() => setActiveTab("leetcode")}
            className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight flex items-center gap-1.5 sm:gap-2.5 transition-all duration-500 ${activeTab === "leetcode" ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          >
            <Code2 size={16} className="sm:size-[18px]" /> LeetCode
          </button>
          <button
            onClick={() => setActiveTab("github")}
            className={`px-4 sm:px-8 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight flex items-center gap-1.5 sm:gap-2.5 transition-all duration-500 ${activeTab === "github" ? "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          >
            <Github size={16} className="sm:size-[18px]" /> GitHub
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="max-w-6xl mx-auto"
        >
          {/* Stats Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch pt-8">
            {/* Left Box: Stats Summary / Difficulty */}
            <div className="glass-card p-6 sm:p-8 flex flex-col justify-between group">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-6 sm:mb-8 glow-text tracking-tight uppercase font-mono-display">
                  {activeTab === "leetcode" ? "Difficulty Breakdown" : "GitHub Statistics"}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {(activeTab === "leetcode" ? [
                    { label: "Total Solved", value: lcStats.solved, color: "text-primary", bgColor: "bg-primary", width: "100%" },
                    { label: "Easy Problems", value: lcStats.easy, color: "text-green-500", bgColor: "bg-green-500", width: `${(Number(lcStats.easy) / Number(lcStats.solved) * 100).toFixed(1)}%` },
                    { label: "Medium Problems", value: lcStats.medium, color: "text-yellow-500", bgColor: "bg-yellow-500", width: `${(Number(lcStats.medium) / Number(lcStats.solved) * 100).toFixed(1)}%` },
                    { label: "Hard Problems", value: lcStats.hard, color: "text-red-500", bgColor: "bg-red-500", width: `${(Number(lcStats.hard) / Number(lcStats.solved) * 100).toFixed(1)}%` },
                  ] : [
                    { label: "Total Stars Earned", value: ghStats.stars, color: "text-primary", bgColor: "bg-primary", width: "100%" },
                    { label: "Commits (last year)", value: ghStats.commits, color: "text-primary", bgColor: "bg-primary", width: "100%" },
                    { label: "Public Projects", value: ghStats.repos, color: "text-primary", bgColor: "bg-primary", width: "100%" },
                    { label: "Total Followers", value: ghStats.followers, color: "text-primary", bgColor: "bg-primary", width: "100%" },
                  ]).map((item) => (
                    <div key={item.label} className="flex flex-col gap-1.5 sm:gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-tight">{item.label}</span>
                        <span className={`text-base sm:text-xl font-bold font-mono-display ${item.color}`}>{loading ? "..." : item.value}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.width || "100%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full opacity-50 ${item.bgColor}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 sm:mt-12 flex items-center justify-center p-4 sm:p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" className="stroke-white/[0.03] fill-none" strokeWidth="4" />
                    <circle cx="48" cy="48" r="42" className="stroke-white/[0.03] fill-none hidden sm:block" strokeWidth="6" />
                    <circle cx="48" cy="48" r="42" className="stroke-primary fill-none hidden sm:block" strokeWidth="6" strokeDasharray="264" strokeDashoffset="60" strokeLinecap="round" />
                    {/* Simplified mobile circle */}
                    <circle cx="32" cy="32" r="28" className="stroke-primary fill-none sm:hidden" strokeWidth="4" strokeDasharray="175" strokeDashoffset="40" strokeLinecap="round" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg sm:text-2xl font-black font-mono-display text-primary">{activeTab === "leetcode" ? "LC" : "GH"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: 4 Stats Cards (LeetCode) or Language Stats (GitHub) */}
            {activeTab === "leetcode" ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
                {[
                  { label: "Solved", value: lcStats.solved, icon: Target },
                  { label: "Rating", value: lcStats.contestRating, icon: Star },
                  { label: "Streak", value: lcStats.streak, icon: Clock },
                  { label: "Ranking", value: lcStats.ranking, icon: Users },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 sm:p-6 flex flex-col justify-between hover:border-primary/40 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <stat.icon size={16} className="sm:size-[18px]" />
                    </div>
                    <div>
                      <h4 className="text-[8px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-mono-display mb-0.5 sm:mb-1">{stat.label}</h4>
                      <p className="text-lg sm:text-2xl font-bold font-mono-display glow-text">{loading ? "..." : stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <LanguageStats />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 sm:mt-16 text-center flex flex-col items-center gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <a href={profileLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-5 sm:px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-primary/40 transition-all w-full sm:w-auto justify-center">
            <span className="text-[9px] sm:text-[10px] font-bold font-mono-display text-muted-foreground group-hover:text-primary uppercase tracking-[0.15em] sm:tracking-[0.2em]">View Full Profile</span>
            {activeTab === "leetcode" ? (
              <Code2 size={14} className="sm:size-4 text-muted-foreground group-hover:text-primary" />
            ) : (
              <Github size={14} className="sm:size-4 text-muted-foreground group-hover:text-primary" />
            )}
          </a>
        </div>
        {lastRefreshed && (
          <p className="text-[9px] font-mono-display text-muted-foreground opacity-40 uppercase tracking-[0.3em]">Synchronized: {lastRefreshed}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

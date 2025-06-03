"use client";

import { useState } from "react";

// Theme/color constants
const COLORS = {
  primary: "#2D6A4F",
  secondary: "#40916C",
  accent: "#FFD60A",
  bg: "#ffffff",
  fg: "#171717",
  card: "#f7f7f7",
};

// PUBLIC_INTERFACE
function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center transition-all animate-fade-in">
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
        style={{
          color: COLORS.primary,
          letterSpacing: '-1px',
          textShadow: `0 0 18px ${COLORS.accent}44`,
        }}
      >
        MathQuest
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-8 text-[color:var(--foreground)] font-medium">
        Embark on your math mastery adventure!
      </p>
      <button
        onClick={onStart}
        className="rounded-full px-8 py-3 text-lg font-bold transition-transform bg-[color:#FFD60A] text-[color:#2D6A4F] shadow-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-[color:#40916C] hover:scale-105 animate-bounce-lite"
        data-testid="start-practicing-btn"
      >
        Start Practicing
      </button>
    </section>
  );
}

// PUBLIC_INTERFACE
interface UserData {
  name?: string;
  streak?: number;
  progress?: number;
  recommended?: string;
}

function Dashboard({ user, onPractice }: { user: UserData; onPractice: () => void }) {
  // Placeholder data for demonstration
  const { name = "Adventurer", streak = 5, progress = 68, recommended = "Multiplication" } = user || {};

  return (
    <section className="my-8 w-full max-w-2xl mx-auto px-4 transition-all animate-fade-in">
      <h2 className="text-2xl font-semibold mb-3" style={{ color: COLORS.secondary }}>
        Welcome back, {name}!
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-7">
        <div className="bg-[color:#f7f7f7] rounded-xl py-4 px-2 flex flex-col items-center shadow-sm">
          <span className="text-3xl font-bold" style={{ color: COLORS.primary }}>{progress}%</span>
          <span className="text-xs text-gray-600 mt-1">Progress</span>
        </div>
        <div className="bg-[color:#f7f7f7] rounded-xl py-4 px-2 flex flex-col items-center shadow-sm animate-pulse-lite">
          <span className="text-3xl font-bold text-[color:#FFD60A]">{streak}🔥</span>
          <span className="text-xs text-gray-600 mt-1">Day Streak</span>
        </div>
        <div className="bg-[color:#f7f7f7] rounded-xl py-4 px-2 flex flex-col items-center shadow-sm">
          <span className="text-3xl font-bold" style={{ color: COLORS.secondary }}>
            {recommended}
          </span>
          <span className="text-xs text-gray-600 mt-1">Recommendation</span>
        </div>
      </div>
      <button
        className="mt-2 px-6 py-2 rounded-lg bg-[color:#40916C] text-white font-semibold text-base transition-all shadow hover:bg-[color:#2D6A4F] focus:outline-none focus:ring-2 focus:ring-[color:#FFD60A]"
        onClick={onPractice}
      >
        Go to Practice
      </button>
    </section>
  );
}

// Utility for generating sample math problems
function generateProblem() {
  // Very basic stub, replace with real generator
  const a = Math.floor(Math.random() * 10 + 1);
  const b = Math.floor(Math.random() * 10 + 1);
  const answer = a + b;
  const prompt = `${a} + ${b}`;
  return { prompt, answer, explanation: `To add ${a} and ${b}, just sum ${a} + ${b} = ${answer}.` };
}

// PUBLIC_INTERFACE
import { useEffect } from "react";

function MathPracticeSection({
  onFeedback,
}: {
  onFeedback: (isCorrect: boolean, explanation: string) => void;
}) {
  const [topic, setTopic] = useState("Addition");
  const [difficulty, setDifficulty] = useState("Easy");
  const [problem, setProblem] = useState(() => generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<null | { correct: boolean; explanation: string }>(null);

  // Regenerate a new problem when topic or difficulty changes
  useEffect(() => {
    setProblem(generateProblem());
    setUserAnswer("");
    setFeedback(null);
  }, [topic, difficulty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = String(problem.answer) === userAnswer.trim();
    setFeedback({ correct, explanation: problem.explanation });
    onFeedback(correct, problem.explanation);
  };

  const handleNext = () => {
    setProblem(generateProblem());
    setUserAnswer("");
    setFeedback(null);
  };

  return (
    <section className="w-full max-w-xl mx-auto my-8 p-6 rounded-2xl bg-[color:#f7f7f7] shadow-lg transition-all animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="topic">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="rounded px-2 py-1 bg-white border border-gray-300 focus:border-[color:#40916C]"
          >
            <option>Addition</option>
            <option>Subtraction</option>
            <option>Multiplication</option>
            <option>Division</option>
            <option>Fractions</option>
            <option>Decimals</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="rounded px-2 py-1 bg-white border border-gray-300 focus:border-[color:#40916C]"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <span className="text-xl font-bold mb-2">{problem.prompt}</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="text-center text-lg w-28 py-2 rounded border border-gray-300 focus:border-[color:#40916C]"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          disabled={!!feedback}
          placeholder="Your answer"
          required
        />
        <button
          type="submit"
          className={`mt-2 px-6 py-2 rounded-full font-bold shadow transition-all ${
            feedback
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[color:#2D6A4F] text-white hover:bg-[color:#40916C] focus:ring-2 focus:ring-[color:#FFD60A]"
          }`}
          disabled={!!feedback}
        >
          Submit
        </button>
        {feedback && (
          <div
            className={`mt-2 text-base flex flex-col items-center transition-all ${
              feedback.correct
                ? "text-green-700 animate-celebrate"
                : "text-red-600 animate-shake"
            }`}
          >
            {feedback.correct ? "Correct! 🎉" : "Incorrect, try again!"}
            <div className="text-xs bg-yellow-100 rounded px-2 py-1 mt-2 border" style={{ color: COLORS.fg }}>
              {feedback.explanation}
            </div>
            <button
              className="mt-3 px-5 py-1.5 rounded bg-[color:#FFD60A] font-semibold text-[color:#2D6A4F] shadow hover:bg-yellow-300 transition-all"
              onClick={handleNext}
              style={{ outline: "none" }}
              type="button"
            >
              Next
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

// PUBLIC_INTERFACE
function Leaderboard() {
  // Placeholder leaders
  const leaders = [
    { name: "Sophie", points: 920 },
    { name: "Jayden", points: 850 },
    { name: "Alex", points: 790 },
    { name: "You", points: 775 }, // encourage user
  ];
  return (
    <section className="my-8 mb-12 w-full max-w-xs mx-auto rounded-xl shadow bg-white px-4 py-6 animate-fade-in">
      <h3 className="font-bold text-lg mb-4 text-[color:#40916C]">Leaderboard</h3>
      <ol>
        {leaders.map((l, idx) => (
          <li
            key={l.name}
            className={`flex justify-between items-center px-2 py-1 rounded-xl my-1 ${
              idx === 0
                ? "bg-[color:#FFD60A22] font-semibold"
                : idx === 3
                ? "bg-[color:#2D6A4F22]"
                : ""
            }`}
          >
            <span>
              {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : ""}
              {l.name}
            </span>
            <span className="font-mono">{l.points} pts</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// PUBLIC_INTERFACE
function Achievements() {
  // Placeholder badge data
  const badges = [
    { name: "First Problem", desc: "Completed your first problem.", achieved: true },
    { name: "5-Day Streak", desc: "Practiced 5 days in a row.", achieved: true },
    { name: "Math Master", desc: "Answered 100 problems.", achieved: false },
  ];
  return (
    <section className="my-8 mb-12 w-full max-w-xs mx-auto rounded-xl shadow bg-white px-4 py-6 animate-fade-in">
      <h3 className="font-bold text-lg mb-4 text-[color:#40916C]">Achievements</h3>
      <div className="flex flex-col gap-3">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg ${
              b.achieved
                ? "bg-[color:#D0FFD6]"
                : "bg-gray-200 opacity-60"
            } animate-pop`}
          >
            <span className="mr-2 text-2xl">
              {b.achieved ? "🏅" : "🔒"}
            </span>
            <div>
              <span className="font-medium">{b.name}</span>
              <div className="text-xs text-gray-600">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type SideTabType = "Leaderboard" | "Achievements";

// Tabbed Sidebar for Leaderboard and Achievements
function SideTabs({ tab, onTabChange }: { tab: SideTabType; onTabChange: (tab: SideTabType) => void }) {
  return (
    <div className="w-full max-w-xs mx-auto flex gap-2 items-center mt-2 mb-2">
      {(["Leaderboard", "Achievements"] as SideTabType[]).map((t) => (
        <button
          key={t}
          onClick={() => onTabChange(t)}
          className={`flex-1 rounded-lg py-2 font-semibold transition-all ${
            tab === t
              ? "bg-[color:#2D6A4F] text-white scale-[1.045] shadow-lg"
              : "bg-gray-200 text-[color:#2D6A4F]"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function MainContainer() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [feedbackAnim, setFeedbackAnim] = useState<null | boolean>(null); // true=correct anim, false=incorrect anim
  const [sideTab, setSideTab] = useState<SideTabType>("Leaderboard");

  // Example: before authentication, only landing page shows.
  // Toggle showDashboard/Practice for demonstration ("login" flow not implemented)
  const user = { name: "Adventurer", streak: 5, progress: 68, recommended: "Multiplication" };

  // Animation handlers
  function handleShowDashboard() {
    setShowDashboard(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 400);
  }
  function handlePracticeClick() {
    setShowPractice(true);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 400);
  }
  function handleFeedback(correct: boolean) {
    setFeedbackAnim(correct);
    setTimeout(() => setFeedbackAnim(null), 1400);
  }

  // SideTab type
  type SideTabType = "Leaderboard" | "Achievements";

  return (
    <main className="min-h-screen bg-[color:var(--color-background)] font-sans text-[color:var(--color-foreground)] flex flex-col items-center">
      {/* Animated celebration icons */}
      {feedbackAnim === true && (
        <div className="fixed top-1/4 left-1/2 z-50 animate-confetti pointer-events-none select-none">🎉✨🌟</div>
      )}
      {feedbackAnim === false && (
        <div className="fixed top-1/4 left-1/2 z-50 animate-shake pointer-events-none select-none">❌</div>
      )}

      {/* LANDING PAGE */}
      {!showDashboard && (
        <LandingPage onStart={handleShowDashboard} />
      )}

      {/* USER DASHBOARD */}
      {showDashboard && !showPractice && (
        <Dashboard user={user} onPractice={handlePracticeClick} />
      )}

      {/* MAIN PRACTICE AREA */}
      {showPractice && (
        <MathPracticeSection
          onFeedback={(correct) => handleFeedback(correct)}
        />
      )}

      {/* Sidebar Tabs and Views: always visible after dashboard */}
      {showDashboard && (
        <div className="w-full max-w-xs mx-auto">
          <SideTabs tab={sideTab} onTabChange={(t: SideTabType) => setSideTab(t)} />
          {sideTab === "Leaderboard" ? <Leaderboard /> : <Achievements />}
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full py-7 mt-14 items-center text-center text-xs bg-[color:#2D6A4F] text-white shadow-inner tracking-wide">
        MathQuest &copy; {new Date().getFullYear()} &mdash; Level up your math journey! 🚀
      </footer>

      {/* MOBILE/RESPONSIVE STYLES */}
      <style jsx global>{`
        .animate-bounce-lite {
          animation: bounce 0.9s 1;
        }
        .animate-celebrate {
          animation: pop-scale 0.5s, bounce 1s 1;
        }
        .animate-pop {
          animation: pop-scale 0.35s;
        }
        .animate-shake {
          animation: shake 0.6s 1;
        }
        .animate-confetti {
          animation: pop-scale 0.3s, drop 1.8s cubic-bezier(.78,-0.15,0,0.99);
        }
        .animate-fade-in {
          animation: fadeIn 0.65s;
        }
        @keyframes bounce {
          0%, 100% {transform: translateY(0);}
          30% {transform: translateY(-24px);}
          50% {transform: translateY(-14px);}
        }
        @keyframes pop-scale {
          0% {transform: scale(0.93);}
          85% {transform: scale(1.05);}
          100% {transform: scale(1);}
        }
        @keyframes shake {
          0% {transform: translateX(0);}
          24% {transform: translateX(-12px);}
          46% {transform: translateX(12px);}
          70% {transform: translateX(-8px);}
          100% {transform: translateX(0);}
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(12px);}
          to {opacity: 1; transform: translateY(0);}
        }
        @keyframes drop {
          from {opacity:1; transform: translateY(-32px);}
          to {opacity:0; transform: translateY(100px);}
        }
        @media (max-width: 600px) {
          .max-w-xl, .max-w-2xl, .max-w-xs {max-width: 97vw !important;}
          .rounded-xl, .rounded-2xl {border-radius: 1rem;}
          .px-6, .px-4 {padding-left: 1rem; padding-right: 1rem;}
          .py-6, .py-4 {padding-top: 1rem; padding-bottom: 1rem;}
        }
      `}</style>
    </main>
  );
}

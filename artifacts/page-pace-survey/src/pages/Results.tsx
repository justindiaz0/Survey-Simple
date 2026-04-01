import { useLocation } from "wouter";

export default function Results() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">Thank you!</h1>
          <p className="text-slate-500 text-base mb-8">
            Your responses have been saved. Here are a few quick tips to help you build a better reading habit.
          </p>

          <div className="space-y-4 text-left mb-8">
            <div className="flex gap-4 items-start bg-indigo-50 rounded-2xl px-5 py-4">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold text-slate-800">Set a reading time</p>
                <p className="text-sm text-slate-500">Even 10 minutes at the same time each day builds momentum fast.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-indigo-50 rounded-2xl px-5 py-4">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-slate-800">Keep goals small</p>
                <p className="text-sm text-slate-500">A page-count goal like "5 pages a day" is easier to maintain than big targets.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-indigo-50 rounded-2xl px-5 py-4">
              <span className="text-2xl">📵</span>
              <div>
                <p className="font-semibold text-slate-800">Remove distractions</p>
                <p className="text-sm text-slate-500">Put your phone in another room while reading — even a small barrier helps.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-indigo-50 rounded-2xl px-5 py-4">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-semibold text-slate-800">Track your streak</p>
                <p className="text-sm text-slate-500">Keeping a simple record of reading days makes you more likely to keep going.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl text-base transition-colors"
          >
            Take the Survey Again
          </button>
        </div>

        <p className="mt-6 text-xs text-slate-400">Page Pace Survey — your responses are stored securely.</p>
      </div>
    </div>
  );
}

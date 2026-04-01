import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

type FormData = {
  reading_frequency: string;
  reading_time: string;
  distractions: string[];
  motivation: string;
  skipping_feeling: string;
  consistency_helpers: string[];
  struggle_reason: string;
};

const initialForm: FormData = {
  reading_frequency: "",
  reading_time: "",
  distractions: [],
  motivation: "",
  skipping_feeling: "",
  consistency_helpers: [],
  struggle_reason: "",
};

export default function Survey() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();

  function setRadio(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setDropdown(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function setText(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleCheckbox(field: "distractions" | "consistency_helpers", value: string) {
    setForm((f) => {
      const arr = f[field] as string[];
      if (arr.includes(value)) {
        return { ...f, [field]: arr.filter((v) => v !== value) };
      }
      return { ...f, [field]: [...arr, value] };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.reading_frequency) { setError("Please answer question 1."); return; }
    if (!form.reading_time) { setError("Please answer question 2."); return; }
    if (form.distractions.length === 0) { setError("Please select at least one option for question 3."); return; }
    if (!form.motivation.trim()) { setError("Please answer question 4."); return; }
    if (!form.skipping_feeling) { setError("Please answer question 5."); return; }
    if (form.consistency_helpers.length === 0) { setError("Please select at least one option for question 6."); return; }
    if (!form.struggle_reason.trim()) { setError("Please answer question 7."); return; }

    setSubmitting(true);

    const { error: dbError } = await supabase.from("survey_responses").insert([
      {
        reading_frequency: form.reading_frequency,
        reading_time: form.reading_time,
        distractions: form.distractions,
        motivation: form.motivation,
        skipping_feeling: form.skipping_feeling,
        consistency_helpers: form.consistency_helpers,
        struggle_reason: form.struggle_reason,
      },
    ]);

    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong saving your response. Please try again.");
      console.error(dbError);
      return;
    }

    navigate("/results");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Page Pace Survey</h1>
          <p className="mt-2 text-slate-500 text-base">Help us understand your reading habits. Takes about 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Q1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 1 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">How often do you read for personal enjoyment?</h2>
            <div className="space-y-3">
              {["Every day", "Few times a week", "Once a week", "Rarely", "Never"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="reading_frequency"
                    value={opt}
                    checked={form.reading_frequency === opt}
                    onChange={() => setRadio("reading_frequency", opt)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 2 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">When do you usually plan to read?</h2>
            <select
              value={form.reading_time}
              onChange={(e) => setDropdown("reading_time", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            >
              <option value="">— Select an option —</option>
              {["Morning", "Afternoon", "Evening", "Late night", "I don't plan it"].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Q3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 3 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">What distracts you from reading?</h2>
            <p className="text-sm text-slate-400 mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 gap-3">
              {["Social media", "Schoolwork", "Work", "Being tired", "Friends", "Other"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={form.distractions.includes(opt)}
                    onChange={() => toggleCheckbox("distractions", opt)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q4 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 4 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">What motivates you to read?</h2>
            <textarea
              value={form.motivation}
              onChange={(e) => setText("motivation", e.target.value)}
              placeholder="Share what drives you to pick up a book..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Q5 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 5 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">How do you feel when you skip reading?</h2>
            <div className="space-y-3">
              {["Guilty", "Indifferent", "Frustrated", "Don't think about it"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="skipping_feeling"
                    value={opt}
                    checked={form.skipping_feeling === opt}
                    onChange={() => setRadio("skipping_feeling", opt)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q6 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 6 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">What would help you stay consistent?</h2>
            <p className="text-sm text-slate-400 mb-4">Select all that apply</p>
            <div className="grid grid-cols-2 gap-3">
              {["Progress tracking", "Reminders", "Short goals", "Streaks", "Rewards"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={form.consistency_helpers.includes(opt)}
                    onChange={() => toggleCheckbox("consistency_helpers", opt)}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 group-hover:text-slate-900 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q7 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Question 7 of 7</p>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Why do you struggle to stay consistent with reading?</h2>
            <textarea
              value={form.struggle_reason}
              onChange={(e) => setText("struggle_reason", e.target.value)}
              placeholder="Describe what makes it hard to stay on track..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 rounded-2xl text-base transition-colors shadow-md"
          >
            {submitting ? "Submitting..." : "Submit Survey"}
          </button>
        </form>
      </div>
    </div>
  );
}

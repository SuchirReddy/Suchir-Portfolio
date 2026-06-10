"use client";

import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2, X, Save } from "lucide-react";
import { JourneyMilestone, JourneyStat, JourneyLesson, JourneySettings } from "@prisma/client";
import { Button } from "@/components/ui/button";

import {
  saveJourneyMilestoneAction,
  deleteJourneyMilestoneAction,
  saveJourneyStatAction,
  deleteJourneyStatAction,
  saveJourneyLessonAction,
  deleteJourneyLessonAction,
  saveJourneySettingsAction
} from "../actions";

interface JourneyManagerProps {
  initialMilestones: JourneyMilestone[];
  initialStats: JourneyStat[];
  initialLessons: JourneyLesson[];
  initialSettings: JourneySettings | null;
}

export function JourneyManager({
  initialMilestones,
  initialStats,
  initialLessons,
  initialSettings,
}: JourneyManagerProps) {
  const [activeTab, setActiveTab] = useState<"milestones" | "stats" | "lessons" | "vision">("milestones");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2 border-b border-white/10 pb-4">
        {["milestones", "stats", "lessons", "vision"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeTab === tab ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
        {activeTab === "milestones" && (
          <MilestonesTab milestones={initialMilestones} />
        )}
        {activeTab === "stats" && <StatsTab stats={initialStats} />}
        {activeTab === "lessons" && <LessonsTab lessons={initialLessons} />}
        {activeTab === "vision" && <VisionTab settings={initialSettings} />}
      </div>
    </div>
  );
}

// --- MILESTONES ---

function MilestonesTab({ milestones }: { milestones: JourneyMilestone[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Milestones</h2>
        <Button onClick={() => setIsCreating(true)} className="bg-lime-500 text-black hover:bg-lime-400">
          <Plus className="w-4 h-4 mr-2" /> Add Milestone
        </Button>
      </div>

      {isCreating && (
        <MilestoneForm onCancel={() => setIsCreating(false)} />
      )}

      <div className="space-y-3 mt-4">
        {milestones.map((m) => (
          <div key={m.id}>
            {editingId === m.id ? (
              <MilestoneForm milestone={m} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-white/20 cursor-grab" />
                  <div>
                    <p className="font-medium text-white">{m.title}</p>
                    <p className="text-sm text-white/50">{m.year} • {m.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(m.id)} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteJourneyMilestoneAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="p-2 hover:bg-red-500/20 rounded-lg text-red-500/60 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
        {milestones.length === 0 && !isCreating && <p className="text-white/50 text-sm">No milestones yet.</p>}
      </div>
    </div>
  );
}

function MilestoneForm({ milestone, onCancel }: { milestone?: JourneyMilestone, onCancel: () => void }) {
  return (
    <form action={async (fd) => { await saveJourneyMilestoneAction(fd); onCancel(); }} className="bg-black/40 p-6 rounded-xl border border-white/10 space-y-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{milestone ? "Edit Milestone" : "New Milestone"}</h3>
        <button type="button" onClick={onCancel} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      {milestone && <input type="hidden" name="id" value={milestone.id} />}
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm text-white/70">Title</label><input required name="title" defaultValue={milestone?.title} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Slug</label><input required name="slug" defaultValue={milestone?.slug} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Year</label><input required name="year" defaultValue={milestone?.year} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Date (optional)</label><input type="date" name="date" defaultValue={milestone?.date ? new Date(milestone.date).toISOString().split('T')[0] : ""} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Category</label><input required name="category" defaultValue={milestone?.category} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div>
          <label className="text-sm text-white/70">Status</label>
          <select name="status" defaultValue={milestone?.status || "Completed"} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white">
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Future">Future</option>
          </select>
        </div>
        <div><label className="text-sm text-white/70">Link URL</label><input type="url" name="linkUrl" defaultValue={milestone?.linkUrl || ""} placeholder="https://..." className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Image URL</label><input name="imageUrl" defaultValue={milestone?.imageUrl || ""} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div className="col-span-2"><label className="text-sm text-white/70">Short Description</label><textarea required name="shortDescription" defaultValue={milestone?.shortDescription} rows={2} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div className="col-span-2"><label className="text-sm text-white/70">Metrics (Optional)</label><textarea name="metrics" defaultValue={milestone?.metrics || ""} rows={2} placeholder="e.g. 20+ Features\nMultiple AI Modules" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div className="col-span-2"><label className="text-sm text-white/70">Long Story</label><textarea required name="longStory" defaultValue={milestone?.longStory} rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-lime-500 text-black hover:bg-lime-400"><Save className="w-4 h-4 mr-2" /> Save</Button>
      </div>
    </form>
  );
}

// --- STATS ---

function StatsTab({ stats }: { stats: JourneyStat[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Stats</h2>
        <Button onClick={() => setIsCreating(true)} className="bg-lime-500 text-black hover:bg-lime-400">
          <Plus className="w-4 h-4 mr-2" /> Add Stat
        </Button>
      </div>

      {isCreating && <StatForm onCancel={() => setIsCreating(false)} />}

      <div className="space-y-3 mt-4">
        {stats.map((s) => (
          <div key={s.id}>
            {editingId === s.id ? (
              <StatForm stat={s} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-white/20 cursor-grab" />
                  <div>
                    <p className="font-medium text-white">{s.value}</p>
                    <p className="text-sm text-white/50">{s.label}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(s.id)} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteJourneyStatAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <button type="submit" className="p-2 hover:bg-red-500/20 rounded-lg text-red-500/60 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
        {stats.length === 0 && !isCreating && <p className="text-white/50 text-sm">No stats yet.</p>}
      </div>
    </div>
  );
}

function StatForm({ stat, onCancel }: { stat?: JourneyStat, onCancel: () => void }) {
  return (
    <form action={async (fd) => { await saveJourneyStatAction(fd); onCancel(); }} className="bg-black/40 p-6 rounded-xl border border-white/10 space-y-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{stat ? "Edit Stat" : "New Stat"}</h3>
        <button type="button" onClick={onCancel} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      {stat && <input type="hidden" name="id" value={stat.id} />}
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm text-white/70">Label</label><input required name="label" defaultValue={stat?.label} placeholder="e.g. Products Built" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Value</label><input required name="value" defaultValue={stat?.value} placeholder="e.g. 4+" className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-lime-500 text-black hover:bg-lime-400"><Save className="w-4 h-4 mr-2" /> Save</Button>
      </div>
    </form>
  );
}

// --- LESSONS ---

function LessonsTab({ lessons }: { lessons: JourneyLesson[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lessons Learned</h2>
        <Button onClick={() => setIsCreating(true)} className="bg-lime-500 text-black hover:bg-lime-400">
          <Plus className="w-4 h-4 mr-2" /> Add Lesson
        </Button>
      </div>

      {isCreating && <LessonForm onCancel={() => setIsCreating(false)} />}

      <div className="space-y-3 mt-4">
        {lessons.map((l) => (
          <div key={l.id}>
            {editingId === l.id ? (
              <LessonForm lesson={l} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-white/20 cursor-grab" />
                  <div>
                    <p className="font-medium text-white">{l.title}</p>
                    <p className="text-sm text-white/50">{l.description.substring(0, 50)}...</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(l.id)} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <form action={deleteJourneyLessonAction}>
                    <input type="hidden" name="id" value={l.id} />
                    <button type="submit" className="p-2 hover:bg-red-500/20 rounded-lg text-red-500/60 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
        {lessons.length === 0 && !isCreating && <p className="text-white/50 text-sm">No lessons yet.</p>}
      </div>
    </div>
  );
}

function LessonForm({ lesson, onCancel }: { lesson?: JourneyLesson, onCancel: () => void }) {
  return (
    <form action={async (fd) => { await saveJourneyLessonAction(fd); onCancel(); }} className="bg-black/40 p-6 rounded-xl border border-white/10 space-y-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{lesson ? "Edit Lesson" : "New Lesson"}</h3>
        <button type="button" onClick={onCancel} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      {lesson && <input type="hidden" name="id" value={lesson.id} />}
      <div className="grid grid-cols-1 gap-4">
        <div><label className="text-sm text-white/70">Title</label><input required name="title" defaultValue={lesson?.title} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
        <div><label className="text-sm text-white/70">Description</label><textarea required name="description" defaultValue={lesson?.description} rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white" /></div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-lime-500 text-black hover:bg-lime-400"><Save className="w-4 h-4 mr-2" /> Save</Button>
      </div>
    </form>
  );
}

// --- VISION ---

function VisionTab({ settings }: { settings: JourneySettings | null }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Future Vision Settings</h2>
      <form action={saveJourneySettingsAction} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <label className="text-sm text-white/70">Vision Title</label>
          <input required name="visionTitle" defaultValue={settings?.visionTitle || "Building products, systems, and AI experiences"} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-lime-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70">Vision Subtitle</label>
          <input required name="visionSubtitle" defaultValue={settings?.visionSubtitle || "that help founders move faster."} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-lime-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70">Vision Description</label>
          <textarea name="visionDescription" defaultValue={settings?.visionDescription || ""} rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-lime-500" />
        </div>
        <Button type="submit" className="bg-lime-500 text-black hover:bg-lime-400">
          <Save className="w-4 h-4 mr-2" /> Save Vision Settings
        </Button>
      </form>
    </div>
  );
}

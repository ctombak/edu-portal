export interface CourseMeta {
  title: string;
  description: string;
  order: number;
  image?: string;
  type?: "training" | "course";
}

export interface Course extends CourseMeta {
  slug: string;
}

export interface TrainingScheduleItem {
  session: string;
  focus: string;
  duration: string;
  startTime?: string;
  type?: "session" | "break";
}

export interface ModuleTopic {
  title: string;
  description: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyInsight: string;
  duration?: string;
  learningObjectives?: string[];
  topics?: ModuleTopic[];
}

export interface TrainingFramework {
  name: string;
  application: string;
}

export interface TrainingPluginModule {
  name: string;
  bestFor: string;
}

export interface TrainingDetail {
  tagline: string;
  duration: string;
  audience: string;
  facilitator: string;
  overview: string;
  stats: string[];
  schedule: TrainingScheduleItem[];
  modules: TrainingModule[];
  frameworks: TrainingFramework[];
  pluginModules: TrainingPluginModule[];
  designHighlights: string[];
  practicePercentage: number;
  facilitatorBio: string;
  logistics: {
    time: string;
    breaks: string;
    format: string;
    materials: string;
  };
}

export interface PluginModuleDetail {
  id: string;
  title: string;
  duration: string;
  purpose: string;
  bestFor: string;
  learningObjectives?: string[];
  keyTopics?: ModuleTopic[];
}

export interface CurriculumSection {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  overview?: string;
  learningObjectives?: string[];
  topics: CurriculumTopic[];
}

export interface CurriculumTopic {
  title: string;
  content: string;
  frameworks?: { name: string; description: string }[];
  keyQuote?: string;
}

export interface CurriculumData {
  title: string;
  subtitle: string;
  totalDuration: string;
  sections: CurriculumSection[];
}

export interface PluginCategory {
  id: string;
  title: string;
  description: string;
  modules: PluginModuleDetail[];
}

export interface PluginsData {
  categories: PluginCategory[];
}

export interface SelectionRow {
  profile: string;
  recommended: string;
  swapOut: string;
}

export interface PriorityRow {
  priority: string;
  module: string;
  why: string;
}

export interface GuideScheduleRow {
  session: string;
  content: string;
  duration: string;
}

export interface TeamGuide {
  id: string;
  title: string;
  description: string;
  priorities: PriorityRow[];
  schedule: GuideScheduleRow[];
  scheduleNote: string;
  altSchedule?: GuideScheduleRow[];
  altTitle?: string;
  altNote?: string;
}

export interface SelectionGuideData {
  intro: string;
  generalTitle: string;
  generalRows: SelectionRow[];
  teams: TeamGuide[];
  discussionTitle: string;
  discussionIntro: string;
  questions: string[];
  decisionMatrixTitle: string;
  decisionMatrixDesc: string;
}

/* ------------------------------------------------------------------ */
/*  Admin / Presentation types                                        */
/* ------------------------------------------------------------------ */

export interface ModuleFrontmatter {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  type: "core" | "plugin";
  learningObjectives?: string[];
}

export interface Slide {
  content: string;
  notes?: string;
  moduleId: string;
  moduleTitle: string;
  index: number;
}

export interface ParsedModule {
  frontmatter: ModuleFrontmatter;
  rawContent: string;
  slides: Slide[];
}

export interface VariantScheduleItem {
  session: string;
  module: string | null;
  duration: string;
  startTime: string;
}

export interface Variant {
  id: string;
  title: string;
  description: string;
  modules: string[];
  schedule: VariantScheduleItem[];
  note?: string;
}

export interface ModuleMeta {
  coreModules: string[];
  pluginModules: string[];
}

import fs from "fs/promises";
import path from "path";
import type { CourseMeta, TrainingDetail, PluginsData, SelectionGuideData, CurriculumData } from "@/types/course";

export async function readCourseMeta(courseDir: string): Promise<CourseMeta> {
  const filePath = path.join(courseDir, "meta.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as CourseMeta;
}

export async function readTrainingDetail(courseDir: string): Promise<TrainingDetail | null> {
  const filePath = path.join(courseDir, "training.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as TrainingDetail;
  } catch {
    return null;
  }
}

export async function readPluginsData(courseDir: string): Promise<PluginsData | null> {
  const filePath = path.join(courseDir, "plugins.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as PluginsData;
  } catch {
    return null;
  }
}

export async function readSelectionGuide(courseDir: string): Promise<SelectionGuideData | null> {
  const filePath = path.join(courseDir, "selection-guide.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as SelectionGuideData;
  } catch {
    return null;
  }
}

export async function readCurriculum(courseDir: string): Promise<CurriculumData | null> {
  const filePath = path.join(courseDir, "curriculum.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as CurriculumData;
  } catch {
    return null;
  }
}

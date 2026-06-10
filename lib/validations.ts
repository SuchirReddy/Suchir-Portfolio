import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const urlPreprocess = z.preprocess((val) => {
  if (typeof val !== "string") return val;
  const trimmed = val.trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}, z.string().url("Must be a valid URL starting with http:// or https://").optional().or(z.literal("")));

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(120),
  slug: z.string().trim().min(2, "Slug must be at least 2 characters").max(140).optional().or(z.literal("")),
  shortDescription: z.string().trim().min(2, "Short description must be at least 2 characters").max(240),
  fullDescription: z.string().trim().min(2, "Full description must be at least 2 characters").max(5000),
  githubUrl: urlPreprocess,
  liveUrl: urlPreprocess,
  featured: z.coerce.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  icon: z.string().optional().default("Code2"),
});

export const journeyMilestoneSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(140),
  slug: z.string().min(1).max(140),
  year: z.string().min(2).max(30),
  date: z.string().optional().or(z.literal("")),
  category: z.string().min(1).max(80),
  shortDescription: z.string().max(300),
  longStory: z.string().max(10000),
  metrics: z.string().max(2000).optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
  status: z.enum(["Completed", "In Progress", "Future"]).default("Completed"),
  linkUrl: z.string().optional().or(z.literal("")),
  displayOrder: z.coerce.number().default(0),
});

export const journeyStatSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(80),
  displayOrder: z.coerce.number().int().default(0),
});

export const journeyLessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(140),
  description: z.string().max(2000),
  displayOrder: z.coerce.number().int().default(0),
});

export const journeySettingsSchema = z.object({
  visionTitle: z.string().max(140),
  visionSubtitle: z.string().max(140),
  visionDescription: z.string().max(2000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  mobile: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(2).max(5000),
});

export const settingsSchema = z.object({
  name: z.string().min(1).max(120),
  profileImage: z.string().optional().or(z.literal("")),
  tagline: z.string().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  resumeUrl: z.string().url().optional().or(z.literal("")),
});

export const imageOrderSchema = z.object({
  projectId: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      displayOrder: z.number().int(),
      isCover: z.boolean().optional(),
    }),
  ),
});

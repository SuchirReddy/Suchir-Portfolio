import { JourneyMilestone, JourneyStat, JourneyLesson, JourneySettings } from "@prisma/client";
import { BuildingInPublic } from "./journey/building-in-public";
import { InteractiveTimeline } from "./journey/interactive-timeline";
import { ProductMilestones } from "./journey/product-milestones";
import { NumbersSection } from "./journey/numbers-section";
import { LessonsLearned } from "./journey/lessons-learned";
import { FutureVision } from "./journey/future-vision";

interface JourneySectionProps {
  milestones: JourneyMilestone[];
  stats: JourneyStat[];
  lessons: JourneyLesson[];
  settings: JourneySettings | null;
}

export function JourneySection({ milestones, stats, lessons, settings }: JourneySectionProps) {
  // Filter product milestones
  const products = milestones.filter(m => 
    m.category.toLowerCase().includes("product") || 
    m.category.toLowerCase().includes("startup") ||
    m.category.toLowerCase().includes("company") ||
    m.category.toLowerCase().includes("platform")
  );

  return (
    <div id="journey" className="flex flex-col bg-transparent">
      <BuildingInPublic />
      <InteractiveTimeline milestones={milestones} />
      <ProductMilestones products={products} />
      <NumbersSection stats={stats} />
      <LessonsLearned lessons={lessons} />
      <FutureVision settings={settings} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// n8n Code Node 2: "Digital Intern Readiness"
//
// Maps OI score to intern readiness level.
// "Digital Intern" = AI agent / automation agent.
// ═══════════════════════════════════════════════════════════════

const score    = $json.operational_intelligence_score;
const maturity = $json.maturity_level;

let internLevel = "";
let internMessage = "";

if (score <= 20) {
  internLevel = "Not Ready for Digital Interns";
  internMessage =
    "Your operations are too unstable for automation to deliver ROI. Focus on strengthening clarity, workflows, and decision structure. Once foundational systems are in place, Digital Interns can operate reliably.";
} else if (score <= 40) {
  internLevel = "Digital Intern Readiness: Level 1";
  internMessage =
    "You have some systems forming, but you still experience inconsistency and bottlenecks. Digital Interns can support low-risk, repetitive tasks. As structure improves, automation can expand.";
} else if (score <= 60) {
  internLevel = "Digital Intern Readiness: Level 2";
  internMessage =
    "Your workflows and delegation are improving. This is the stage where Digital Interns can begin handling structured tasks, routine communications, and operational support to expand your capacity.";
} else if (score <= 80) {
  internLevel = "Digital Intern Readiness: Level 3";
  internMessage =
    "Your systems are stable enough for Digital Interns to handle higher-level execution. Automation will reduce manual work, speed up operations, and increase your team's performance and consistency.";
} else {
  internLevel = "Digital Intern Readiness: Level 4 (Full)";
  internMessage =
    "Your company is fully prepared for Digital Interns to integrate into your operations. You have the structure, stability, and sophistication for automation to multiply efficiency and scale your business without added burnout.";
}

return {
  json: {
    ...$json,
    internLevel,
    internMessage,
  }
};

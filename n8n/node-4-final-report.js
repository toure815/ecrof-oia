// ═══════════════════════════════════════════════════════════════
// n8n Code Node 4: "Final Report"
//
// Assembles the complete report object used by the PDF builder,
// email template, and webhook response.
// ═══════════════════════════════════════════════════════════════

return {
  json: {
    // ────────────────────────────────
    // OPERATIONAL INTELLIGENCE SCORE
    // ────────────────────────────────
    operational_intelligence_score: $json.operational_intelligence_score,
    operational_intelligence_pct:   $json.operational_intelligence_pct,

    // ────────────────────────────────
    // PILLAR SCORES (4 D's, 0–25 each)
    // ────────────────────────────────
    pillars: {
      diagnose: $json.pillar_scores?.diagnose,
      define:   $json.pillar_scores?.define,
      design:   $json.pillar_scores?.design,
      deploy:   $json.pillar_scores?.deploy,
      weakest_pillar: $json.weakest_pillar,
      rankings:       $json.pillar_rankings,
    },

    // ────────────────────────────────
    // DIMENSIONS (12 sub-themes)
    // ────────────────────────────────
    dimensions: $json.dimensions,

    // ────────────────────────────────
    // IDENTITY + MATURITY
    // ────────────────────────────────
    identity_level:            $json.identity_level,
    maturity_level:            $json.maturity_level,
    veos_phase_recommendation: $json.veos_phase_recommendation,

    // ────────────────────────────────
    // SPRINT RECOMMENDATION
    // ────────────────────────────────
    sprint_recommendation: $json.sprint_recommendation,

    // ────────────────────────────────
    // DIGITAL INTERN READINESS
    // ────────────────────────────────
    internLevel:   $json.internLevel,
    internMessage: $json.internMessage,

    // ────────────────────────────────
    // ROI
    // ────────────────────────────────
    roi: {
      hourlyRate:     $json.hourlyRate,
      hoursRecovered: $json.hoursRecovered,
      monthlySavings: $json.monthlySavings,
      yearlySavings:  $json.yearlySavings,
      investmentCost: $json.investmentCost,
      annualROI:      $json.annualROI,
      minROI:         $json.minROI,
    },

    // ────────────────────────────────
    // PERSONAL
    // ────────────────────────────────
    name:    $json.name,
    email:   $json.email,
    company: $json.company,

    // ────────────────────────────────
    // METADATA
    // ────────────────────────────────
    generated_at: new Date().toISOString(),
  }
};

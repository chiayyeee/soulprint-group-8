/**
 * SOULPRINT — Quiz Engine
 * Group A-8 | 11533175 陳菲菲 & 11533178 郭蓮嘉
 */

export class QuizEngine {
  constructor(questions, archetypes) {
    this.questions = questions;
    this.archetypes = archetypes;
    this.archetypeKeys = Object.keys(archetypes);
  }

  /**
   * Calculate scores from an array of selected options
   * @param {Array<{questionId: number, optionId: string}>} userAnswers
   * @returns {Object} Result object with primary archetype, secondary, total scores, and percentages
   */
  calculateResult(userAnswers) {
    const rawScores = {};
    this.archetypeKeys.forEach(key => {
      rawScores[key] = 0;
    });

    userAnswers.forEach(answer => {
      const q = this.questions.find(item => item.id === answer.questionId);
      if (!q) return;
      const opt = q.options.find(o => o.id === answer.optionId);
      if (!opt || !opt.scores) return;

      Object.entries(opt.scores).forEach(([archetypeKey, scoreVal]) => {
        if (rawScores[archetypeKey] !== undefined) {
          rawScores[archetypeKey] += scoreVal;
        }
      });
    });

    // Compute total points distributed
    const totalPoints = Object.values(rawScores).reduce((acc, val) => acc + val, 0) || 1;

    // Compute percentages
    const percentages = {};
    this.archetypeKeys.forEach(key => {
      percentages[key] = Math.round((rawScores[key] / totalPoints) * 100);
    });

    // Rank archetypes by score descending
    // Tie-breaker strategy:
    // 1. Higher primary score
    // 2. Count of questions where user picked an option that awarded points to this archetype
    // 3. Deterministic fallback priority
    const sortedArchetypes = [...this.archetypeKeys].sort((a, b) => {
      const diff = rawScores[b] - rawScores[a];
      if (diff !== 0) return diff;

      // Tie breaker: frequency of selection
      const countA = this.getSelectionFrequency(a, userAnswers);
      const countB = this.getSelectionFrequency(b, userAnswers);
      if (countB !== countA) return countB - countA;

      // Deterministic alphabetical fallback
      return a.localeCompare(b);
    });

    const primaryKey = sortedArchetypes[0];
    const secondaryKey = sortedArchetypes[1];

    return {
      primaryArchetype: this.archetypes[primaryKey],
      secondaryArchetype: this.archetypes[secondaryKey],
      ranking: sortedArchetypes.map(key => ({
        id: key,
        archetype: this.archetypes[key],
        score: rawScores[key],
        percentage: percentages[key]
      })),
      rawScores,
      percentages,
      timestamp: new Date().toISOString()
    };
  }

  getSelectionFrequency(archetypeKey, userAnswers) {
    let count = 0;
    userAnswers.forEach(ans => {
      const q = this.questions.find(item => item.id === ans.questionId);
      if (!q) return;
      const opt = q.options.find(o => o.id === ans.optionId);
      if (opt && opt.scores && opt.scores[archetypeKey]) {
        count += 1;
      }
    });
    return count;
  }

  /**
   * Deterministic test answer presets guaranteed to yield each archetype
   */
  static getPresetAnswers(targetArchetype) {
    switch (targetArchetype) {
      case "daydreamer":
        return [
          { questionId: 1, optionId: "A" },
          { questionId: 2, optionId: "B" },
          { questionId: 3, optionId: "A" },
          { questionId: 4, optionId: "A" },
          { questionId: 5, optionId: "A" },
          { questionId: 6, optionId: "C" },
          { questionId: 7, optionId: "A" }
        ];
      case "observer":
        return [
          { questionId: 1, optionId: "B" },
          { questionId: 2, optionId: "D" },
          { questionId: 3, optionId: "A" },
          { questionId: 4, optionId: "B" },
          { questionId: 5, optionId: "A" },
          { questionId: 6, optionId: "A" },
          { questionId: 7, optionId: "B" }
        ];
      case "collector":
        return [
          { questionId: 1, optionId: "B" },
          { questionId: 2, optionId: "A" },
          { questionId: 3, optionId: "B" },
          { questionId: 4, optionId: "C" },
          { questionId: 5, optionId: "A" },
          { questionId: 6, optionId: "B" },
          { questionId: 7, optionId: "C" }
        ];
      case "explorer":
        return [
          { questionId: 1, optionId: "C" },
          { questionId: 2, optionId: "C" },
          { questionId: 3, optionId: "C" },
          { questionId: 4, optionId: "D" },
          { questionId: 5, optionId: "C" },
          { questionId: 6, optionId: "C" },
          { questionId: 7, optionId: "D" }
        ];
      case "creator":
        return [
          { questionId: 1, optionId: "D" },
          { questionId: 2, optionId: "B" },
          { questionId: 3, optionId: "C" },
          { questionId: 4, optionId: "A" },
          { questionId: 5, optionId: "B" },
          { questionId: 6, optionId: "B" },
          { questionId: 7, optionId: "A" }
        ];
      case "dreamchaser":
        return [
          { questionId: 1, optionId: "D" },
          { questionId: 2, optionId: "D" },
          { questionId: 3, optionId: "D" },
          { questionId: 4, optionId: "D" },
          { questionId: 5, optionId: "D" },
          { questionId: 6, optionId: "D" },
          { questionId: 7, optionId: "D" }
        ];
      default:
        return [];
    }
  }
}

/**
 * SOULPRINT — Local Storage & Persistence Handler
 * Group A-8 | 11533175 陳菲菲 & 11533178 郭蓮嘉
 */

import { INITIAL_QUESTIONS, INITIAL_ARCHETYPES } from './data.js';

const STORAGE_KEYS = {
  QUESTIONS: 'soulprint_questions_v1',
  ARCHETYPES: 'soulprint_archetypes_v1',
  LATEST_RESULT: 'soulprint_latest_result_v1',
  HISTORY: 'soulprint_history_v1',
  THEME_MODE: 'soulprint_theme_v1'
};

export class StorageManager {
  static getQuestions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Storage read error, using initial questions:", e);
    }
    return JSON.parse(JSON.stringify(INITIAL_QUESTIONS));
  }

  static saveQuestions(questions) {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
      return true;
    } catch (e) {
      console.error("Storage write error:", e);
      return false;
    }
  }

  static getArchetypes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARCHETYPES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Storage read error, using initial archetypes:", e);
    }
    return JSON.parse(JSON.stringify(INITIAL_ARCHETYPES));
  }

  static saveArchetypes(archetypes) {
    try {
      localStorage.setItem(STORAGE_KEYS.ARCHETYPES, JSON.stringify(archetypes));
      return true;
    } catch (e) {
      console.error("Storage write error:", e);
      return false;
    }
  }

  static saveLatestResult(result) {
    try {
      localStorage.setItem(STORAGE_KEYS.LATEST_RESULT, JSON.stringify(result));
      
      // Also add to history list (limit 10)
      const history = this.getHistory();
      history.unshift({
        archetypeId: result.primaryArchetype.id,
        archetypeName: result.primaryArchetype.name,
        timestamp: result.timestamp || new Date().toISOString(),
        score: result.ranking[0].score
      });
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 10)));
      return true;
    } catch (e) {
      console.error("Failed to save result:", e);
      return false;
    }
  }

  static getLatestResult() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LATEST_RESULT);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Failed to get latest result:", e);
    }
    return null;
  }

  static getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Failed to read history:", e);
    }
    return [];
  }

  static resetToDefaults() {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
      localStorage.removeItem(STORAGE_KEYS.ARCHETYPES);
      return true;
    } catch (e) {
      console.error("Reset error:", e);
      return false;
    }
  }
}

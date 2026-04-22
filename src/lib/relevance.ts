/**
 * Lightweight relevance helpers for matching related content.
 *
 * Strategy: tokenize each side into a lowercased keyword set, then score
 * candidates by the size of the intersection. Optional weighting lets
 * structured fields (e.g. explicit `tags`) outweigh weaker signals
 * (e.g. words pulled from a title or description).
 *
 * No external deps and no NLP — fast, deterministic, easy to reason about.
 */

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "of", "in", "on", "for", "to", "with", "by",
  "best", "guide", "tips", "complete", "your", "you", "how", "what", "is",
  "are", "from", "at", "as", "this", "that", "into", "about",
]);

/** Normalize a string into a deduped lowercase keyword set. */
export function tokenize(input: string | string[] | undefined | null): Set<string> {
  if (!input) return new Set();
  const raw = Array.isArray(input) ? input.join(" ") : input;
  const out = new Set<string>();
  for (const piece of raw.toLowerCase().split(/[^a-z0-9]+/)) {
    const w = piece.trim();
    if (w.length < 3) continue;
    if (STOP_WORDS.has(w)) continue;
    out.add(w);
  }
  return out;
}

/** Combine multiple weighted keyword groups into a single multiset (term → weight). */
export function buildKeywordWeights(
  groups: { source: string | string[] | undefined | null; weight: number }[]
): Map<string, number> {
  const weights = new Map<string, number>();
  for (const { source, weight } of groups) {
    for (const term of tokenize(source)) {
      weights.set(term, (weights.get(term) ?? 0) + weight);
    }
  }
  return weights;
}

/** Sum of weights for terms that appear in both sides. Higher = more related. */
export function scoreOverlap(
  a: Map<string, number>,
  b: Map<string, number>
): number {
  let score = 0;
  // Iterate the smaller map for speed.
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const [term, w] of small) {
    const other = large.get(term);
    if (other) score += w + other;
  }
  return score;
}

/**
 * Rank `candidates` by relevance to `target`. Candidates with score 0 are
 * excluded. Pass `fallbackIfEmpty` to return the original list (sliced) when
 * nothing matches — useful for "related" rails that should never be empty.
 */
export function rankByRelevance<T>(
  target: Map<string, number>,
  candidates: T[],
  getKeywords: (item: T) => Map<string, number>,
  options: { limit?: number; fallback?: T[] } = {}
): T[] {
  const scored = candidates
    .map((item) => ({ item, score: scoreOverlap(target, getKeywords(item)) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const limit = options.limit ?? scored.length;
  if (scored.length === 0 && options.fallback) {
    return options.fallback.slice(0, limit);
  }
  return scored.slice(0, limit).map((x) => x.item);
}

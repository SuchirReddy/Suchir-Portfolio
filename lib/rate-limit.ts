type Hit = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Hit>();

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const hit = buckets.get(key);

  if (!hit || hit.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (hit.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  hit.count += 1;
  return { allowed: true, remaining: limit - hit.count };
}

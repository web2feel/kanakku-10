export const NICKNAME_MAX = 16
export const NICKNAME_MIN = 2
/** Letters, digits and underscores. The same pattern is enforced in firestore.rules. */
export const NICKNAME_PATTERN = /^[A-Za-z0-9_]+$/

export const NICKNAME_POOL = [
  'pi_pirate',
  'theta_tiger',
  'chalk_ninja',
  'CaptainCosine',
  'kolam_queen',
  'tan_tan_tan',
  'angle_annie',
  'sqrt_sparrow',
  'RightAngleRavi',
  'hypotenuse_hero',
  'MathsMagpie',
  'sinCosTan',
  'protractor_pal',
  'decimal_dosa',
  'radian_rocket',
]

export function nicknameProblem(raw: string): string | null {
  const n = raw.trim()
  if (n.length < NICKNAME_MIN) return `Use at least ${NICKNAME_MIN} characters.`
  if (n.length > NICKNAME_MAX) return `Use at most ${NICKNAME_MAX} characters.`
  if (!NICKNAME_PATTERN.test(n)) return 'Use letters, numbers and _ only. No spaces.'
  return null
}

/** Five suggestions, different each time `seed` changes. */
export function suggestNicknames(seed: number, count = 5): string[] {
  const pool = [...NICKNAME_POOL]
  let s = (seed * 9301 + 49297) % 233280
  for (let i = pool.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}

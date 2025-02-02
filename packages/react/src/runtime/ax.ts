const UNDERSCORE_UNICODE = 95;

/**
 * This length includes the underscore,
 * e.g. `"_1s4A"` would be a valid atomic group hash.
 */
const ATOMIC_GROUP_LENGTH = 5;

/**
 * Joins classes together and ensures atomic declarations of a single group exist.
 * Atomic declarations take the form of `_{group}{value}` (always prefixed with an underscore),
 * where both `group` and `value` are hashes **four characters long**.
 * Class names can be of any length,
 * this function can take both atomic declarations and class names.
 *
 * Input:
 *
 * ```
 * ax(['_aaaabbbb', '_aaaacccc'])
 * ```
 *
 * Output:
 *
 * ```
 * '_aaaacccc'
 * ```
 *
 * @param classes
 */
export default function ax(classNames: (string | undefined | false)[]): string | undefined {
  // short circuit if there's no class names.
  if (classNames.length <= 1 && !classNames[0]) return undefined;

  const atomicGroups: Record<string, string> = {};

  for (let i = 0; i < classNames.length; i++) {
    const cls = classNames[i];
    if (!cls) {
      continue;
    }

    const groups = cls.split(' ');

    for (let x = 0; x < groups.length; x++) {
      const atomic = groups[x];
      const isAtomic = atomic.charCodeAt(0) === UNDERSCORE_UNICODE;
      const isCompressed = isAtomic && atomic.charCodeAt(5) === UNDERSCORE_UNICODE;

      const atomicGroupName = isAtomic ? atomic.slice(0, ATOMIC_GROUP_LENGTH) : atomic;
      atomicGroups[atomicGroupName] = isCompressed ? atomic.slice(ATOMIC_GROUP_LENGTH + 1) : atomic;
    }
  }

  let str = '';

  for (const key in atomicGroups) {
    const value = atomicGroups[key];
    str += value + ' ';
  }

  return str.slice(0, -1);
}

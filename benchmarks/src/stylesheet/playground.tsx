/**
 * Ordered style buckets using their short psuedo name.
 * If changes are needed make sure that it aligns with the definition in `sort-at-rule-pseudos.tsx`.
 */
export const styleBucketOrdering: any[] = [
  // catch-all
  '',
  // link
  'l',
  // visited
  'v',
  // focus-within
  'w',
  // focus
  'f',
  // focus-visible
  'i',
  // hover
  'h',
  // active
  'a',
  // at-rules
  'm',
];

/**
 * Holds all style buckets in memory that have been added to the head.
 */
const styleBucketsInHead: Partial<Record<any, HTMLStyleElement>> = {};

/**
 * Maps the long pseudo name to the short pseudo name.
 * Pseudos that match here will be ordered,
 * everythin else will make their way to the catch all style bucket.
 * We reduce the pseduo name to save bundlesize.
 * Thankfully there aren't any overlaps, see: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes.
 */
const pseudosMap: Record<string, any | undefined> = {
  // link
  k: 'l',
  // visited
  ited: 'v',
  // focus-within
  'us-within': 'w',
  // focus
  us: 'f',
  // focus-visible
  'us-visible': 'i',
  // hover
  er: 'h',
  // active
  ive: 'a',
};

/**
 * Lazily adds a `<style>` bucket to the `<head>`.
 * This will ensure that the style buckets are ordered.
 *
 * @param bucket Bucket to insert in the head.
 */
function lazyAddStyleBucketToHead(bucketName: any, opts: any): HTMLStyleElement {
  if (!styleBucketsInHead[bucketName]) {
    let currentBucketIndex = styleBucketOrdering.indexOf(bucketName) + 1;
    let nextBucketFromCache = null;

    for (; currentBucketIndex < styleBucketOrdering.length; currentBucketIndex++) {
      // Find the next bucket which we will add our new style bucket before.
      const nextBucket = styleBucketsInHead[styleBucketOrdering[currentBucketIndex]];
      if (nextBucket) {
        nextBucketFromCache = nextBucket;
        break;
      }
    }

    const tag = document.createElement('style');
    opts.nonce && tag.setAttribute('nonce', opts.nonce);
    tag.appendChild(document.createTextNode(''));
    styleBucketsInHead[bucketName] = tag;
    document.head.insertBefore(tag, nextBucketFromCache);
  }

  return styleBucketsInHead[bucketName]!;
}

/**
 * Gets the bucket depending on the sheet.
 * This function makes assumptions as to the form of the input class name.
 *
 * Input:
 *
 * ```
 * "._a1234567:hover{ color: red; }"
 * ```
 *
 * Output:
 *
 * ```
 * "h"
 * ```
 *
 * @param sheet styles for which we are getting the bucket
 */
const getStyleBucketName = (sheet: string): any => {
  // We are grouping all the at-rules like @media, @supports etc under `m` bucket.
  if (sheet.charCodeAt(0) === 64 /* "@" */) {
    return 'm';
  }

  /**
   * We assume that classname will always be 9 character long,
   * using this the 10th character could be a pseudo declaration.
   */
  if (sheet.charCodeAt(10) === 58 /* ":" */) {
    // We send through a subset of the string instead of the full pseudo name.
    // For example `"focus-visible"` name would instead of `"us-visible"`.
    // Return a mapped pseudo else the default catch all bucket.
    return pseudosMap[sheet.slice(14, sheet.indexOf('{'))] || '';
  }

  // Return default catch all bucket
  return '';
};

/**
 * Returns a style sheet object that is used to move styles to the head of the application
 * during runtime.
 *
 * @param opts StyleSheetOpts
 * @param inserted Singleton cache for tracking what styles have already been added to the head
 */
export function createStyleSheet(opts: any) {
  return (css: string) => {
    const bucketName = getStyleBucketName(css);
    const style = lazyAddStyleBucketToHead(bucketName, opts);

    if (process.env.NODE_ENV === 'production') {
      const sheet = style.sheet as CSSStyleSheet;
      sheet.insertRule(css, sheet.cssRules.length);
    } else {
      style.appendChild(document.createTextNode(css));
    }
  };
}

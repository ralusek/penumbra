/** Blob cache manager */
export type BlobCacheManager = {
  /** Get Blob cache (list of in-use object URLs) */
  get: () => URL[];
  /** Write to Blob cache */
  set: (cache: URL[] | string[]) => void;
  /** Clear Blob cache */
  clear: () => void;
}

/** Get Blob cache (list of in-use object URLs) */
const blobCache: BlobCacheManager = {
  /** Get Blob cache (list of in-use object URLs) */
  get(): URL[] {
    return JSON.parse(localStorage.blobCache || '[]').map((u: string) => new URL(u));
  },
  /** Write to Blob cache */
  set(cache: URL[] | string[]): void {
    localStorage.blobCache = JSON.stringify(cache);
  },
  /** Clear Blob cache */
  clear(): void {
    this.get().forEach((url: URL) => {
      URL.revokeObjectURL(String(url));
    });
    this.set([]);
  }
};

export default blobCache;

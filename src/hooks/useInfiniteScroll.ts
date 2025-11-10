import { useEffect, useRef } from "react";
import type { UseInfiniteScrollOptions } from "@/types/hooks";

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          !isLoading &&
          !isFetchingRef.current &&
          hasMore
        ) {
          isFetchingRef.current = true;
          onLoadMore();
        }
      },
      { threshold },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, hasMore, onLoadMore, threshold]);

  useEffect(() => {
    if (!isLoading) {
      isFetchingRef.current = false;
    }
  }, [isLoading]);

  return observerRef;
}

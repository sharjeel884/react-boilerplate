import { useEffect, useRef } from "react";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { toast } from "sonner";

export const NetworkStatus = () => {
  const { isOnline, isOffline } = useNetworkStatus();
  const previousStatusRef = useRef<boolean | null>(null);
  const toastIdRef = useRef<string | number | null>(null);

  // Use a ref to track if we've shown the initial status
  const hasShownInitialStatus = useRef(false);

  useEffect(() => {
    // Skip the first render to avoid showing toast on mount
    if (previousStatusRef.current === null) {
      previousStatusRef.current = isOnline;
      hasShownInitialStatus.current = true;
      return;
    }

    // Only show toast if status changed
    if (previousStatusRef.current !== isOnline) {
      // Dismiss previous toast if exists
      if (toastIdRef.current !== null) {
        toast.dismiss(toastIdRef.current);
      }

      if (isOffline) {
        toastIdRef.current = toast.error("You are offline", {
          description: "Please check your internet connection",
          duration: Infinity,
          action: {
            label: "Dismiss",
            onClick: () => {
              if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
                toastIdRef.current = null;
              }
            },
          },
        });
      } else {
        toastIdRef.current = toast.success("You are back online", {
          description: "Your connection has been restored",
          duration: 3000,
        });
      }

      previousStatusRef.current = isOnline;
    }
  }, [isOnline, isOffline]);

  return null;
};


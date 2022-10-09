import { useUI } from "../../lib/contexts/ui-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import nProgress from "nprogress";

export default function MainLayout({ children }) {
  const { loading, setLoading } = useUI();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      nProgress.start();
      setLoading(true);
    };
    const handleStop = () => {
      nProgress.done();
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      {loading && <div className="loading-overlay" />}

      {/* Main  */}
      <main className="h-screen">{children}</main>
    </>
  );
}

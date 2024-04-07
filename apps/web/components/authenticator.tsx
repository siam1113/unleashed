
import { useEffect, useState } from "react";
import Login from "../pages/login";
import ROUTES from "../routes.config";
import { pathMatched } from "../utils/pathMatcher";

export function Authenticator({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null)
  const [isPublicRoute, setIsPublicRoute] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const session = sessionStorage.getItem('userId');
    setSession(session);
    setIsPublicRoute(pathMatched(window.location.pathname, ROUTES.PUBLIC))
  }, [])

  return <>
    {
      session ? children : isPublicRoute ? children : <Login />
    }
  </>
}
export function getSessionId() {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem("cart_session");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("cart_session", sessionId);
  }

  return sessionId;
}

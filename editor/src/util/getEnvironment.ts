export type Environment = "local" | "develop" | "prod";
export function getEnvironment(): Environment {
  if (
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1")
  ) {
    return "local";
  }
  if (
    window.location.hostname.includes("develop") ||
    window.location.hostname.includes("netlify")
  ) {
    return "develop";
  }
  return "prod";
}

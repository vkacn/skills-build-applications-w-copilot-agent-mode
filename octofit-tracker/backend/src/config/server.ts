export const API_PORT = 8000;

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:8000`;
}
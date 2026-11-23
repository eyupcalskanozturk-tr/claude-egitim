import { defineConfig } from '@playwright/test';

const canli = process.env.BASE_URL;

export default defineConfig({
  testDir: 'testler',
  use: {
    baseURL: canli || 'http://localhost:4173',
    viewport: { width: 1920, height: 1080 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: canli ? undefined : {
    command: 'npx http-server . -p 4173 -c-1 -s',
    url: 'http://localhost:4173/package.json',
    reuseExistingServer: true,
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY ?? 'shareallai/familypro';
const [owner, repo] = repository.split('/');
const isUserSiteRepo = repo === `${owner}.github.io`;
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const site = `https://${owner}.github.io`;
const productionBase = isUserSiteRepo ? '/' : `/${repo}`;

export default defineConfig({
  site,
  base: isGitHubActions ? productionBase : '/',
  integrations: [sitemap()],
});

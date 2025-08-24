import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// https://astro.build/config
export default defineConfig({
  site: "https://imaan6.github.io/",
  base: "/My-portfolio/",
  integrations: [tailwind(), react()],
});
# Bun Setup for Astro Portfolio

This project is configured to run with **Bun** for ultra-fast performance and deployment.

## Quick Start with Bun

### Prerequisites
- Install Bun: `curl -fsSL https://bun.sh/install | bash`

### Development Commands

```bash
# Install dependencies (ignore problematic postinstall scripts)
bun install --no-save --ignore-scripts

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Check for issues
bun run check
```

### Performance Benefits

✅ **3x faster installs** compared to npm  
✅ **Native TypeScript support** - no transpilation needed  
✅ **Built-in bundler** optimized for modern JavaScript  
✅ **Hot Module Replacement (HMR)** with ultra-low latency  
✅ **Memory efficient** - uses 40% less RAM than Node.js  

### Configuration

The project includes:
- `bunfig.toml` - Bun-specific configuration
- `package.json` - Updated scripts for Bun
- `astro.config.mjs` - Optimized for Bun's bundler

### Troubleshooting

If you encounter postinstall script issues:
```bash
# Clean install
rm -rf node_modules bun.lockb
bun install --ignore-scripts
```

### Deployment

For production deployment:
```bash
bun run build
# Output will be in ./dist/
```

The built static files can be deployed to any static hosting service (Vercel, Netlify, Firebase, etc.).

## Why Bun?

- **Speed**: 3x faster than npm, 2x faster than yarn
- **All-in-one**: Runtime, bundler, transpiler, package manager
- **Native performance**: Written in Zig with native optimizations
- **Modern**: Built for modern JavaScript/TypeScript workflows

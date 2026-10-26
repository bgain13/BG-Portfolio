---
name: Orval and Zod compatibility
description: Keep generated Zod schemas compatible with the workspace's installed Zod major version.
---

Orval must be configured to generate schemas for the same Zod major version used by the shared libraries. In this workspace, Zod 3 is installed, so generation must explicitly target Zod 3 rather than accepting Orval's newer default.

**Why:** Generated Zod 4 APIs do not typecheck against the workspace's Zod 3 package.

**How to apply:** When changing Orval configuration or upgrading Zod, verify generated schemas and the installed Zod version together.

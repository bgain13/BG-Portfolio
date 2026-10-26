import type { Request, Response } from 'express';

export function isAdmin(req: Request): boolean {
  if (!req.isAuthenticated()) return false;

  const allowlist = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return Boolean(
    req.user?.email && allowlist.includes(req.user.email.toLowerCase()),
  );
}

export function requireAdmin(req: Request, res: Response): boolean {
  if (!isAdmin(req)) {
    const authenticated = req.isAuthenticated();
    res.status(authenticated ? 403 : 401).json({
      error: authenticated ? 'Admin access required' : 'Unauthorized',
    });
    return false;
  }

  return true;
}

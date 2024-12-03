# Deployment Procedures

## Prerequisites
- Vercel CLI installed (`npm i -g vercel`)
- Access to Vercel project
- Environment variables configured in Vercel dashboard

## Staging Deployment
1. Push changes to staging branch
2. Run tests: `npm run test:staging`
3. Deploy to staging: `npm run deploy:staging`
4. Verify staging deployment at staging URL
5. Run E2E tests against staging environment

## Production Deployment
1. Merge staging to main branch
2. Run production tests: `npm run test`
3. Deploy to production: `npm run deploy:production`
4. Verify production deployment

## Rollback Procedures
1. Via Vercel Dashboard:
   - Go to project deployments
   - Find last working deployment
   - Click "..." -> "Promote to Production"

2. Via CLI:
   ```bash
   vercel ls your-project-name
   vercel promote deployment-url
   ```

## Backup Procedures
- Database backups handled by backend team
- Vercel automatically maintains deployment history
- Environment variables backed up in password manager
- Code backed up in Git repository

## SSL Certificates
- Managed automatically by Vercel
- Custom domains can be added in Vercel dashboard
- SSL renewal is automatic

## Monitoring
- Sentry for error tracking
- Vercel Analytics for performance monitoring
- Custom logging in application 
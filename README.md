# KNANA POWER LEARNING HUB - Hosting Setup Guide

## Website Overview
A professional vocational training platform with 2 learning levels, 44 chapters, and comprehensive course materials.

## File Structure for Hosting

```
/public_html/  (or your web root)
├── index.html                  ← Entry point (redirects to index_en.html)
├── index_en.html              ← Main homepage
├── chapters_level1.html       ← List of Level 1 courses
├── chapters_level2.html       ← List of Level 2 courses
├── about.html                 ← Company information
│
├── assets/
│   ├── css/
│   │   └── style.css          ← Main stylesheet
│   ├── js/
│   │   └── app.js             ← JavaScript functionality
│   └── images/
│       ├── Basic Computer Knowledge eng and sw level i.PNG
│       ├── Basic Computer Knowledge eng and sw level ii.PNG
│       └── Basic Computer Knowledge eng and sw level iii.PNG
│
├── chapters/
│   ├── 1.html
│   ├── 2.html
│   └── ... (3 through 24)
│
├── chapters_level2/
│   ├── 1.html
│   ├── 2.html
│   └── ... (3 through 20)
│
├── downloads/
│   ├── answer-keys/
│   └── worksheets/
│
├── teacher-guide/
└── docs/
    └── README.md              ← This file
```

## Hosting Requirements

### Minimum Requirements
- **PHP**: 5.6+ (for basic server compatibility)
- **SSL**: HTTPS recommended
- **Storage**: 500 MB minimum
- **Bandwidth**: 5 GB minimum
- **Email**: Optional

### Recommended Providers
1. **Bluehost** - Easy WordPress integration
2. **SiteGround** - Great performance
3. **Hostinger** - Budget-friendly
4. **HostGator** - Good support
5. **DreamHost** - Developer-friendly

## Deployment Steps

### 1. Upload Files
- Connect via FTP/SFTP
- Upload all files to your `public_html/` folder
- Maintain the exact folder structure

### 2. File Permissions
- HTML files: 644 (rw-r--r--)
- Directories: 755 (rwxr-xr-x)
- No special permissions needed for static site

### 3. DNS Configuration
Point your domain to the hosting server:
- Update DNS records with your hosting provider
- Wait 24-48 hours for propagation
- Test with: `nslookup yourdomain.com`

### 4. SSL Certificate
- Use Let's Encrypt (free) if available
- Enable HTTPS in hosting control panel
- Update all links to use HTTPS

### 5. Test the Website
- Visit `https://yourdomain.com`
- Test all navigation links:
  - Home → Level 1, Level 2, About
  - Level 1 → Level 2, About, Home
  - Level 2 → Level 1, About, Home
  - About → Home, Level 1
- Test all chapter links
- Verify images load correctly
- Test responsive design on mobile

## Important URLs After Hosting

- **Homepage**: https://yourdomain.com/
- **Level 1**: https://yourdomain.com/level1_chapters.html
- **Level 2**: https://yourdomain.com/chapters_level2.html
- **About**: https://yourdomain.com/about.html
- **Chapters Level 1**: https://yourdomain.com/chapters/chapter-1.html
- **Chapters Level 2**: https://yourdomain.com/chapters-level2/chapter-1.html

## Server Configuration Notes

### Apache (.htaccess)
The `.htaccess` file is already configured with:
- GZIP compression for faster loading
- Browser caching for improved performance
- UTF-8 character encoding

### Nginx
If using Nginx, equivalent configuration:
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/javascript;
```

## Maintenance

### Regular Tasks
1. Check all links monthly
2. Monitor server performance
3. Update SSL certificates
4. Backup website monthly
5. Monitor download folder access logs

### Adding New Content
1. Add new chapter HTML files to `/chapters/` folder
2. Update navigation links in existing pages
3. Upload associated resources to `/downloads/`
4. Test all links before publishing

## Performance Optimization

Already Configured:
✓ Responsive design (mobile-friendly)
✓ Optimized images (PNG format)
✓ Minified CSS and inline styling
✓ GZIP compression enabled
✓ Browser caching configured

## Security Checklist

- [x] No database required (static site)
- [x] No user authentication needed
- [x] HTTPS enabled
- [x] File permissions set correctly
- [x] Backups scheduled
- [x] No sensitive data exposed

## Support & Troubleshooting

### Common Issues

**1. Broken links**
- Check file paths match exactly
- Verify all links use correct HTML file names
- Test in browser console (F12)

**2. Images not loading**
- Verify `assets/images/` folder exists
- Check image file names match exactly
- Ensure image permissions are 644

**3. CSS not applying**
- Check `assets/css/style.css` path
- Verify stylesheet link in HTML headers
- Clear browser cache (Ctrl+Shift+Delete)

**4. Navigation broken**
- Test all inter-page links
- Verify href attributes point to correct pages
- Check for typos in file names

## Contact & Support

**Platform**: KNANA POWER LEARNING HUB
**Company**: The One Tech Services
**Version**: 1.0.0
**Last Updated**: January 2026

---

**Note**: This is a static website with no backend. All content is HTML/CSS/JavaScript. No database or server-side processing required.

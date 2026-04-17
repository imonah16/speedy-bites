export default function robots() {
    return {
        rules: [{
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/', '/admin/'],
        }, ],
        sitemap: 'https://speedy-bites.onrender.com/sitemap.xml',
    };
}
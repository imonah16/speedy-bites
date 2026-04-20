export default function robots() {
    const baseUrl = 'https://speedy-bites-vads.onrender.com';

    return {
        rules: [{
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/', '/admin/'],
        }, ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
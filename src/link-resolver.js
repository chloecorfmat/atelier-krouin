export default function (doc) {
    // Return the path depending on Prismic Document's type

    // If it's a Single Custom Type with the API ID of "home"
    if (doc.type === 'homepage') {
        return '/';
    }

    // If it is a Repeatable Custom Type with the API ID of "articles" (must contain a slug field)
    if (doc.type === 'article') {
        return '/articles/' + doc.slug;
    }

    // Default to the root
    return '/';
};

import contentful from 'contentful-management';

const CMA_TOKEN = process.env.CONTENTFUL_CMA_TOKEN;
const SPACE_ID = 'jmknojkteiuy';
const ENVIRONMENT = 'master';

if (!CMA_TOKEN) {
  console.error('Missing CONTENTFUL_CMA_TOKEN environment variable');
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: CMA_TOKEN,
});

async function seedLandingPage(environment, entryId, data) {
  console.log(`Checking for Landing Page with ID: ${entryId}...`);

  const entries = await environment.getEntries({
    content_type: 'landinPage',
    'fields.entryId': entryId,
    limit: 1,
  });

  let entry;

  if (entries.items.length > 0) {
    // Update existing entry
    console.log(`Entry "${entryId}" exists, updating...`);
    entry = entries.items[0];
    entry.fields.title = { 'en-US': data.title };
    entry = await entry.update();
  } else {
    // Create new entry
    console.log(`Creating new entry "${entryId}"...`);
    entry = await environment.createEntry('landinPage', {
      fields: {
        entryId: { 'en-US': entryId },
        title: { 'en-US': data.title },
      },
    });
  }

  console.log('Publishing entry...');
  await entry.publish();
  console.log(`Done! Entry "${entryId}" published.`);
}

async function seedBlogPost(environment, slug, data) {
  console.log(`Checking for Blog Post with slug: ${slug}...`);

  const entries = await environment.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  let entry;

  if (entries.items.length > 0) {
    // Update existing entry
    console.log(`Blog post "${slug}" exists, updating...`);
    entry = entries.items[0];
    entry.fields.title = { 'en-US': data.title };
    entry.fields.excerpt = { 'en-US': data.excerpt };
    entry.fields.content = { 'en-US': data.content };
    entry.fields.author = { 'en-US': data.author };
    entry.fields.publishDate = { 'en-US': data.publishDate };
    if (data.tags) entry.fields.tags = { 'en-US': data.tags };
    entry = await entry.update();
  } else {
    // Create new entry
    console.log(`Creating new blog post "${slug}"...`);
    entry = await environment.createEntry('blogPost', {
      fields: {
        slug: { 'en-US': slug },
        title: { 'en-US': data.title },
        excerpt: { 'en-US': data.excerpt },
        content: { 'en-US': data.content },
        author: { 'en-US': data.author },
        publishDate: { 'en-US': data.publishDate },
        tags: { 'en-US': data.tags || [] },
      },
    });
  }

  console.log('Publishing entry...');
  await entry.publish();
  console.log(`Done! Blog post "${slug}" published.`);
}

async function seed() {
  console.log('Connecting to Contentful...');
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT);

  // Seed Landing Page
  await seedLandingPage(environment, 'main-landing-page', {
    title: 'Dedicated lanes for your payments',
  });

  // Example: Seed Blog Posts (uncomment when blogPost content type exists)
  // await seedBlogPost(environment, 'hello-world', {
  //   title: 'Hello World',
  //   excerpt: 'My first blog post',
  //   content: {
  //     nodeType: 'document',
  //     data: {},
  //     content: [
  //       {
  //         nodeType: 'paragraph',
  //         data: {},
  //         content: [
  //           {
  //             nodeType: 'text',
  //             value: 'This is my first blog post!',
  //             marks: [],
  //             data: {}
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   author: 'John Doe',
  //   publishDate: '2024-01-01',
  //   tags: ['news', 'announcement']
  // });

  console.log('\nAll content seeded successfully!');
}

seed().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

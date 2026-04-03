const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchStrapi(path, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/api/${path}${qs ? `?${qs}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi fetch error: ${res.status} ${url}`);
  const json = await res.json();
  return json.data;
}

export async function getAnimals(filters = {}) {
  return fetchStrapi('animals', {
    populate: 'photo',
    'filters[available][$eq]': 'true',
    ...filters,
  });
}

export async function getAnimalBySlug(slug) {
  const data = await fetchStrapi('animals', {
    populate: 'photo',
    'filters[slug][$eq]': slug,
  });
  return data?.[0] ?? null;
}

export async function getBlogPosts() {
  return fetchStrapi('blog-posts', {
    populate: 'coverImage',
    sort: 'publishedAt:desc',
  });
}

export async function getBlogPostBySlug(slug) {
  const data = await fetchStrapi('blog-posts', {
    populate: 'coverImage',
    'filters[slug][$eq]': slug,
  });
  return data?.[0] ?? null;
}

export async function getTeamMembers() {
  return fetchStrapi('team-members', {
    populate: 'avatar',
    sort: 'order:asc',
  });
}

export async function getVolunteerRoles() {
  return fetchStrapi('volunteer-roles');
}

export async function getAdoptionSteps() {
  return fetchStrapi('adoption-steps', { sort: 'number:asc' });
}

export async function getPageHero(page) {
  const data = await fetchStrapi('page-heroes', {
    'filters[page][$eq]': page,
  });
  return data?.[0] ?? null;
}

export async function getStats() {
  return fetchStrapi('stats', { sort: 'order:asc' });
}

export async function getSiteSettings() {
  return fetchStrapi('site-setting');
}

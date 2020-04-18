/** Sample Program object
{
  id: "900bc451-e61f-48db-96c7-32b6635a3f75",
  slug: "the-shawshank-redemption-1994",
  content_type: "m",
  title: "The Shawshank Redemption",
  overview:
    "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
  availability_pros:
    "Available to stream on a popular subscription service (Netflix). Available to rent or buy from $3.99 on 6 services (iTunes, Google Play, Prime Video & 3 others).",
  imdb_rating: 9.3,
  rt_critics_rating: 90,
  rg_content_score: 100,
  has_poster: true,
  has_backdrop: true,
  released_on: "1994-09-23T00:00:00",
  classification: "18+",
  sources: ["netflix"],
  genres: [10, 3],
  on_services: false,
  on_free: false,
  on_rent_purchase: true,
  user_rating: null,
  tracking: false,
  watchlisted: false,
  seen: false,
  season_count: 0,
  featured_services: [],
  episode_source_count: 0,
}
*/

const transformProgram = ({ slug, title }) => ({
  title: slug,
  description: title,
});

export { transformProgram };

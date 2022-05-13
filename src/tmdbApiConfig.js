const tmdbApiConfig = {
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "05cc8b53c101d38506e253afc1348aee",
    page: 1,
    include_adult: false,
    language: "en-US",
    "vote_count.gte": 30,
    sort_by: "release_date.desc",
    include_video: true,
  },
};

export default tmdbApiConfig;

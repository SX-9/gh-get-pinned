import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET'],
}));

app.get('/:username', async (req, res) => {
  const { username } = req.params;
  
  const query = `
  query {
    user(login: "${username}") {
      pinnedItems(first: 5, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            url
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
  `;
  
  const raw = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({ query }),
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_TOKEN,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then(res => res.json());
  if (!raw?.errors) console.log(">> " + username);

  const repos = raw?.data?.user?.pinnedItems?.nodes?.map((r) => ({
    name: r.name,
    desc: r.description,
    stars: r.stargazerCount,
    link: r.url,
    lang: r.primaryLanguage,
  }));
  const err = raw?.errors?.map((e) => ({
    err: e.type,
    msg: e.message,
  }));
  res.status(raw?.errors ? 400 : 200).send(repos || err);
});

app.get('/', (req, res) => res.json({
  usage: '/:username',
  source: 'https://github.com/SX-9/gh-get-pinned',
}));

app.listen(process.env.PORT, () => {
  console.log('++ OK 3000');
});

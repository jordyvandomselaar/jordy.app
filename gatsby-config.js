module.exports = {
  siteMetadata: {
    title: `Jordy's blog`,
    name: `jordy.app`,
    siteUrl: `https://jordy.app`,
    description: `Jordy van Domselaar's blog`,
    hero: {
      heading: `Welcome to my blog. Here I write about things I like.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/Jordy_vD_`,
      },
      {
        name: `github`,
        url: `https://github.com/jordyvandomselaar`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/jordyvdomselaar/`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/jordy%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-van-domselaar-066819b5/`,
      }
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-QZRBSN2E1F"
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
        },
      },
    },
  ],
};

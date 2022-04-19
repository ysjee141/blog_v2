module.exports = {
  siteMetadata: {
    title: {
      text: `happl's Doodle`,
      subTitle: `심심해서 끄적거리는 낙서장`,
    },
    author: {
      name: `YOONSEONG JI`,
      summary: `개발을 좋아하는 천생 개발자이고 싶은 개발자`,
      image: "../assets/images/profile.jpg"
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: [
      {
        name: 'email',
        url: `mailto:ysjee141@gmail.com`,
        icon: 'faEnvelopeSquare'
      },
      {
        name: 'github',
        url: `https://github.com/ysjee141`,
        icon: 'faGithub'
      },
      {
        name: 'instagram',
        url: `https://instagram.com/ysjee141`,
        icon: 'faInstagram'
      }
    ],
    career: [
      {
        name: "삼일데이터시스템",
        url: "http://sids.co.kr/",
        dept: "FA 1팀",
        date: {
          from: "2001. 12",
          to: "2003. 01"
        },
        grade: "사원",
        job: "공장자동화(PLC/HMI) 개발"
      },
      {
        name: "디지털메이트",
        url: "http://www.digitalmate.co.kr/",
        dept: "사용성 QA",
        date: {
          from: "2005. 08",
          to: "2009. 02"
        },
        grade: "사원",
        job: "Software Testing"
      },
      {
        name: "케이인포넷",
        dept: "웹솔루션개발팀",
        date: {
          from: "2009. 10",
          to: "2012. 03"
        },
        grade: "대리",
        job: "입시 정보 시스템 개발"
      },
      {
        name: "(주)굿센",
        url: "http://www.goodcen.com",
        dept: "기술연구소",
        date: {
          from: "2012. 04",
          to: "2018. 10"
        },
        grade: "과장",
        job: "아키텍트 / 메일 솔루션 개발"
      },
      {
        name: "코비젼",
        url: "https://www.covision.co.kr/",
        dept: "기술연구소 연구 4팀",
        date: {
          from: "2018. 11",
          to: "2019. 11"
        },
        grade: "팀장",
        job: "아키텍트 / 메일 솔루션 개발"
      },
      {
        name: "타이드스퀘어",
        url: "http://www.tidesquare.com/",
        dept: "항공플랫폼실",
        date: {
          from: "2020. 02",
          to: "2021. 02"
        },
        grade: "차장",
        job: "Back Office Product Manager"
      },
      {
        name: "주식회사 인터파크",
        url: "https://www.interpark.com",
        dept: "프론엔드개발실 투어티켓웹개발팀",
        date: {
          from: "2020. 03"
        },
        grade: "차장",
        job: "인터파크 티켓 프론트엔드 개발"
      }
    ],
    skill: [
      {
        category: 'server',
        name: 'java',
        score: '80'
      }
    ]
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "dracula",
              lineNumbers: true
            },
          }
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title {
                  text
                  subTitle                
                }
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

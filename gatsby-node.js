const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  const listResult = await graphql(
    `
    {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                date
                description
                tags
                refs
              }
              excerpt
            }
          }
          pageInfo {
            currentPage
            hasNextPage
            hasPreviousPage
            pageCount
            perPage
            totalCount
          }
        }
      }    
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  const edges = listResult.data.allMarkdownRemark.edges
  const postsPerPage = 10
  const numPages = Math.ceil(edges.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/list` : `/list/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        filter: {}
      },
    })
  })

  const categoryMap = new Map();
  const tagMap = new Map();

  edges.forEach(p => {
    const category = p.node.frontmatter.category || "NoCategory";
    const categoryObject = categoryMap.get(category) || [];
    categoryObject.push(p)
    categoryMap.set(category, categoryObject)

    const tags = p.node.frontmatter.tags || [];
    tags.filter(t => t !== '').forEach(t => {
      const tagObject = tagMap.get(t) || []
      tagObject.push(p)
      tagMap.set(t, tagObject)
    })
  })

  categoryMap.forEach((value, c) => {
    const numPages = Math.ceil(value.length / postsPerPage);
    Array.from({length: numPages}).forEach((_, i) => {
      const prefix = c === undefined ? 'NoCategory' : c;
      createPage({
        path: i === 0 ? `/category/${prefix}` : `/category/${prefix}/${i+1}`,
        component: path.resolve("./src/templates/blog-list-template.js"),
        context: {
          info: {
            type: 'category',
            value: c
          },
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          filter: {
            frontmatter: {
              category: {
                eq: c
              }
            }
          }
        },
      })
    })
  })

  tagMap.forEach((value, c) => {
    const numPages = Math.ceil(value.length / postsPerPage);
    Array.from({length: numPages}).forEach((_, i) => {
      const prefix = c === undefined ? 'NoTag' : c;
      createPage({
        path: i === 0 ? `/tag/${prefix}` : `/tag/${prefix}/${i+1}`,
        component: path.resolve("./src/templates/blog-list-template.js"),
        context: {
          info: {
            type: 'tag',
            value: c
          },
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          filter: {
            frontmatter: {
              tags: {
                in: c
              }
            }
          }
        },
      })
    })
  })

  createPage({
    path: '/about',
    component: path.resolve("./src/templates/about-template.js"),
    context: {

    }
  })

  createPage({
    path: '/repos',
    component: path.resolve("./src/templates/repo-template.js"),
    context: {

    }
  })

  createPage({
    path: '/tags',
    component: path.resolve("./src/templates/tag-template.js"),
    context: {
      filter: {}
    }
  })


}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error

  createFieldExtension({
    name: "category",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          return source.category || "NoCategory"
        },
      }
    },
  })

  createFieldExtension({
    name: "tags",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          return source.tags || ['']
        },
      }
    },
  })

  createTypes(`
    type SiteSiteMetadata {
      title: Title
      author: Author
      siteUrl: String
      social: [Social]
      career: [Career]
      skill: [Skill]
    }
    
    type Skill {
      category: String
      name: String
      score: Int
    }
    
    type Career {
      name: String
      dept: String
      date: CareerDate
      grade: String
      job: String
    }
    
    type CareerDate {
      from: String
      to: String
    }
    
    type Title {
      text: String
      subTitle: String
    }

    type Author {
      name: String
      summary: String
      image: String
    }

    type Social {
      name: String
      url: String
      icon: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      category: String! @category
      tags: [String]
      published: Boolean
      refs: [String]
    }

    type Fields {
      slug: String
    }
  `)
}

import * as React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Bio from "../components/bio";

const AboutTemplate = ({data, location, pageContext}) => {
  const siteTitle = data.site.siteMetadata?.title || "title"
  const careers = data.site.siteMetadata?.career || []
  const skills = data.site.siteMetadata?.skill || []
  let cross = true;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About me..."/>
      <section className="contents__wrapper" style={{width: "100%", padding: 0}}>
        <Bio type={'about'}/>
        <br/>
        <div className="about__section">
          <div className="about__section__career">
            <div className="category__sub-title">
              Career
            </div>
            <div className={'is-divider'}/>
            {careers && (
              <ul className="career">
                {[...careers].reverse().map(career => {
                  cross = !cross;
                  return (
                    <li key={`careers-${career.name}`}>
                      <div className={`career-item-icon ${cross && 'right'}`}>
                        <FontAwesomeIcon icon={faPlusSquare}/>
                      </div>
                      <div className={`career-item ${cross && 'right'}`}>
                        <p className="career-company">
                          <a href={career.url} target="_blank" rel={'noreferrer'}>{career.name}</a>
                          <span>{career.dept}</span>
                        </p>
                        {career.job}
                      </div>
                      <div className={`career-item-secondary ${cross && 'right'}`}>
                        <p>{career.date.from} ~
                          {career.date.to}</p>
                        <p className="career-job">{career.grade}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className="about__section__skill">
            <div className="category__sub-title">
              Skill Tree
            </div>
            <div className={'is-divider'}/>
            {skills && (
              <ul>
                {skills.map(skill => (
                  <li key={`skill-${skill.name}`}>{skill.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </section>
    </Layout>
  )
}

export default AboutTemplate

export const pageQuery = graphql`
  query aboutListQuery {
    site {
      siteMetadata {
        title {
          text
          subTitle
        }
        career {
          name,
          url,
          dept,
          date {
            from
            to
          }
          grade
          job
        }
        skill {
          category
          name
          score
        }
      }
    }
  }
`

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "./img"

import styles from "./services.module.scss"
import Section from "./section"

const Services = () => {
    const data = useStaticQuery<GatsbyTypes.ServicesQuery>(graphql`
        fragment Service on MarkdownRemark {
            id
            frontmatter {
                title
                time
                mainImage {
                    childImageSharp {
                        fluid(
                            maxWidth: 1000
                            sizes: "(max-width: 950px) 100vw, 40vw"
                        ) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            html
        }
        query Services {
            am: markdownRemark(
                fileAbsolutePath: { regex: "/services/morning.md$/" }
            ) {
                ...Service
            }
            pm: markdownRemark(
                fileAbsolutePath: { regex: "/services/evening.md$/" }
            ) {
                ...Service
            }
        }
    `)
    return (
        <Section id="services" colorScheme="dark">
            <div className={styles.servicesSection}>
                <h1 className={styles.heading}>Our Sunday Services</h1>
                <div className={styles.serviceNotes}>
                    <p>adsfasdfasdfasdf asdf asdf asdf asdfasdf</p>
                </div>
                <div className={styles.services}>
                    {[data.am, data.pm].map(service => {
                        if (service == null) {
                            throw new Error("Impossible")
                        }

                        return (
                            <div key={service.id} className={styles.service}>
                                <div className={styles.image}>
                                    <Img
                                        fluid={
                                            service.frontmatter!.mainImage!
                                                .childImageSharp!.fluid
                                        }
                                    />
                                </div>
                                <div className={styles.title}>
                                    {service.frontmatter!.title}
                                </div>
                                <div className={styles.time}>
                                    {service.frontmatter!.time}
                                </div>
                                <div className={styles.streamLinks}></div>
                                <div
                                    className={styles.info}
                                    dangerouslySetInnerHTML={{
                                        __html: service.html!,
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}

export default Services

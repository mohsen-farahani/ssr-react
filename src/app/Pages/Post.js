import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Post extends Component {
    constructor(props) {
        super(props)

        let repos
        if (__isBrowser__) {
            repos = window.__INITIAL_DATA__
            delete window.__INITIAL_DATA__
        } else {
            repos = this.props.staticContext.data
        }

        this.state = {
            repos,
            loading: repos ? false : true,
        }

        this.fetchRepos = this.fetchRepos.bind(this)
    }
    componentDidMount() {
        if (!this.state.repos) {
            this.fetchRepos(this.props.match.params.id)


        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchRepos(this.props.match.params.id)
        }
    }
    fetchRepos(lang) {
        this.setState(() => ({
            loading: true
        }))

        this.props.fetchInitialData(lang)
            .then((repos) => this.setState(() => ({
                repos,
                loading: false,
            })))
    }
    htmlParserTransform(node, index) {
        if (node.name === "script") {
            const { type } = node.attribs
            const { children } = node

            const result = (
                <script type={type} dangerouslySetInnerHTML={
                    {
                        __html: `${children[0].data}`
                    }
                }
                />
            )

            return result
        }
    }

    render() {
        const { loading, repos } = this.state

        if (loading === true) {
            return <p>LOADING</p>
        }

        return (
            <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Helmet>
                    <title>{repos.title}</title>
                    {ReactHtmlParser(repos.meta)}
                </Helmet>

                <img src={repos.img} />
                <h1>{repos.caption}</h1>
            </ul>
        )
    }
}

export default Post

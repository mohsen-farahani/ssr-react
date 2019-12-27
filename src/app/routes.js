import Home from './Home'
import Grid from './Grid'
import { fetchPopularRepos, fetchPost } from './Helpers/api'
import Post from './Pages/Post'

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/popular/:id',
        component: Grid,
        fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
    },
    {
        path: '/post/:id',
        component: Post,
        fetchInitialData: (path = '') => fetchPost(path.split('/').pop())
    }
]

export default routes
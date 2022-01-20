import { useContext } from "react"
import AddComment from "../components/AddComment"
import AllPosts from "../components/AllPosts"
import NavbarHome from "../components/NavbarHome"
import NewPost from "../components/NewPost"
import SideBar from "../components/SideBar"
import PostsContext from "../utils/PostsContext"



export default function Home(props) {
    const { postId } = props
    const { posts } = useContext(PostsContext)
    const post = posts.find(post => post._id === postId)
    return (

        <>
            <NavbarHome />
            <SideBar />
            <NewPost />
            <AllPosts />

        </>
    )
}


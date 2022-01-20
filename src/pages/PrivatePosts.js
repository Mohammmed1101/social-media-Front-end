import { useContext } from "react"
import AllPrivatePosts from "../components/AllPrivatePosts"
import NavbarHome from "../components/NavbarHome"
import NewPost from "../components/NewPost"
import SideBar from "../components/SideBar"
import PostsContext from "../utils/PostsContext"



export default function PrivatePost(props) {
    const { postId } = props
    const { posts  } = useContext(PostsContext)
   
    return (

        <>
            <NavbarHome />
            <SideBar />
            <NewPost />
            <AllPrivatePosts />

        </>
    )
}


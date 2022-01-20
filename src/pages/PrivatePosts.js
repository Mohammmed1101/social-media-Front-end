import { useContext } from "react"
import AllPrivatePosts from "../components/AllPrivatePosts"
import NavbarHome from "../components/NavbarHome"
import NewPrivatePost from "../components/NewPrivatePost"
import SideBar from "../components/SideBar"
import PostsContext from "../utils/PostsContext"



export default function PrivatePost(props) {
    const { postId } = props
    const { posts  } = useContext(PostsContext)
   
    return (

        <>
            <NavbarHome />
            <SideBar />
            <NewPrivatePost />
            <AllPrivatePosts />

        </>
    )
}


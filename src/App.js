import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios';
import PostsContext from "./utils/PostsContext"
import Signup from './pages/Signup'
import Login from './pages/Login'
import EmailVerified from './pages/EmailVerified'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile'
import OnePost from './pages/OnePost';
import { toast, ToastContainer } from 'react-toastify';
import Message from './pages/Message';
import DirectMessage from "./pages/DirectMessage"
import PrivatePost from './pages/PrivatePosts';

export default function App() {
  const navigate = useNavigate()
  const [errorSignUp, setErrorSignUp] = useState(null)
  const [errorLogin, setErrorLogin] = useState(null)
  const [errorResetPassword, setErrorResetPassword] = useState(null)
  const [errorForgetPassword, setErrorForgetPassword] = useState(null)
  const [successForgetPassword, setSuccessForgetPassword] = useState(null)
  const [errorSendMessage, setErrorSendMessage] = useState(null)
  const [profile, setProfile] = useState(null)
  const [follow, setFollow] = useState(null)
  const [unFollow, setUnFollow] = useState(null)
  const [request, setRequest] = useState(null)
  const [errorRequest, setErrorRequest] = useState(null)
  const [requestAccept, setRequestAccept] = useState(null)
  const [errorRequestAccept, setErrorRequestAccept] = useState(null)
  const [requestReject, setRequestReject] = useState(null)
  const [errorRequestReject, setErrorRequestReject] = useState(null)
  const [posts, setPost] = useState([])

  const [privatePosts, setPrivatePost] = useState([])
  const [comments, setComments] = useState(null)

  const getProfile = async () => {
    const response = await axios.get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: localStorage.tokenSocial
      },
    })
    setProfile(response.data)
  }
  //get follow
  const getFollow = async userId => {
    const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}/follow`, {
      headers: {
        Authorization: localStorage.tokenSocial
      },
    })
    setFollow(response.data)
    getProfile()
  }
  //get Unfollow
  const getUnFollow = async userId => {
    const response = await axios.get(`http://localhost:5000/api/auth/profile/${userId}/unfollow`, {
      headers: {
        Authorization: localStorage.tokenSocial
      },
    })
    setUnFollow(response.data)
    getProfile()
  }
  //request
  const getRequest = async receiveId => {
    try {
      const response = await axios.get(`http://localhost:5000/api/request/profile/${receiveId}/request`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      setRequest(response.data)
      getProfile()
      toast.success("send to request")
    } catch (error) {
      if (error.response) setErrorRequest(error.response.data)
      else console.log(error)
    }
  }
  //accept request
  const getRequestAccept = async requestId => {
    try {
      const response = await axios.get(`http://localhost:5000/api/request/profile/${requestId}/accept`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      setRequestAccept(response.data)
      getProfile()
      toast.success("Accept request")
    } catch (error) {
      if (error.response) setErrorRequestAccept(error.response.data)
      else console.log(error)
    }
  }
  //reject Request
  const getRequestReject = async requestId => {
    try {
      console.log(requestId)
      const response = await axios.get(`http://localhost:5000/api/request/profile/${requestId}/reject`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      setRequestReject(response.data)
      getProfile()
      toast.success("Reject request")
    } catch (error) {
      if (error.response) setErrorRequestReject(error.response.data)
      else console.log(error)
    }
  }
  //______________________________________________post__________________________________________//
  //get public Post
  const getPublicPost = async () => {

    const response = await axios.get("http://localhost:5000/api/posts/posts/Public", {
      headers: {
        Authorization: localStorage.tokenSocial
      },
    })
    setPost(response.data)
  }
  //get private Post
  const getPrivatePost = async () => {
    const response = await axios.get("http://localhost:5000/api/posts/posts/Private", {
      headers: {
        Authorization: localStorage.tokenSocial
      },
    })
    setPrivatePost(response.data)

  }

  //add post
  const addPost = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const postBody = {
        description: form.elements.description.value,
        image: form.elements.image.value,
        type: "Public",
      }
      form.reset()
      await axios.post("http://localhost:5000/api/posts", postBody, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      getPublicPost()

      getProfile()
      toast("added post");
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  const addPostPrivate = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const postBody = {
        description: form.elements.description.value,
        image: form.elements.image.value,
        type: "Private",
      }
      form.reset()
      await axios.post("http://localhost:5000/api/posts", postBody, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })

      getPrivatePost()
      getProfile()
      toast("added post");
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  //confirm edit post
  const confirmEditPost = async (e, postId) => {
    e.preventDefault()
    console.log("cvbnm,")
    try {
      const form = e.target
      const postBody = {
        description: form.elements.description.value,
        image: form.elements.image.value,

      }
      await axios.put(`http://localhost:5000/api/posts/${postId}`, postBody, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })

      getProfile()
      getPublicPost()
      getPrivatePost()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  //delete post
  const deletePost = async postId => {
    try {

      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      getPublicPost()
      getPrivatePost()
      getProfile()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  //__________________________________________________comment________________________________________



  const addComment = async (e, postId) => {
    e.preventDefault()
    try {
      const form = e.target
      const commentBody = {
        comment: form.elements.comment.value,
      }

      form.reset()
      await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, commentBody, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      getPublicPost()
      getPrivatePost()
      toast.success("Comment added")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  //delete comment
  const deleteComment = async (postId, commentId) => {
    try {

      await axios.delete(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: localStorage.tokenSocial
        },
      })
      getPublicPost()
      getPrivatePost()
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
    getPublicPost()
    getPrivatePost()



  }, [])


  const signup = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const password = form.elements.password.value
      const confirmPassword = form.elements.confirmPassword.value
      if (password !== confirmPassword) return setErrorSignUp("password is not matching")

      const userBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        username: form.elements.username.value,
        email: form.elements.email.value,
        password: password,


      }

      await axios.post("http://localhost:5000/api/auth/signup", userBody)
      console.log("signup success")
      setErrorSignUp(null)
      navigate("/login")
    } catch (error) {
      if (error.response) setErrorSignUp(error.response.data)
      else console.log(error)
    }
  }
  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const emailORusername = form.elements.emailORusername.value
      let userBody
      if (emailORusername.includes("@")) {
        userBody = {
          email: emailORusername,
          password: form.elements.password.value,
        }
      } else
        userBody = {
          username: emailORusername,
          password: form.elements.password.value,
        }

      const response = await axios.post("http://localhost:5000/api/auth/login", userBody)

      const token = response.data
      localStorage.tokenSocial = token
      getProfile()
      console.log("login success")
      setErrorLogin(null)
      navigate("/")
    } catch (error) {
      if (error.response) setErrorLogin(error.response.data)
      else console.log(error)
    }
  }
  const forgetPassword = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const emailOrUsername = form.elements.emailOrUsername.value
      let userBody
      if (emailOrUsername.includes("@")) {
        userBody = {
          email: emailOrUsername,
        }
      } else
        userBody = {
          username: emailOrUsername,
        }

      await axios.post("http://localhost:5000/api/auth/forgot-password", userBody)
      setErrorForgetPassword(null)
      setSuccessForgetPassword("password resent link is sent , go check your email")

    } catch (error) {
      if (error.response) setErrorForgetPassword(error.response.data)
      else console.log(error)
    }
  }
  const resetPassword = async (e, token) => {
    e.preventDefault()
    try {
      const form = e.target
      const password = form.elements.password.value
      const confirmPassword = form.elements.confirmPassword.value
      if (password !== confirmPassword) setErrorResetPassword("password is not matching")

      const userBody = {
        password: password,
      }

      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, userBody)
      console.log("password reset")
      setErrorResetPassword(null)
      navigate("/login")
    } catch (error) {
      if (error.response) setErrorResetPassword(error.response.data)
      else console.log(error)
    }
  }
  //search
  const usernameSearch = e => {
    e.preventDefault()
    const form = e.target
    const searchText = form.elements.userNameSearch.value

    if (searchText) return navigate(`/profile/${searchText}`)
  }

  //send Message 
  const sendMessage = async (e, userProfileId) => {
    e.preventDefault()
    try {
      const form = e.target
      const messsageBody = {
        message: form.elements.message.value
      }

      await axios.post(`http://localhost:5000/api/messages/profile/${userProfileId}/message`, messsageBody, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })


    } catch (error) {
      if (error.response) setErrorSendMessage(error.response.data)
      else console.log(error)

    }
  }
  //______________________________________________like_____________________________________________//
  const postLike = async postId => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${postId}/likes`, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      getPublicPost()
      getPrivatePost()
      alert.success(response.data)
    } catch (error) {
      if (error.response) alert.error(error.response.data)
      else console.log(error)
    }
  }
  //____________________________________________favourite_____________________________________________//
  const favouriteMessage = async id => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/profile/${id}/favourite`, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      getProfile()
      toast.success(response.data)
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  //edit profile 
  const editProfile = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const profileBody = {
        avatar: form.elements.avatar.value,
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
      }
      await axios.put("http://localhost:5000/api/auth/profile/edit", profileBody, {
        headers: {
          Authorization: localStorage.tokenSocial,
        },
      })
      getProfile()
      toast.success("edit profile")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem("tokenSocial")
    console.log("logout success")
    setProfile(null)
  }
  const store = {
    signup,
    errorSignUp,
    login,
    errorLogin,
    resetPassword,
    errorResetPassword,
    forgetPassword,
    errorForgetPassword,
    successForgetPassword,
    profile,
    usernameSearch,
    sendMessage,
    errorSendMessage,
    follow,
    unFollow,
    getFollow,
    getUnFollow,
    getRequest,
    getRequestAccept,
    getRequestReject,
    request,
    requestAccept,
    requestReject,
    posts,
    getPublicPost,
    getPrivatePost,
    addPost,
    confirmEditPost,
    deletePost,
    errorRequestReject,
    errorRequestAccept,
    errorRequest,
    logout,
    editProfile,
    comments,
    addComment,
    postLike,
    favouriteMessage,
    deleteComment,
    privatePosts,
    addPostPrivate,




  }

  return (
    <PostsContext.Provider value={store}>
      <ToastContainer position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={localStorage.tokenSocial ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile/:username" element={localStorage.tokenSocial ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/email_verified/:token" element={<EmailVerified />} />
        <Route path="/one-post/:postId" element={localStorage.tokenSocial ? <OnePost /> : <Navigate to="/login" />} />
        <Route path="/message" element={localStorage.tokenSocial ? <Message /> : <Navigate to="/login" />} />
        <Route path="/direct-message" element={localStorage.tokenSocial ? <DirectMessage /> : <Navigate to="/login" />} />
        <Route path="/direct-message/:receiveId" element={localStorage.tokenSocial ? <DirectMessage /> : <Navigate to="/login" />} />
        <Route path="/private-posts" element={localStorage.tokenSocial ? <PrivatePost /> : <Navigate to="/login" />} />
      </Routes>
    </PostsContext.Provider >
  )
}












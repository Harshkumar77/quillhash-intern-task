import axios from "axios"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { initializeApp } from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"

export default function Register() {
  const { register, handleSubmit } = useForm()
  const [imageFirebaseRef, setImageFirebaseRef] = useState("")

  const app = initializeApp({
    apiKey: "AIzaSyDRWbTyrs4WUiFUF3DUa_-UMsuAkaf8FGg",
    authDomain: "dating-q.firebaseapp.com",
    projectId: "dating-q",
    storageBucket: "dating-q.appspot.com",
    messagingSenderId: "192437471188",
    appId: "1:192437471188:web:d8e1c09d34fc0c5ab1b841",
  })

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Register</h1>
            <form
              onSubmit={handleSubmit(async (data) => {
                setImageFirebaseRef(`${Date.now()}${data.profilePic[0].size}`)
                const reff = ref(getStorage(app), "user/" + imageFirebaseRef)
                await uploadBytes(reff, data.profilePic[0])
                try {
                  const apiResp = await axios.post("/api/register", {
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                    bio: data.bio,
                    gender: data.gender.toLowerCase(),
                    profilePic: await getDownloadURL(reff),
                  })
                  if (apiResp.status === 201) {
                    // new user
                    localStorage.setItem("token_dating", apiResp.data.token)
                    window.location.href = "/"
                  }
                } catch (error) {
                  alert("This email id already exist")
                }
              })}
            >
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                required
                {...register("fullName")}
              />
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
                {...register("email")}
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
              <select
                placeholder="Gender"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                required
                {...register("gender")}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <textarea
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="About Yourself..."
                required
                {...register("bio")}
              />

              <h1 className="block border border-grey-light w-full p-3 rounded mb-4">
                Profile Pic
                <input
                  type={"file"}
                  accept={"image/*"}
                  name="profilePic"
                  placeholder="profile pic"
                  onChange={(e) => {
                    console.log("popo")
                    setImgUrl(URL.createObjectURL(e.target.files[0]))
                  }}
                  {...register("profilePic")}
                />
              </h1>

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
          </div>

          <div className="text-grey-dark mt-6 ">
            Already have an account?
            <a className="ml-1 no-underline border-b border-blue text-blue-500">
              <Link to={"/login"}>Log in</Link>
            </a>
            .
          </div>
        </div>
      </div>
    </>
  )
}

'use client'
import SignInForm, {SignInFormProps} from "@/app/components/SignInForm";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation";
import {User} from "@stream-io/video-react-sdk";
import {useUser} from "@/app/providers/StreamClientProvider";

export default function Home() {
  const cookies = new Cookies
  const {client, call , setCall, setClient, setUser} = useUser()
  const router = useRouter()
  const onSignIn: SignInFormProps['onSignIn'] = (data) => {
    //SET STATE USER
    setUser(data)

    //SET COOKIES
    const expires = new Date()
    expires.setDate(expires.getDate() + 1)
    cookies.set('token', data.username, {
      expires
    })

    router.push('/home')
  }

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col w-full h-screen justify-center items-center'>
        <div className='w-1/4'>
          <SignInForm onSignIn={onSignIn} />
        </div>
      </div>
    </div>
  );
}

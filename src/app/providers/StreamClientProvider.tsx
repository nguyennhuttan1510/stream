'use client'
import React, {useContext, useEffect, useState} from 'react';
import {Call, StreamCall, StreamVideo, StreamVideoClient, User} from "@stream-io/video-react-sdk";
import {useRouter} from "next/navigation";

export interface UserContextType {
  client: StreamVideoClient | undefined
  call: Call | undefined
  user: UserType | undefined
  setClient: React.Dispatch<React.SetStateAction<StreamVideoClient | undefined>>
  setCall: React.Dispatch<React.SetStateAction<Call | undefined>>
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
  // onConnectUserWithStreamClient: (user: User, token?: string, fn?: (client: StreamVideoClient) => void) => void
  // onInitialCall: (client: StreamVideoClient, callArg: {type: string, id: string}) => void
}

export type UserType = {
  username: string
  password: string
  fullname: string
  token?: string
}

interface UserProviderPropsType {
  children: React.ReactNode
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined)

const StreamClientProvider = (props:UserProviderPropsType) => {
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const [client, setClient] = useState<StreamVideoClient>()
  const [call, setCall] = useState<Call>()

  const router = useRouter()

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_STREAM
    if(!apiKey || !user) return
    const userClient: User = {
      id: user.username,
      name: user.fullname,
      // image: 'https://th.bing.com/th/id/R.41921164a5125add470627e30d1286cc?rik=FzPBS2DwEt5Dfw&pid=ImgRaw&r=0'
    }
    const myClient = new StreamVideoClient({ apiKey, user: userClient, token: user.token });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
      setCall(undefined)
      setUser(undefined)
    };
  }, [user])

  // if(!client) return (
  //   <div className='w-full h-screen flex justify-center items-center'>
  //     Loading...
  //   </div>
  // )

  // if(!client) {
  //   router.push('/')
  //   return
  // }

  const valueContext = {call, client, user, setCall, setClient, setUser}

  return (
    <UserContext.Provider value={valueContext}>
      <StreamVideo client={client as StreamVideoClient}>
          {props.children}
      </StreamVideo>
    </UserContext.Provider>
  );
};

export const useUser = () => {

  const context = useContext(UserContext)

  if(!context) {
    throw new Error('useUser must be within provider')
  }
  return context as UserContextType
}

export default StreamClientProvider;
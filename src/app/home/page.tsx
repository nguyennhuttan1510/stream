'use client'
import React, {useState} from 'react';
import { FaPlus, FaArrowRight } from "react-icons/fa6";
import './styles.css'
import {
  GetCallResponse,
} from '@stream-io/video-react-sdk';
import {useRouter} from "next/navigation";
import {useUser} from "@/app/providers/StreamClientProvider";

interface FormHomeType {
  meetingID: string
  members: string
}

type StateUI = {
  isShowMeetingIDField: boolean
}

const Homepage = () => {
  const [form, setForm] = useState<FormHomeType>({} as FormHomeType)
  const [callState, setCallState] = useState<GetCallResponse | undefined>(undefined)
  const [state, setState] = useState<StateUI>({
    isShowMeetingIDField: false
  })

  const router = useRouter()
  const {client, user, call, setCall} = useUser()

  const createMeeting = async () => {
    if(!client || !user ) return
    try {
      const meetingID = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
      const description = `This is a call ${meetingID}`
      const call = client.call('default', String(meetingID))
      if(!call) throw new Error('Failed to create call')
      await call.getOrCreate({
        data: {
          custom: {
            description
          }
        }
      })
      setCall(call)
      router.push(`/meeting/${meetingID}`)
    } catch (e) {
      console.error('error - createMeeting', e)
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  if(!client || !user) {
    router.push('/')
    return
  }

  const onJoinMeeting = () => {
    if(!form.meetingID) {
      setState(prev => ({...prev, isShowMeetingIDField: true}))
      return
    }
    try {
      const call = client.call('default', form.meetingID)
      if(!call) throw new Error('Failed to join call')
      setCall(call)
      call.join()
      router.push(`/meeting/${form.meetingID}`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
            <div className='container mx-auto'>
              <div className='flex justify-center items-center min-h-screen'>
                <div className='w-1/4'>
                  <div className='profile-user flex flex-col items-center mb-8'>
                    <div className='mb-8 text-4xl text-black font-medium'> Welcome,<br/> {client.streamClient.user?.name}</div>
                    <div className='relative mb-4'>
                      <div style={{animationDuration: '3s'}} className='absolute back flex justify-center items-center rounded-full border-4 border-white border-t-red-500 border-b-green-500 border-l-orange-500 border-r-blue-500 w-40 h-40 animate-spin ease-linear infinite '></div>
                      <div className='relative z-10 avatar text-5xl border-transparent border-4 flex justify-center items-center rounded-full w-40 h-40 overflow-hidden'>
                        <img className='w-40 h-40' src={client.streamClient.user?.image} />
                      </div>
                    </div>
                  </div>

                  <div className='method grid grid-cols-1 grid-rows-2 gap-4'>
                    <div className='cursor-pointer w-full flex flex-col p-8 bg-green-500 rounded-lg transition-all' onClick={createMeeting}>
                      <div>
                        <FaPlus className='mb-3 text-white text-2xl'/>
                      </div>
                      <div className='text-md text-white font-bold'>
                        Create Meeting
                      </div>
                    </div>
                    <div className='method__join cursor-pointer w-full flex flex-col p-8 bg-orange-500 rounded-lg' onClick={onJoinMeeting}>
                      <div>
                        <FaArrowRight className='mb-3 text-white text-2xl'/>
                      </div>
                      <div className={`join__animation flex w-[200%] ${state.isShowMeetingIDField ? 'active' : ''}`}>
                        <div className='input w-1/2'>
                          <input id='meetingID' name='meetingID' onChange={onChangeInput} className='w-full px-4 py-2 bg-orange-300 border-none rounded-full' placeholder='Meeting ID' type='text' />
                        </div>
                        <div className='text w-1/2'>
                          <div className='text-md text-white font-bold'>
                            Join Meeting Existed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
  );
};
export default Homepage;
'use client'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import React, {useEffect, useState} from 'react';
import {
  Call,
  CallControls,
  CallingState, CallParticipantsList,
  RingingCall,
  SpeakerLayout,
  StreamCall,
  StreamTheme, StreamVideo, StreamVideoClient,
  useCallStateHooks
} from "@stream-io/video-react-sdk";
import {useUser} from "@/app/providers/StreamClientProvider";
import {useParams, useRouter} from "next/navigation";
import SetupMeeting from "@/app/meeting/[id]/component/SetupMeeting";
import MeetingRoom from "@/app/meeting/[id]/component/MeetingRoom";

const MeetingDetailPage = () => {
  const [call, setCall] = useState<Call>()
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false)
  // const {useCallCallingState} = useCallStateHooks()
  // const callCallingState = useCallCallingState()
  const router = useRouter()
  const { client } = useUser()
  const {id} = useParams()
  const onLeave = () => {
    router.push('/home')
  }

  useEffect(() => {
    if(!id || !client) {
      router.push('/')
      return
    }
    const loadCall = async () => {
      const {calls} = await client.queryCalls({
        filter_conditions: {
          id
        }
      })
      if(calls.length > 0) setCall(calls[0])
    }
    loadCall()
  }, [id, client])

  if(!call) return (
    <div className='h-screen w-full'>
      Loading...
    </div>
  )

  return(
    <div className='min-h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <SetupMeeting setIsSetupCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  )

};

export default MeetingDetailPage;
import React, {useEffect} from 'react';
import {CallControls, SpeakerLayout, useCall} from "@stream-io/video-react-sdk";
import {useRouter} from "next/navigation";

const MeetingRoom = () => {
  const call = useCall()
  const router = useRouter()
  let isAllow = true
  useEffect(() => {
    if(call && isAllow) {
      console.log('call join method')
      call.join()
      isAllow = false
    }
  }, [])

  if(!call) return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      Call Loading...
    </div>
  )

  const onLeave = () => {
    router.replace('/home')
  }

  return (
    <div className='w-full min-h-screen'>
      <div className='flex justify-center items-center'>
        <div className='w-2/3'>
          <SpeakerLayout />
          <CallControls onLeave={onLeave} />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
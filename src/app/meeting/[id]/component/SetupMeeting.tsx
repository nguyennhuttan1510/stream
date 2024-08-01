import React, {useEffect, useState} from 'react';
import {
  CallControls,
  CallingState,
  RingingCall,
  SpeakerLayout, useCall,
  useCallStateHooks,
  VideoPreview
} from "@stream-io/video-react-sdk";
import {useParams, useRouter} from "next/navigation";
import {useUser} from "@/app/providers/StreamClientProvider";

interface SetupMeetingPropsType {
  setIsSetupCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

const SetupMeeting = (props: SetupMeetingPropsType) => {
  const {setIsSetupCompleted} = props
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState<boolean>(false)
  // const {client, call, user, setCall} = useUser()
  const router = useRouter()
  const call = useCall()

  useEffect(() => {
    if(isMicCamToggleOn) {
      call?.camera.enable()
      call?.microphone.enable()
    } else {
      call?.camera.disable()
      call?.microphone.disable()
    }
  }, [call?.microphone, call?.camera, isMicCamToggleOn])

  if(!call) {
    throw new Error('useCall must be used within StreamCall component')
  }

  const joinMeeting = () => {
    setIsSetupCompleted(true)
  }

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center flex-col'>
        <div className='w-1/4'>
          <div className='text-lg font-bold mb-4'>Setup</div>
          <VideoPreview />
          <div className='my-4'>
            <label>
              <input type='checkbox' checked={isMicCamToggleOn} onChange={(e) => {setIsMicCamToggleOn(e.target.checked)}} />
              Join with mic and cam
            </label>
          </div>
          <button type='button' onClick={joinMeeting} className='w-full px-4 py-2 rounded-lg bg-black text-white font-bold hover:bg-blue-500 transition-all'>Join Meeting</button>
        </div>
      </div>
    </div>
  )

};


export default SetupMeeting;
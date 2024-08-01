'use client'
import React, {useState} from 'react';
import {UserType} from "@/app/providers/StreamClientProvider";
export interface SignInFormProps {
  onSignIn: (data: UserType) => void
}

const SignInForm = (props: SignInFormProps) => {
  const {onSignIn} = props
  const [formData, setFormData] = useState<UserType>({} as UserType)

  const onSubmit: SignInFormProps['onSignIn'] = (formData) => {
    onSignIn(formData)
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form className='flex flex-col gap-4'>
      <div className='mb-4 text-center text-2xl font-bold'>Sign in to Call</div>
      <input placeholder='User ID' id='username' name='username' onChange={(event) => {changeInput(event)}} className='px-4 py-1 border border-gray-300 rounded-lg'/>
      <input placeholder='Full name' id='fullname' name='fullname' onChange={(event) => {changeInput(event)}} className='px-4 py-1 border border-gray-300 rounded-lg'/>
      <input placeholder='token' id='token' name='token' onChange={(event) => {changeInput(event)}} className='px-4 py-1 border border-gray-300 rounded-lg'/>
      {/*<input id='password' name='password' onChange={(event) => {changeInput(event)}} type='password' className='px-4 py-1 border border-gray-300 rounded-lg'/>*/}
      <button type='button' onClick={() => {onSubmit(formData)}} className='px-4 py-2 rounded-lg border border-white bg-black text-white font-bold hover:border-black hover:text-black hover:bg-white transition-all'>
        Login
      </button>
    </form>
  );
};

export default SignInForm;
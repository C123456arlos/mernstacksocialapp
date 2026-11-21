import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {Label} from './ui/label'
import { Input } from './ui/input'
import axios from 'axios'
import {toast} from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
const Signup = () => {
    const [input, setInput] = useState({ username: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {user}= useSelector(store=>store.auth)
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        console.log(input)
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
                setInput({
                    username:'',email:'', password:''
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user) {
        navigate('/')
    }
},[])
  return (
      <div className='flex items-center w-screen h-screen justify-center'>
          <form onSubmit={signupHandler} className='w-96 shadow-lg flex flex-col gap-5 p-8'>
              <div className={'my-4'}>
                  <h1 className='text-center font-bold text-xl'>logo</h1>
                 <p className='text-sm text-center'>signup to the app</p>
              </div>
              <div>
                  <span className='font-medium'>username</span>
                  <Input name='username' value={input.username}
                     onChange={changeEventHandler} type='text' className='focus-visible:ring-transparent my-2'></Input>
              </div>
              <div>
                  <span className='font-medium'>email</span>
                  <Input type='email' name='email' value={input.email} onChange={changeEventHandler} className='focus-visible:ring-transparent my-2'></Input>
              </div>
              <div>
                  <span className='font-medium'>password</span>
                  <Input type={'password'} name='password' value={input.password} onChange={changeEventHandler} className='focus-visible:ring-transparent my-2'></Input>
              </div>
                  {
                                loading ? (<Button><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>please wait</Button>) :(<Button type='submit'>signup</Button>)}
              <span className='text-center'>already have an account <Link to='/login' className='text-blue-600'>login</Link></span>
      </form>
      </div>
  )
}

export default Signup
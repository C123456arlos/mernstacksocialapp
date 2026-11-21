import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {Label} from './ui/label'
import { Input } from './ui/input'
import axios from 'axios'
import {toast} from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import {Loader2} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux/authSlice'
const Login = () => {
    const [input, setInput] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const {user}= useSelector(store=>store.auth)
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signupHandler = async (e) => {
        e.preventDefault()
        console.log(input)
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                  navigate('/')
                toast.success(res.data.message)
                setInput({
                email:'', password:''
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
                 <p className='text-sm text-center'>login to the app</p>
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
                  loading ? (<Button><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>please wait</Button>) :(<Button type='submit'>login</Button>)}
              <span className='text-center'>{'dont\'t'} have an account <Link to='/signup' className='text-blue-600'>signup</Link></span>
      </form>
      </div>
  )
}

export default Login
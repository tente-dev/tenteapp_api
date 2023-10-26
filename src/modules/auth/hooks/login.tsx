import { useRef, useState } from 'react'
import { Keyboard, TextInput } from 'react-native'
import { useApiServiceMutation } from 'shared/api'
import { LoginResponse } from '../types/auth'
import { useDispatch } from 'react-redux'
import { saveToken } from '../slice/auth'
import { EmailRegEx } from '../constants/regex'

interface Payload {
  email: string
  password: string
}

interface Errors {
  email: boolean
  password: boolean
}

interface Props {
  onSuccess: () => void
}

export const useLogin = (props: Props) => {
  const { onSuccess } = props
  const dispatch = useDispatch()
  const [apiService, { isLoading: loading }] = useApiServiceMutation()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const [payload, setPayload] = useState<Payload>({ email: '', password: '' })
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
  })
  const [errorMessage, setErrorMessage] = useState<string>()
  const changeValue = (key: keyof Payload, value: string) => {
    setPayload(current => ({
      ...current,
      [key]: value,
    }))
  }
  const login = async () => {
    setErrorMessage('')
    setErrors({ email: false, password: false })
    if (!payload.email || !EmailRegEx.test(payload.email)) {
      setErrors(current => ({ ...current, email: true }))
      emailRef.current?.focus()
      return
    }
    if (!payload.password) {
      setErrors(current => ({ ...current, password: true }))
      passwordRef.current?.focus()
      return
    }
    Keyboard.dismiss()
    try {
      const { email, password } = payload
      const { token } = (await apiService({
        method: 'POST',
        url: 'auth/login',
        body: {
          email,
          password,
        },
      }).unwrap()) as LoginResponse
      dispatch(saveToken(token))
      onSuccess()
    } catch (error: any) {
      setErrorMessage(error?.data?.error?.message ?? 'Error de autenticación.')
      console.log(error)
    }
  }

  return {
    payload,
    refs: {
      emailRef,
      passwordRef,
    },
    errors,
    loading,
    errorMessage,
    changeValue,
    login,
  }
}

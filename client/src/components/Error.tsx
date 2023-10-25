import { Alert } from 'antd'

type ErrorProps = {
  message: string,
}

const Error = ({message} : ErrorProps) => {
  return (
    <Alert
      style={{marginTop: '40vh'}}
      message="Error"
      description={message}
      type="error"
      showIcon
    />
  )
}

export default Error
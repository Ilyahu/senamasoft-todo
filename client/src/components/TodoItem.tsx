import { Checkbox, Button, Row, Col, Typography} from "antd"
import { CloseOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState, useEffect, useCallback } from "react"
import { useCheckTodo } from "../services/useCheckTodo"
import { useDeleteTodo } from "../services/useDeleteTodo"

type TodoItemProps = {
  title: string,
  id: string,
  checked: boolean
}

const {Text} = Typography;

const TodoItem = ({title, id, checked}: TodoItemProps) => {
  const url = import.meta.env.VITE_API_URL + "/todos"
  const [updatedText, setUpdatedText] = useState(title)
  
  const {mutate: toggle} = useCheckTodo(id)
  const {mutate: deleteTodo} = useDeleteTodo(id)
  const handleEditSubmit = useCallback((id: string) => {
    axios.put(`${url}/update/${id}`, {updatedText})
  }, [updatedText, url])

  useEffect(()=>{
    handleEditSubmit(id)
  }, [handleEditSubmit, id])

  return (
    <div className="todoItem">
      <Row align={'middle'} justify={'center'}>
          <Col flex="5%">
            <Checkbox checked={checked} onClick={() => toggle()}/>
          </Col>

          <Col flex="75%">
            {
              (checked ? 
                <Text delete>{title}</Text>
                :
                <Text editable={{
                    onChange: setUpdatedText
                  }
                }>
                  {updatedText}
                </Text>
              )
            }
          </Col>

          <Col>
            <Button 
              size='small' 
              shape='circle'
              type='primary' 
              danger
              onClick={() => deleteTodo()} 
              icon={<CloseOutlined />
            }/>
          </Col>
      </Row>
    </div>
  )
}

export default TodoItem
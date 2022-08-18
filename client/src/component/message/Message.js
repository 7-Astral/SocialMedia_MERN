import { format } from 'timeago.js'
import './message.css'

export const Message = ({own,message}) => {
  return (
    <div className={own ?"message own":"message"}>
        <div className='messageTop'>
        <img className='messageImg' src="http://localhost:8800/images/Person/3.jpg" alt=""/>
        <p className='messageText'>{message.text} </p>
        </div>
        <div className='messageBottom'>
       {format(message.createdAt)}
        </div>
    </div>
  )
}

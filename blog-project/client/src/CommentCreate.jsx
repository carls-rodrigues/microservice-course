import { useState } from "react"
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://172.25.242.243:4001/posts/${postId}/comments`, {
      content
    })
    setContent('')
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Comment</label>
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
            type="text"
            className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
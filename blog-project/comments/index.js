const express = require('express');
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})
app.post('/posts/:id/comments', async(req, res) => { 
  const commentId = randomBytes(4).toString(`hex`);
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  const COMMENT_STATUS = 'pending'
  comments.push({ id: commentId, content, status: COMMENT_STATUS });
  commentsByPostId[req.params.id] = comments;
  await axios.post('http://172.25.242.243:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: COMMENT_STATUS
    }
  })
  res.status(201).send(comments);
})
app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId]
    const comment = comments.find(comment => {
      return comment.id = id;
    })
    comment.status = status
    await axios.post('http://172.25.242.243:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content
        
      }
    })
  }
  res.send({})
})

app.listen(4001,() => console.log('Listening on 4001.'))
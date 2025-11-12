import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: ""})
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // Form submit handler — receives the submit event and prevents the default
    // browser behavior (page reload). Make this async since we'll call Supabase.
    const createPost = async (event) => {
        event.preventDefault()
        setErrorMsg(null)
        try {
            const { error } = await supabase
                .from('Posts')
                .insert({title: post.title, author: post.author, description: post.description})
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Supabase insert error', error)
                setErrorMsg('Failed to submit post. Please try again.')
                return
            }
            window.location = "/"
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Create post failed', err)
            setErrorMsg('An unexpected error occurred. Please try again.')
        }
    }

    return (
        <div>
            {errorMsg && <div className="form-error" role="alert" style={{color: 'crimson', marginBottom: '12px'}}>{errorMsg}</div>}
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={post.author}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea
                    rows="5"
                    cols="50"
                    id="description"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost
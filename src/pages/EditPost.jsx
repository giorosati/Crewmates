import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'

// Edit an existing post by id. Loads the post from Supabase, allows updating & deleting.
const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({ id: null, title: '', author: '', description: '' })
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    const numericId = isNaN(Number(id)) ? id : Number(id)

    // Load existing post from Supabase
    useEffect(() => {
        let ignore = false
        ;(async () => {
            setLoading(true)
            setErrorMsg(null)
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', numericId)
                .single()
            if (error) {
                if (!ignore) setErrorMsg('Failed to load post.')
            } else if (data && !ignore) {
                setPost({ id: data.id, title: data.title ?? '', author: data.author ?? '', description: data.description ?? '' })
            }
            if (!ignore) setLoading(false)
        })()
        return () => { ignore = true }
    }, [numericId])

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost(prev => ({ ...prev, [name]: value }))
    }

    const updatePost = async (event) => {
        event.preventDefault()
        setErrorMsg(null)
        try {
            const { error } = await supabase
                .from('Posts')
                .update({ title: post.title, author: post.author, description: post.description })
                .eq('id', numericId)
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Update error', error)
                setErrorMsg('Failed to update post. Please try again.')
                return
            }
            navigate('/')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected update error', err)
            setErrorMsg('Unexpected error updating post.')
        }
    }

    const deletePost = async (event) => {
        event.preventDefault()
        if (!window.confirm('Delete this post? This cannot be undone.')) return
        setErrorMsg(null)
        try {
            const { error } = await supabase
                .from('Posts')
                .delete()
                .eq('id', numericId)
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Delete error', error)
                setErrorMsg('Failed to delete post.')
                return
            }
            navigate('/')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected delete error', err)
            setErrorMsg('Unexpected error deleting post.')
        }
    }

    return (
        <div>
            <h2>Edit Post</h2>
            {loading && <p>Loading...</p>}
            {errorMsg && !loading && <p style={{ color: 'crimson' }}>{errorMsg}</p>}
            {!loading && (
                <form onSubmit={updatePost}>
                    <label htmlFor="title">Title</label><br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    /><br />
                    <br />
                    <label htmlFor="author">Author</label><br />
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={post.author}
                        onChange={handleChange}
                    /><br />
                    <br />
                    <label htmlFor="description">Description</label><br />
                    <textarea
                        rows="5"
                        cols="50"
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={handleChange}
                    />
                    <br />
                    <input type="submit" value="Save Changes" />
                    <button type="button" className="deleteButton" onClick={deletePost} style={{ marginLeft: '8px' }}>Delete</button>
                </form>
            )}
        </div>
    )
}

export default EditPost
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './EditCrewmember.css'
import { supabase } from '../client'

// Edit an existing crewmember by id. Loads the crewmember from Supabase, allows updating & deleting.
const EditCrewmember = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [crewmember, setCrewmember] = useState({ id: null, name: '', rank: '', details: '' })
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    const numericId = isNaN(Number(id)) ? id : Number(id)

    // Load existing crewmember from Supabase
    useEffect(() => {
        let ignore = false
        ;(async () => {
            setLoading(true)
            setErrorMsg(null)
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', numericId)
                .single()
            if (error) {
                if (!ignore) setErrorMsg('Failed to load crewmember.')
            } else if (data && !ignore) {
                setCrewmember({ id: data.id, name: data.name ?? '', rank: data.rank ?? '', details: data.details ?? '' })
            }
            if (!ignore) setLoading(false)
        })()
        return () => { ignore = true }
    }, [numericId])

    const handleChange = (event) => {
        const { name, value } = event.target
        setCrewmember(prev => ({ ...prev, [name]: value }))
    }

    const updateCrewmember = async (event) => {
        event.preventDefault()
        setErrorMsg(null)
        try {
            const { error } = await supabase
                .from('crewmates')
                .update({ name: crewmember.name, rank: crewmember.rank, details: crewmember.details })
                .eq('id', numericId)
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Update error', error)
                    setErrorMsg('Failed to update crewmember. Please try again.')
                return
            }
            navigate('/')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected update error', err)
            setErrorMsg('Unexpected error updating crewmember.')
        }
    }

    const deleteCrewmember = async (event) => {
        event.preventDefault()
        if (!window.confirm('Delete this crewmember? This cannot be undone.')) return
        setErrorMsg(null)
        try {
            const { error } = await supabase
                .from('crewmates')
                .delete()
                .eq('id', numericId)
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Delete error', error)
                setErrorMsg('Failed to delete crewmember.')
                return
            }
            navigate('/')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected delete error', err)
            setErrorMsg('Unexpected error deleting crewmember.')
        }
    }

    return (
        <div>
            <h2>Edit Crewmember</h2>
            {loading && <p>Loading...</p>}
            {errorMsg && !loading && <p style={{ color: 'crimson' }}>{errorMsg}</p>}
            {!loading && (
                <form onSubmit={updateCrewmember}>
                    <label htmlFor="name">Name</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={crewmember.name}
                        onChange={handleChange}
                    /><br />
                    <br />
                    <label htmlFor="rank">Rank</label><br />
                    <input
                        type="text"
                        id="rank"
                        name="rank"
                        value={crewmember.rank}
                        onChange={handleChange}
                    /><br />
                    <br />
                    <label htmlFor="details">Details</label><br />
                    <textarea
                        rows="5"
                        cols="50"
                        id="details"
                        name="details"
                        value={crewmember.details}
                        onChange={handleChange}
                    />
                    <br />
                    <input type="submit" value="Save Crewmember" />
                    <button type="button" className="deleteButton" onClick={deleteCrewmember} style={{ marginLeft: '8px' }}>Delete</button>
                </form>
            )}
        </div>
    )
}

export default EditCrewmember
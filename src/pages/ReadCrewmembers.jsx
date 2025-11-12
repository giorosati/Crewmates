import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './ReadCrewmembers.css'

const ReadCrewmembers = (props) => {

    const [crewmembers, setCrewmembers] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCrewmembers = async () => {
            setErrorMsg(null)
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                // eslint-disable-next-line no-console
                console.error('Fetch crewmembers error', error)
                setErrorMsg('Failed to load crewmembers.')
                return
            }

            // set state of crewmembers
            setCrewmembers(data ?? [])
        }
        fetchCrewmembers();
    }, []);

    const deleteCrewmember = async (id) => {
        if (!window.confirm('Delete this crewmember? This cannot be undone.')) return
        setErrorMsg(null)
        try {
            const { error } = await supabase
                .from('crewmates')
                .delete()
                .eq('id', id)
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Delete error', error)
                setErrorMsg('Failed to delete crewmember.')
                return
            }
            // remove from local state
            setCrewmembers((prev) => prev.filter(c => c.id !== id))
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected delete error', err)
            setErrorMsg('Unexpected error deleting crewmember.')
        }
    }

    const formatDate = (iso) => {
        if (!iso) return '-'
        const d = new Date(iso)
        return d.toLocaleString()
    }

    return (
        <div className="ReadCrewmembers">
            {errorMsg && <p style={{ color: 'crimson' }}>{errorMsg}</p>}
            <div className="crewmembers-wrapper">
            {crewmembers && crewmembers.length > 0 ? (
                <table className="crewmembers-table" aria-label="Crewmembers list">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rank</th>
                            <th>Specialty</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crewmembers.map((c) => (
                            <tr key={c.id}>
                                <td className="cm-name">
                                    <Link to={`/crewmate/${c.id}`}>{c.name}</Link>
                                </td>
                                <td>{c.rank}</td>
                                <td>{c.specialty ?? '-'}</td>
                                <td>{formatDate(c.created_at)}</td>
                                <td>
                                    <Link to={`/crewmate/${c.id}`}><button className="btn btn-view">View</button></Link>
                                    <Link to={`/edit/${c.id}`}><button className="btn btn-edit">Edit</button></Link>
                                    <button className="btn btn-delete" onClick={() => deleteCrewmember(c.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                <h2 className="no-crewmembers">{'No Crewmembers Yet 😞'}</h2>
            )}
            </div>
        </div>
    )
}

export default ReadCrewmembers
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import './ReadCrewmembers.css'

const ViewCrewmember = () => {
    const { id } = useParams()
    const [crewmember, setCrewmember] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        let ignore = false
        ;(async () => {
            setLoading(true)
            setErrorMsg(null)
            const { data, error } = await supabase
                .from('crewmates')
                .select('*')
                .eq('id', isNaN(Number(id)) ? id : Number(id))
                .single()
            if (error) {
                if (!ignore) setErrorMsg('Failed to load crewmember.')
            } else if (data && !ignore) {
                setCrewmember(data)
            }
            if (!ignore) setLoading(false)
        })()
        return () => { ignore = true }
    }, [id])

    const formatDate = (iso) => {
        if (!iso) return '-'
        const d = new Date(iso)
        return d.toLocaleString()
    }

    if (loading) return <p>Loading...</p>
    if (errorMsg) return <p style={{ color: 'crimson' }}>{errorMsg}</p>
    if (!crewmember) return <p>No crewmember found.</p>

    return (
        <div className="ReadCrewmembers">
            <div className="crewmembers-wrapper">
                <div style={{ maxWidth: 900, width: '100%' }}>
                    <h2>{crewmember.name}</h2>
                    <p><strong>Rank:</strong> {crewmember.rank}</p>
                    <p><strong>Specialty:</strong> {crewmember.specialty ?? '-'}</p>
                    <p><strong>Details:</strong></p>
                    <p>{crewmember.details}</p>
                    <p><strong>Created:</strong> {formatDate(crewmember.created_at)}</p>
                    <p>
                        <Link to={`/edit/${crewmember.id}`}><button className="btn btn-edit">Edit</button></Link>
                        <Link to="/"><button className="btn btn-view">Back</button></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ViewCrewmember

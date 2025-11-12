import { useState } from 'react'
import './CreateCrewmember.css'
import './ReadCrewmembers.css'
import { supabase } from '../client'

const CreateCrewmember = () => {

    const SPECIALTIES = [
        { value: 'construction', label: 'Construction' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'entertainmemt', label: 'Entertainment' },
        { value: 'farming', label: 'Farming' },
        { value: 'food preparation', label: 'Food Preparation' },
        { value: 'health care', label: 'Health Care' },
        { value: 'hunting', label: 'Hunting' },
        { value: 'maintenance', label: 'Maintenance' },
        { value: 'planning', label: 'Planning' },
        { value: 'research', label: 'Research' },
        { value: 'writing', label: 'Writing' },
    ];

    const [crewmember, setCrewmember] = useState({name: "", rank: "", details: "", specialty: ""})
    const [errorMsg, setErrorMsg] = useState(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setCrewmember( (prev) => ({ ...prev, [name]: value }))
    }

    // Form submit handler — receives the submit event and prevents the default
    // browser behavior (page reload). Make this async since we'll call Supabase.
    const createCrewmember = async (event) => {
        event.preventDefault()
        setErrorMsg(null)
        // Basic client-side validation
        if (!crewmember.name.trim()) {
            setErrorMsg('Name is required.')
            return
        }
        if (!crewmember.specialty) {
            setErrorMsg('Please choose a specialty.')
            return
        }
            try {
            const { error } = await supabase
                .from('crewmates')
                .insert({name: crewmember.name, rank: crewmember.rank, details: crewmember.details, specialty: crewmember.specialty})
            if (error) {
                // eslint-disable-next-line no-console
                console.error('Supabase insert error', error)
                setErrorMsg('Failed to submit crewmember. Please try again.')
                return
            }
            window.location = "/"
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Create crewmember failed', err)
            setErrorMsg('An unexpected error occurred. Please try again.')
        }
    }

    return (
        <div className="ReadCrewmembers">
            <div className="crewmembers-wrapper">
                <div style={{ maxWidth: 900, width: '100%' }}>
                    <h2>Add Crewmember</h2>
                    {errorMsg && <div className="form-error" role="alert" style={{color: 'crimson', marginBottom: '12px'}}>{errorMsg}</div>}
                    <form onSubmit={createCrewmember} className="create-form">
                <label htmlFor="name">Name</label> <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={crewmember.name}
                    onChange={handleChange}
                /><br />
                <br/>

                <label htmlFor="rank">Rank</label><br />
                <input
                    type="text"
                    id="rank"
                    name="rank"
                    value={crewmember.rank}
                    onChange={handleChange}
                /><br />
                <br/>

                <fieldset className="specialty-grid" style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ fontSize: '18px', marginBottom: '8px' }}>Specialty</legend>
                    {SPECIALTIES.map((s) => (
                        <label key={s.value} className="specialty-option">
                            <input
                                type="radio"
                                name="specialty"
                                value={s.value}
                                checked={crewmember.specialty === s.value}
                                onChange={handleChange}
                            />
                            {s.label}
                        </label>
                    ))}
                </fieldset>

                <br/>

                <label htmlFor="details">Details</label><br />
                <textarea
                    rows="5"
                    cols="50"
                    id="details"
                    name="details"
                    value={crewmember.details}
                    onChange={handleChange}
                />
                <br/>
                <button type="submit" className="btn btn-view">Add Crewmember</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCrewmember
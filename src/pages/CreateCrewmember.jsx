import { useState } from 'react'
import './CreateCrewmember.css'
import { supabase } from '../client'

const CreateCrewmember = () => {

    const [crewmember, setCrewmember] = useState({name: "", rank: "", details: ""})
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
        try {
            const { error } = await supabase
                .from('crewmates')
                .insert({name: crewmember.name, rank: crewmember.rank, details: crewmember.details})
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
        <div>
            <h2>Add Crewmember</h2>
            {errorMsg && <div className="form-error" role="alert" style={{color: 'crimson', marginBottom: '12px'}}>{errorMsg}</div>}
            <form onSubmit={createCrewmember}>
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
                <input type="submit" value="Add Crewmember" />
            </form>
        </div>
    )
}

export default CreateCrewmember
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'

const ReadCrewmembers = (props) => {

    const [crewmembers, setCrewmembers] = useState([])

    useEffect(() => {
        const fetchCrewmembers = async () => {
            const {data} = await supabase
            .from('crewmates')
            .select()
            .order('created_at', { ascending: true })

            // set state of crewmembers
            setCrewmembers(data)
        }
        fetchCrewmembers();
    }, [props]);
    
    
    return (
    <div className="ReadCrewmembers">
            <h2>Crewmembers</h2>
            {
                crewmembers && crewmembers.length > 0 ?
                [...crewmembers]
                .sort((a, b) => a.id - b.id)
                .map((crewmember,index) => 
                    <Card 
                        key={crewmember.id}
                        id={crewmember.id} 
                        name={crewmember.name}
                        rank={crewmember.rank}
                        details={crewmember.details}
                    />
                ) : <h2>{'No Crewmembers Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadCrewmembers
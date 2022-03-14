import ActionCard from 'components/ActionCard';
import React from 'react';
import { Card } from 'reactstrap';

export default function MojeAkcije(props) {

    let [akcije, setAkcije] = React.useState([]);
    let [loading, setLoading] = React.useState(true);

    let token = localStorage.getItem("token");

    const ucitajAkcije = () => {
        setLoading(true);
        fetch(process.env.REACT_APP_SERVER + "actions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                if (res.status === 200)
                    return res.json();
            })
            .then(data => {
                setAkcije(data.filter(akcija => akcija.prijavljen));
            })
            .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        ucitajAkcije();
    }, [])
    return (
        <div className="content">
            <Card>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {loading && <p align="center">Učitavanje...</p>}    
                    {!loading && akcije.length == 0 && <p align='center'>Trenutno niste prijavljeni ni za jednu akciju. :(</p>}
                    {
                        akcije.map(akcija => {
                            return (
                                <ActionCard akcija={akcija} />
                            )
                        })
                    }

                </div>
            </Card>
        </div>
    )
}
import ActionCard from 'components/ActionCard';
import React from 'react';
import { Card, Row } from 'reactstrap';
import ProfileCard from './ProfileCard';

export default function Profil(props) {

    let [akcije, setAkcije] = React.useState([]);
    let [poeni, setPoeni] = React.useState([]);
    let [loading, setLoading] = React.useState(true);
    let [brojac, incBrojac] = React.useState(true);
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
    const ucitajPoene = () => {
      setLoading(true);
      fetch(process.env.REACT_APP_SERVER + "auth/points", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
          }
      })
          .then(res => {
              if (res.status === 200)
              {
                  return res.json();
              }
          })
          .then(data => {
            console.log("ko je ivan" + data.poeni);
              setPoeni(data.poeni);
          })
          .finally(() => setLoading(false));
  }

    React.useEffect(() => {
        ucitajAkcije();
        ucitajPoene();
    }, [])
    return (
        <div className="content">
            <Card>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    {loading && <p align="center">Učitavanje...</p>}    
                      <div style={{display: "flex", flexWrap:"wrap"}}>
                        <div style={{width: "100%"}}>
                          <div className="card" style={{width: "100%", margin:"10px"}}>
                            
                            <div className="card-header" style={{fontSize:"40px"}}>
                              {localStorage.getItem("username")}
                            </div>
                            <div className="card-body">
                              Broj poena: {poeni}
                            </div>
                          </div>
                        </div>
                          {akcije.map(akcija => {
                            console.log(akcija);
                              return (
                                <ProfileCard akcija={akcija} brojac={brojac++} />
                                // <h1>{akcija.naziv}</h1>
                              )
                          })}
                      </div>
                </div>
            </Card>
        </div>
    )
}
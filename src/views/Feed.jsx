import ActionCard from 'components/ActionCard';
import React, { useState } from 'react';
import { Button, Col, Dropdown, FormGroup, Row } from 'reactstrap';

export default function Feed(props) {
    let { akcije } = props;
    let [kategorije, setKategorije ]= useState([]);
    let [ filterAkcije, setFilterAkcije] = useState([]);
    let [selectedCategory, setSelectedCategory] = React.useState(0);

    let token = localStorage.getItem("token");

    const ucitajKategorije = () => {
        fetch(process.env.REACT_APP_SERVER + "categories", {
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
                setKategorije(data);
            })
    }
    React.useEffect(() => {
        ucitajKategorije();
    }, [])

    const uzmiKategoriju = (kategorija) => {
        return (
            <option key={kategorija.id_kategorije} value={kategorija.id_kategorije}>{kategorija.naziv_kategorije} </option>
        )
    }

    const uzmiSve = (lista) => {
        let ret = []
        for(let i = 0; i < lista.length; i++)
        {
            ret.push(uzmiKategoriju(lista[i]));
        }
        console.log("ovo je ret" + ret);
        return ret;
    }

    const primeniFilter = (filter) => {
        if(filter == -1)
        {
            setFilterAkcije(akcije);
            return;
        }
        let niz = [];
        for(let i = 0; i < akcije.length; i++)
        {
            if(akcije[i].id_kategorije == filter)
                niz.push(akcije[i]);
            console.log(akcije[i]);
            console.log(filter);
        }
        console.log("NIZ");
        console.log(niz);
        setFilterAkcije(niz);
        return;
    }

    return (
        <div>
            <FormGroup>
                <label>Kategorija akcije</label>
                <select className="form-control" value={selectedCategory} onChange={(e) => {
                    primeniFilter(e.target.value);
                }}>
                    <option disabled value={0}>Izaberite kategoriju</option>
                    {uzmiSve(kategorije)}
                    <option key={-1} value={-1}>Sve kategorije</option>
                </select>
            </FormGroup>

        <Row style={{width: '100%'}}>
            <Col md={0} lg={2}>   </Col>
            <Col md={12} lg={8}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    filterAkcije.map(akcija => {
                        return (
                            <ActionCard akcija={akcija} />
                        )
                    })
                }
            </div>
            </Col>
            <Col md={0} lg={2}></Col>
        </Row>
        </div>

    )
}
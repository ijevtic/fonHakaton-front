import ActionModal from 'components/ActionModal';
import MapComponent from 'components/MapComponent';
import { CalendarContainer } from 'components/CalendarComponent';
import React from 'react';
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import Feed from './Feed';

export default function Akcije(props) {

    let [view, setView] = React.useState('map');
    let [actionModalOpen, setActionModalOpen] = React.useState(false);
    let [akcije, setAkcije] = React.useState([]);
    let [currentAction, setCurrentAction] = React.useState([]);

  var token = localStorage.getItem("token");

  const ucitajAkcije = () => {
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
        setAkcije(data);
      })
  }

  React.useEffect(() => {
    ucitajAkcije();
  }, [])



  return (
    <div className="content" style={{ height: '100%', }}>
        <ActionModal open={actionModalOpen} action={currentAction} toggle={() => setActionModalOpen(!actionModalOpen)} />
      <Container>
        <Nav block
          style={{ display: 'flex' }}
          pills
        >
          <NavItem>
            <NavLink
              active={view === 'map'}
              onClick={() => setView('map')}
            >
              <i className='fas fa-map mr-2'></i>
              Mapa
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={view === 'feed'}
              onClick={() => setView('feed')}
            >
              <i className='fas fa-rss mr-2'></i>
              Istraži
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={view === 'calendar'}
              onClick={() => setView('calendar')}
            >
              <i className='fas fa-calendar-alt mr-2'></i>
              Kalendar
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
      <Row form>
        <Col md='12' style={{ height: 'calc(100vh - 135px)', }}>
          <Card className='mt-2' style={{ height: '100%' }}>
            <CardBody style={{ padding: 0, overflowY: 'scroll' }}>
              {view === 'map' && <MapComponent ucitajAkcije={ucitajAkcije} akcije={akcije} />}
              {view === 'feed' && <Feed akcije={akcije} ucitajAkcije={ucitajAkcije} />}
              {view === 'calendar' && <CalendarContainer ucitajAkcije={ucitajAkcije} akcije={akcije} />}
            </CardBody>
          </Card>

        </Col>
      </Row>
    </div>
  )
}
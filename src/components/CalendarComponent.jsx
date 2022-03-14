import React, { Component } from 'react';
import { Card } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import Moment from "react-moment";
import ChooseAction from './ChooseAction';

var meseci = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septebar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];
  
  var dani = [
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedelja",
  ];
  
  var trenutniMesec = new Date().getMonth();
  var trenutnaGodina = new Date().getFullYear();

  export class CalendarContainer extends Component {
    state = {
      mesec: new Date().getMonth(),
      godina: new Date().getFullYear(),
      modOdabira: false,
      odabrano: false,
      lokalniKraj: null,
      cene: {},
      rezervisanost: {},
      chooseAction: false,
      currentActions: []
    };

    
  
    componentDidMount() {
      this.ucitajCene();
    }
  
    ucitajCene = () => {
      var od = new Date();
      od.setHours(0);
      od.setMinutes(0);
      od.setSeconds(0);
      od.setMilliseconds(0);
      od.setDate(1);
      od.setMonth(this.state.mesec);
      od.setFullYear(this.state.godina);
  
      var doo = new Date();
      doo.setHours(0);
      doo.setMinutes(0);
      doo.setSeconds(0);
      doo.setMilliseconds(0);
      doo.setDate(1);
      doo.setMonth(this.state.mesec + 1);
      doo.setDate(od.getDate() - 1);
      doo.setFullYear(this.state.godina);
  
      // moguci padding u kalendaru
      od.setDate(od.getDate() - 6);
      doo.setDate(doo.getDate() + 6);
  
    };
  
    izracunajCenu = (kraj) => {
      var { pocetak } = this.props;
      var dat = new Date(pocetak);
      var cena = 0;
      while (dat < kraj) {
        cena += this.state.cene[dat];
        dat.setDate(dat.getDate() + 1);
      }
      return cena;
    };
    vratiDugme = (datum, modOdabira, pocetak, lokalniKraj, kraj, mesec, akcije) => {
      let poc = datum;
      datum.setDate(datum.getDate()+1);
      let kr = new Date(datum);
      datum.setDate(datum.getDate()-1);
      console.log(new Date(akcije[0].vreme));
      let br = 0;
      let niz = [];
      for(let i = 0; i < akcije.length; i++)
      {
        let v = new Date(akcije[i].vreme);
        console.log("vreme" + v);
        if(v >= poc && v < kr) {
          niz[br++] = akcije[i];
        }
      }
      var poslednjiMoguc = null;
      if(pocetak) {
        poslednjiMoguc = new Date();
        poslednjiMoguc.setFullYear(poslednjiMoguc.getFullYear() + 1);
        for(var z of Object.keys(this.state.rezervisanost)) {
          var dat = new Date(z);
          if(dat > pocetak && dat < poslednjiMoguc) poslednjiMoguc = dat;
        }
      }
      return (
        <Button
        style={{width:"12%", height:"11%", padding:"0", paddingTop:"5px", marginTop:"10px"}}
          id="kalendarDugme"
          textAlign="center"
          disabled={!(br>0)}
          color={
              pocetak <= datum &&
                datum <= (lokalniKraj != null ? lokalniKraj : kraj)
              ? "success"
              : datum.getMonth() == mesec
              ? "info"
              : ""
          }
          onClick={() => {
              this.setState({
                odabrano: false,
                lokalniKraj: datum,
                chooseAction: true,
                currentActions: niz
              });

            }
          }
        >
          <div id="sadrzajDugmeta" style={{paddingBottom:"20px"}}>
            <div id="datum">{datum.getDate()}</div>
            <div style={{fontSize:"12px", position:"absolute", width:"90px", left:"50%", marginLeft:"-45px"}}>{br>0? "Broj akcija "+br: ""}</div>
          </div>
        </Button>
      )
    }

    vratiDugmice = (arr, modOdabira, pocetak, lokalniKraj, kraj, mesec, akcije) => {
      let tabela = []
      let red = []
      for(let i = 0; i < arr.length; i++)
      {
        if(i != 0 && i % 7 == 0) {
          tabela.push(<Row style=
            {{  justifyContent:"space-around",
                justifyItems:"center", padding:"15px"
            }}  >{red}</Row>)
          red = []
        }
        red.push(this.vratiDugme(arr[i], modOdabira, pocetak, lokalniKraj, kraj, mesec, akcije))
      }
      tabela.push(<Row style=
        {{  justifyContent:"space-around",
            justifyItems:"center", padding:"15px"
        }}>{red}</Row>)
      return tabela;
    };
  
    render() {
      var akcije = this.props.akcije;
      var { mesec, godina, modOdabira, odabrano, lokalniKraj } = this.state;
      var { pocetak, kraj, cena, prenocista } = this.props;
      var prviDan = new Date(godina, mesec, 1, 0, 0, 0);
      while (prviDan.getDay() != 1) prviDan.setDate(prviDan.getDate() - 1);
      var poslednjiDan = new Date(godina, mesec + 1, 1, 0, 0, 0);
      poslednjiDan.setDate(poslednjiDan.getDate() - 1);
      while (poslednjiDan.getDay() != 0)
        poslednjiDan.setDate(poslednjiDan.getDate() + 1);
      var datumi = [];
      var d1 = new Date(prviDan);
      while (
        d1.getDate() != poslednjiDan.getDate() ||
        d1.getMonth() != poslednjiDan.getMonth()
      ) {
        datumi.push(new Date(d1));
        d1.setDate(d1.getDate() + 1);
      }
      datumi.push(new Date(d1));
      return (
        <div id="odabirDatuma" style={{justifyContent:"space-around"}}>
          <ChooseAction open={this.state.chooseAction} ucitajAkcije={this.props.ucitajAkcije} toggle={()=>{this.setState({chooseAction:!this.state.chooseAction})}} actions={this.state.currentActions}></ChooseAction>
          <Row style={{justifyContent:"center"}}>
            <Col lg={9} md={12}>
              <div id="odabirMeseca" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Button
                  size="sm"
                  color="primary"
                  disabled={mesec == trenutniMesec && godina == trenutnaGodina}
                  onClick={() => {
                    var m = mesec;
                    var g = godina;
                    if (m == 0) {
                      m = 11;
                      g--;
                    } else m--;
                    this.setState({ mesec: m, godina: g }, this.ucitajCene);
                  }}
                >
                  <i className="fas fa-arrow-left" />
                </Button>
                <span id="mesec" style={{fontSize:"18px", padding:"10px"}}>
                  {meseci[this.state.mesec]} {this.state.godina}.
                </span>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    var m = mesec;
                    var g = godina;
                    if (m == 11) {
                      m = 0;
                      g++;
                    } else m++;
                    this.setState({ mesec: m, godina: g }, this.ucitajCene);
                  }}
                >
                  <i className="fas fa-arrow-right" />
                </Button>
              </div>
              <div id="kalendar">
                <Row style=
            {{  justifyContent:"space-around", justifyItems:"center", paddingBottom:"10px"
            }}>
                  {dani.map((dan) => (
                  <span id="spanDan">{dan.substr(0, 3)}</span>
                  ))}
                </Row>
                {this.vratiDugmice(datumi, modOdabira, pocetak, lokalniKraj, kraj, mesec, akcije)}
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }
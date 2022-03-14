import React from 'react';
import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import ActionModal from './ActionModal';


export default function ChooseAction(props) {

    let [actionModalOpen, setActionModalOpen] = React.useState(false);
    let [currentAction, setCurrentAction] = React.useState([]);

    const getB = (akcija) => {
        return (
            <Button
        style={{marginLeft:"0", width:"50%", padding:"0", paddingTop:"5px", marginTop:"10px"}}
          id={akcija.id_akcije}  
          textAlign="center"
          disabled={(false)}
          onClick={() => {
            setCurrentAction(akcija);
            setActionModalOpen(true);
            console.log("duradi nesto")
            console.log(akcija);
           }
          }
        >
          <div style={{paddingBottom:"15px"}}>
            <div>{akcija.naziv}</div>
          </div>
        </Button>
        );
    }

    const getF = (arr) => { 
        let ret = [];
        for(let i = 0; i < arr.length; i++)
        {
            ret.push(getB(arr[i]))
        }
        return ret;
    }


    return (
        
        <Modal
        scrollable
            id="chooseAction"
            size={'xl'}
            isOpen={props.open}
            toggle={props.toggle}
            actions={props.actions}
        >
            <ActionModal ucitajAkcije={props.ucitajAkcije} open={actionModalOpen} toggle={() => setActionModalOpen(!actionModalOpen)} akcija={currentAction} />
            <ModalHeader close={<h6></h6>} toggle={props.toggle}>
            </ModalHeader>
            <ModalBody>
                <div style={{display:"flex", alignContent:"center", flexDirection:"column", flexWrap:"wrap"}}>
                {getF(props.actions)}
                </div>
            </ModalBody>
            <ModalFooter>
                {' '}
                <Button onClick={props.toggle}>
                    Zatvori
                </Button>
            </ModalFooter>
        </Modal>
    )
}
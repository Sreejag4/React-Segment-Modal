import { React, useEffect, useState } from 'react';
import './Modal.scss'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from '../Header/Header'
import greenDot from '../../assets/Icons/green-dot.png';
import redDot from '../../assets/Icons/red-dot.png';
import grayDot from '../../assets/Icons/gray-dot.png'
import minusIcon from '../../assets/Icons/minus.png'

const ModalPopup = ({ isPopupOpen, closePopup }) => {
    const schemaOptions = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [segmentName, setSegmentName] = useState('')
    const [newSchemaSelectedValue, setNewschemaSelectedValue] = useState('Add schema to segment');
    const [newDropdownOptions, setNewDropdownOptions] = useState(schemaOptions);

    const handleAddNewDropdown = () => {
        if ( newSchemaSelectedValue !== 'Add schema to segment' && !selectedOptions.includes(newSchemaSelectedValue)) {
            setSelectedOptions([...selectedOptions, newSchemaSelectedValue]);
            setNewDropdownOptions((el) => el.filter((obj) => obj.value !== newSchemaSelectedValue));
            return;
        }
    };

    useEffect(() => {
    //  alert(newSchemaSelectedValue)
    }, [newSchemaSelectedValue])
    

    const saveSegment = async () => {
        const selectedSchemaData = selectedOptions.map((el) => {
            const selectedSchema = schemaOptions.find((option) => option.value === el)
            return { [selectedSchema.value]: selectedSchema.label }
        })
        const segmentData = {
            "segment_name": segmentName,
            "schema": selectedSchemaData
        }
        // console.log(segmentData,"data");

        try {
            const webhookUrl = 'https://webhook.site/f2d4bb49-095c-4bd7-bfa6-b6a7b1f99b19';
            const response = await fetch(webhookUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(segmentData),
            });
        
            if (response.ok) {
              console.log('Data sent successfully.');
            } else {
              console.error('Failed to send data:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error:', error.message);
          }
        closePopup()
    }
    const changeSchema =(val, index)=>{
        let newSelectedOptions = [...selectedOptions]
        newSelectedOptions[index] = val;
        setSelectedOptions(newSelectedOptions)
    }

    return (
        <>
            <Modal show={isPopupOpen} onHide={closePopup} dialogClassName="modal-dialog-right">
                <Modal.Header>
                    <Modal.Title>
                        <Header headerText="Saving Segment" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter the Name of the Segment</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name of the segment"
                                autoFocus
                                value={segmentName}
                                onChange={(e) => setSegmentName(e.target.value)}
                            />
                        </Form.Group>
                        <p>To save your segment, you need to add the schemas to build the query</p>
                        <div className='segment-cont'>
                            <div>
                                <img src={greenDot} alt='Dot Icon' />
                                -User Traits
                            </div>
                            <div>
                                <img src={redDot} alt='Dot Icon' />
                                -Group Traits
                            </div>
                        </div>
                        <div className='schema-cont mb-2'>
                            {
                                selectedOptions.map((el,index) =>
                                    <div key={el} className='schema'>
                                        <img src={greenDot} alt='Dot Icon' />
                                        <Form.Select aria-label="Default select example" value={el}
                                            onChange={(e) => changeSchema(e.target.value,index)}
                                            style={{ cursor: 'pointer' }}>
                                            {schemaOptions.filter((option) => !selectedOptions.includes(option.value) || option.value === el)
                                                .map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                        </Form.Select>
                                        <img src={minusIcon} alt='Minus Icon' />
                                    </div>
                                    )
                            }
                        </div>

                        <div className='main-dropdown mt-3'>
                            <img src={grayDot} alt='Dot Icon' />
                            <Form.Select aria-label="Default select example" value={newSchemaSelectedValue} onChange={(e) =>setNewschemaSelectedValue(e.target.value)} style={{ cursor: 'pointer' }}>
                               <option >Add schema to segment</option>
                                {newDropdownOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                            <img src={minusIcon} alt='Minus Icon' />
                        </div>

                        <p className='schema-btn mt-3' onClick={handleAddNewDropdown}>+ Add new schema</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveSegment} className="custom-button bg-green">
                        Save the Segment
                    </Button>
                    <Button variant="light text-danger text-bold" onClick={closePopup} className="custom-button">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPopup

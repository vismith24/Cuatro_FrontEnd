import React from "react";
import Cookie from "js-cookie";
import axios from 'axios';
import {Button, Container, InputLabel, MenuItem, Select,
TextField, Typography } from '@material-ui/core';
import Alert from '../Alert/Alert'
import { backendAPI } from '../../constants';

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            error: null,
            success: false,
            isNumber: true
        }
    }

    handleChange = (event) => {
        event.persist();
        this.setState((prevState) => ({
            item: {
                ...prevState.item,
                [event.target.id]: event.target.value
            }
        }),
        () => {
            console.log(this.state.item)
        })
    }

    handleSubmit = () => {
        if (!this.state.isNumber) {
            return
        }
        axios.post(`${backendAPI}/store/add_item`, this.state.item, {
            headers: {
                Authorization: Cookie.get("JWT")
            }
        })
        .then(res => {
            this.setState({
                success: true
            })
        })
        .catch(error => {
            this.setState({
                error: error
                
            })
        })
    }

    changeSuccess = () => {
        this.setState({
            success: false
        })
    }

    changeErrorToNull = () => {
        this.setState({
            error: null
        })
    }


    render() {
        const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
        return (
            <Container maxWidth="sm" style={{paddingTop:'5em'}}>

                <Typography variant='h2'>
                    List your product
                </Typography>

                <form>

                <TextField id="product" label="Product Name" variant="outlined" style={{marginTop: '2em', marginRight:'2em', width:'100%'}} onChange={this.handleChange}/>

                <TextField id="price" label="Price in 	
                rupees" variant="outlined" style={{marginTop:'2em', marginRight:'2em', width:'100%'}} onChange={event => {
                    this.handleChange(event);
                    if (isNaN(event.target.value) && this.state.isNumber) {
                        this.setState({
                            isNumber: false
                        })
                    }
                    else if (!isNaN(event.target.value) && !this.state.isNumber) {
                        this.setState({
                            isNumber: true
                        })
                    }
                }}
                error={!this.state.isNumber}
                />

                <TextField id="picture" label="Product Image Url" variant="outlined" style={{marginTop:'2em', marginRight:'2em', width:'100%'}} onChange={this.handleChange}/>

                <InputLabel id="product-type" style={{marginTop: '2em', width:'100%'}}>Product Type</InputLabel>
                <Select
                labelId="product-type"
                id="type"
                value={this.state.item.type}
                onChange={(event, id) => {
                    event["target"]["id"] = id.props.id
                    this.handleChange(event)
                }}
                style={{marginRight:'2em', width:'100%'}}
                >
                <MenuItem id='type' value="Studio">Studio</MenuItem>
                <MenuItem id='type' value="Instrument">Instrument</MenuItem>
                </Select>

                <TextField
                id="description"
                label="Description"
                multiline
                rows={6}
                defaultValue=""
                variant="outlined"
                style={{marginTop:'2em', marginRight:'2em', width:'100%'}} onChange={this.handleChange}
              />

                <Button variant="contained" color="primary" style={{marginTop:'2em'}} onClick={this.handleSubmit}>
                    Submit
                </Button>

                </form>

                {this.state.success ? (
                    <Alert type="success" message="Item Added" afterCloseFunction={this.changeSuccess}/>
                ): null}

                {this.state.error ? (
                    <Alert type="error" message="Some Error Occured! Check if your data is correct" afterCloseFunction={this.changeErrorToNull}/>
                ): null}
            </Container>
        )
    }
}
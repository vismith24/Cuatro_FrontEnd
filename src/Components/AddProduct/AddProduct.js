import React from "react";
import Cookie from "js-cookie";
import { Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => {
            console.log(this.state, event.target)
        })
    }


    render() {
        const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
        return (
            <Container maxWidth="sm" style={{paddingTop:'5em'}}>

                <Typography variant='h2'>
                    Add your product
                </Typography>

                <form>

                <TextField id="product" label="Product Name" variant="outlined" style={{marginTop: '2em', marginRight:'2em', width:'100%'}} onChange={this.handleChange}/>

                <TextField id="price" label="Price in 	
                rupees" variant="outlined" style={{marginTop:'2em', marginRight:'2em', width:'100%'}} onChange={this.handleChange}/>

                <TextField id="picture" label="Prodcut Image Url" variant="outlined" style={{marginTop:'2em', marginRight:'2em', width:'100%'}} onChange={this.handleChange}/>

                <InputLabel id="product-type" style={{marginTop: '2em', width:'100%'}}>Product Type</InputLabel>
                <Select
                labelId="product-type"
                id="type"
                value={this.state.type}
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
            </Container>
        )
    }
}
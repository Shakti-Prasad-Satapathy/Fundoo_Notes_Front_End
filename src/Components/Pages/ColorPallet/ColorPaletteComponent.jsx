import React, { Component, createRef } from 'react';
import { Tooltip, IconButton, Popover, Paper, ClickAwayListener } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';

const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "#ef9a9a" },
{ name: "Cyan", colorCode: "#80deea" },
{ name: "Blue", colorCode: "#2196f3" },
{ name: "Indigo", colorCode: "#9fa8da" },
{ name: "LightBlue", colorCode: "#90caf9" },
{ name: "Purple", colorCode: "#b39ddb" },
{ name: "Yellow", colorCode: "#c5e1a5" },
{ name: "Lime", colorCode: "#e6ee9c" },
{ name: "Pink", colorCode: "#f48fb1" },
{ name: "gray", colorCode: "#eeeeee" },
{ name: "Brown", colorCode: "#bcaaa4" },
]

export default class ColorPaletteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false
            // colorid: ""
        }
        this.buttonRef = createRef()

    }
    handleClickAway = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleChangeColor(e) {
        var colorid = e.target.value;
        var addColorDetails = {
            "noteid": this.props.notesId,
            "notecolor": colorid
        }
        this.addNoteColor(addColorDetails)
    }
    addNoteColor(addColorDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addColorDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/addnotecolor', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            this.handleGetColor()
                        } else {
                            alert("there is some probleam in trashing")
                        }
                    });
            })
    }

    componentDidMount() {
        this.handleGetColor();
    }
    handleGetColor() {

        var getColorDetails = {
            "noteid": this.props.notesId,
        }
        this.getNoteColor(getColorDetails)
    }
    getNoteColor(getColorDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getColorDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/getnotecolor', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            this.props.onSelectColor(data.data.notes);
                        }
                    });
            })
    }

    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleClick(event) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : event.target
            // anchorEl: event.target
        });
    };

    render() {
        const colorChange = colorPalette.map((key, index) => {
            return (
                <div key={index} >
                    <Tooltip title={key.name}>
                        <IconButton style={{ backgroundColor: key.colorCode, border: "silver 2px solid" }}
                            value={key.colorCode}
                            onClick={(e) => this.handleChangeColor(e)}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            <div className="colorpalette-div" >
                <ClickAwayListener onClickAway={this.handleClickAway}>
                    <ColorLensOutlinedIcon ref={this.buttonRef} onClick={(event) => this.handleClick(event)} cursor="pointer" />
                </ClickAwayListener>
                <Popover
                    // open={this.state.anchorEl}
                    // anchorEl={() => this.buttonRef.current} >
                    open={this.state.anchorEl}
                    onClose={this.handleClose}
                    // anchorEl={this.state.anchorEl}
                    anchorEl={() => this.buttonRef.current}

                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',

                    }}
                >
                    {/* {console.log(this.state.anchorEl, "8888888")} */}
                    <Paper >
                        {colorChange}
                    </Paper>
                </Popover>

            </div >
        )
    }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = {
};

class SmartTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: props.data,

            //Flag to disable Create action
            disableCreation: false,
            //Flag to disable Edit action
            disableEdit: true,
            //Flag to disable Delete action
            disableDelete: true,
            disableExtended: true,
            //The list of index position of the selected elements
            selectedIDs: [],

            //The list IDs of the selected entry
            selectedEntrys: [],
        };
    }

    newEntry(e) {
        e.preventDefault();
        console.log("new");
    }

    editEntry(e) {
        e.preventDefault();
        console.log("edit", this.state.selectedEntrys);
    }

    deleteEntry(e) {
        const entry = this.state.selectedEntrys;
        console.log("delete", entry);
    }

    handleSelection(selections) {
        const table = this.state.table;

        let oneSelected, groupSelected, disableCreate, disableEdit, disableDelete, disableExtended;
        let selectedIDs = [];
        let selectedEntrys = [];

        //Reach the selectedEntrys (IDs) and positional lists
        switch( selections ) {
            case "all":
                selectedEntrys, selectedIDs = table.map(function(selected, index) {
                    selectedEntrys.push(selected);
                    selectedIDs.push(index);
                });
                break;

            case "none":
                selectedEntrys = [];
                selectedIDs = [];
                break;

            default:
                selections.map(function(selected, index) {
                    selectedEntrys.push(table[selected]);
                    selectedIDs.push(selected);
                });
                break;
        };

        const selection_length = selectedIDs.length;

        //Establish if there are one, more than one or none selected.
        switch( selection_length ) {
            case 0:
                oneSelected = false;
                groupSelected = false;
            break;

            case 1:
                oneSelected = true;
                groupSelected = false;
            break;

            default:
                oneSelected = false;
                groupSelected = true;
            break;
        }

        //Activate Creation ever
        disableCreate = false;

        //Activate Selection if just one element is selected
        disableEdit = !oneSelected;

        //Disable Delete if all entry are selected, or none was selected
        disableDelete = (selection_length == table.length)?true:!(oneSelected || groupSelected);

        //Disable Extended if no entry is selected
        disableExtended = (selection_length > 0)?false:true;

        this.setState ({
            selectedIDs,
            selectedEntrys,
            disableCreate,
            disableEdit,
            disableDelete,
            disableExtended,
        })
    }

    render() {
        const {selectedIDs, selectedEntrys, disableCreate, disableEdit, disableDelete, disableExtended} = this.state;

        const table = this.props.data;
        const header_list = this.props.header;
        const {appendButtons, onUpdate} = this.props;

        const defaultActions = [
            <RaisedButton
              key="createButton"
              label='New'
              primary={true}
              onTouchTap={(e) => this.newEntry(e)}
              disabled={disableCreate}
            />
        ,
            <RaisedButton
              key="editButton"
              label='Edit'
              primary={true}
              onTouchTap={(e) => this.editEntry(e)}
              disabled={disableEdit}
            />
        ,
            <RaisedButton
              key="deleteButton"
              label='Delete'
              primary={true}
              onTouchTap={(e) => this.deleteEntry(e)}
              disabled={disableDelete}
            />
        ]

        const extendedActions = (appendButtons != null)?
            appendButtons.map(function(button, id) {
                return (
                    <RaisedButton
                      key={button.label + "Button"}
                      label={button.label}
                      primary={false}
                      onTouchTap={(e) => button.action(e, selectedEntrys, onUpdate)}
                      disabled={disableExtended}
                    />
                )
            })
            :
            null;

        const actions = defaultActions.concat(extendedActions)

        return  (
            <Paper>

                {
                (this.props.title) &&
                    <h3>{this.props.title}</h3>
                }

                <Table
                    fixedHeader={true}
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={(entry) => this.handleSelection(entry)}
                >
                    <TableHeader
                        displaySelectAll={true}
                        enableSelectAll={true}
                    >
                      <TableRow>

                      { //Prepare headers with optional width
                          header_list.map(function(header, index) {
                              const is_hidden = (header.hide != true)?false:true;

                              return (
                                  header.width?
                                    <TableHeaderColumn
                                        key={"data_header_" + index}
                                        style={{width:header.width}}
                                        hidden={is_hidden}
                                    >{header.title}</TableHeaderColumn>
                                  :
                                    <TableHeaderColumn
                                        key={"data_header_" + index}
                                        hidden={is_hidden}
                                    >{header.title}</TableHeaderColumn>
                              )
                          })
                      }

                      </TableRow>
                    </TableHeader>

                    <TableBody
                        stripedRows={true}
                        deselectOnClickaway={false}
                    >

                    { //Prepare the data!
                        table.map(function(entry, index) {
                            let selected = (selectedIDs.indexOf(index) > -1)?true:false;

                            return (
                                <TableRow
                                    key={"tableRow_"+index}
                                    selected={selected}
                                    >

                                { //For each header
                                    header_list.map(function(header, index_header) {
                                        const is_hidden = (header.hide != true)?false:true;

                                        return (
                                            header.width?
                                              <TableRowColumn
                                                  key={"data_row_" + index_header}
                                                  style={{width:header.width}}
                                                  hidden={is_hidden}
                                              >{entry[index_header]}</TableRowColumn>
                                            :
                                              <TableRowColumn
                                                  key={"data_row_" + index_header}
                                                  hidden={is_hidden}
                                              >{entry[index_header]}</TableRowColumn>
                                        )
                                    })
                                }

                                </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>

                {
                    this.state.entry_error_text &&
                    <div>
                        <TextField
                            id="entryregationError"
                            style={{marginTop: 0}}
                            floatingLabelText=""
                            value=""
                            errorText={this.state.entry_error_text}
                        />
                        <br/>
                        <br/>
                    </div>
                }

            {actions}

            </Paper>
        );
    }
}

SmartTable.propTypes = {
    header: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    appendButtons: PropTypes.array,
};

export default SmartTable;

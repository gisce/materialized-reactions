## \<SmartTable>

#### WIP (work in progress)

It render an intelligent material-ui table based on the following props:

- header (mandatory)
  - The header of the table
  - The format is an ordered list of objects with title (str), witdh (style node / str) and hide (bool)
  ```
  [
    {
      title: "the first column",
      width: <the value that will override the style.width of this column>,
      hide: <true / false>,
    },
    {
      title: "the second column",
      width: <the value that will override the style.width of this column>,
      hide: <true / false>,
    }    
    ...
  ]
  ```
- data ( (mandatory)
  - The data to render inside the table
  - The format is an ordered list (row) of lists (columns)
  ```
    [ 
      //first row
      [
        //first column content,
        //second,
        //third,
        ...
      ], 
      //second row
      [
        //first column content,
        //second,
        //third,
        ...
      ],
      ...
    ]
  ```
- title
  - An optional string to integrate a title as an \<h3> above the table
- appendButtons
  - Buttons to append the basic actions "Edit" and "Delete"
  - Will render a RaisedButton for each entry below the default actions
  - Optional list of objects with label, action
  ```
  [
    {
      label: "the label",
      action: <binding parents method>
    }
  ]
  ```
  
### Example

```
const headers = [
    {
        title: 'Nickname',
        width: null,
    },                {
        title: 'Name',
        width: null,
    },                {
        title: 'Surname',
        width: '30%',
    },                {
        title: 'Status',
        width: null,
    },
];

const table_data = [
  [
    "jdoe"
    "John",
    "Doe",
    "True",
  ]
];


const the_table = (
  <SmartTable 
    header={headers} 
    data={table_data}
  />
);

```

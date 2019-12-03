import React from "react";
import Axios from "../../../server/node_modules/axios";
export default class Modal extends React.Component {
  
  state = {
    apparelOptions: [],
    colorOptions: []
  }
  handleChange = (e) =>  {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }
  submit = () => {
    console.log(this.state.options)
    Axios.post(`/upload/${this.props.id}/tags`, {
      clothingId: this.props.clothingId,
      colors: this.state.colorOptions,
      apparel: this.state.apparelOptions
    }).then(res => {
      this.props.history.push('/');
    })
  }
  onChange = (event) => {
    
      // current array of options
      const options = this.state.apparelOptions
      let index
  
      // check if the check box is checked or unchecked
      if (event.target.checked) {
        options.push(event.target.value)
      } else {
        // or remove the value from the unchecked checkbox from the array
        index = options.indexOf(event.target.value)
        options.splice(index, 1)
      }
  
      // update the state with the new array of options
      this.setState({ apparelOptions: options })
  }
  onChangeColor = (event) => {

    const options = this.state.colorOptions
    let index

    // check if the check box is checked or unchecked
    if (event.target.checked) {
      options.push(event.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(event.target.value)
      options.splice(index, 1)
    }
    console.log(options)
    // update the state with the new array of options
    this.setState({ colorOptions: options })
  }
 
  render() {
    const apparel = this.props.apparel && this.props.apparel.map(clothe => {
      return<> <label>{clothe.name}</label> <input type="checkbox" value={clothe.name} onChange={event => this.onChange(event)} /> </>
    })
    const colors = this.props.colors && this.props.colors.map(color => {
      if (color.name !== "White")
      {
        return<> <label style = {{backgroundColor:color.hex}}>{color.name}</label> <input type="checkbox" name = {color.hex} value={color.name} onChange={event => this.onChangeColor(event)} /> </>
      }
      return<> <label>{color.name}</label> <input type="checkbox" value={color.name} onChange={event => this.onChangeColor(event)} /> </>
    })
    return (
      <>
        <div className="modal" style={{ display: `${this.props.display}`, position: "fixed" }}>
          <div className="modal__content">
            <h2 className="modal__content-header">What tags match with your image?</h2>
            
              {apparel}
              {colors}
              <button onClick={() => this.submit()} className="modal__content-cancel">
                Submit
              </button>
            </div>
          </div>
      </>
    );
  }
}

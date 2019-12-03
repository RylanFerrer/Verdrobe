import Select from 'react-select'
import React, { Component } from 'react'

export default class Selector extends Component {
 
    render() {
        const groupStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          };
          const groupBadgeStyles = {
            backgroundColor: '#EBECF0',
            borderRadius: '2em',
            color: '#172B4D',
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 'normal',
            lineHeight: '1',
            minWidth: 1,
            padding: '0.16666666666667em 0.5em',
            textAlign: 'center',
          };
          
          const formatGroupLabel = data => (
            <div style={groupStyles}>
              <span>{data.label}</span>
              <span style={groupBadgeStyles}>{data.options.length}</span>
            </div>
          );
           
          
        const apparel = []
        const colors = []
        // Putting the tags in an array
         this.props.wardrobe && this.props.wardrobe.forEach(clothe => {
                apparel.push(...clothe.apparelTags)
        })
        this.props.wardrobe && this.props.wardrobe.forEach(clothe => {
            colors.push(...clothe.colorTags)
        })
        //Removing Duplicate Tags
        const uniqueApparel = apparel.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
        const uniqueColors = colors.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
        
        
       
        const colorOptions = uniqueColors.sort().map((color,index) => {
            return {value:index, label: color}
        })
        const apparelOptions = uniqueApparel.sort().map((clothe, index) => {
            return {value: index,
                    label: clothe}
        })
        
        const groupedOptions = [
            {
                label: 'All',
                options: [{value: "none", label: "All"}]
            },
            {
              label: 'Apparel',
              options: apparelOptions,
            },
            {
              label: 'Colors',
              options: colorOptions,
            },
          ];
          
        return (
                <Select   
                className = "select"
                menuContainerStyle={{'zIndex': 999}} 
                onChange = {this.props.change} 
                options = {groupedOptions}
                formatGroupLabel={formatGroupLabel}   
                styles={{ menuPortal: base => {
                  const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
                  return { ...rest, zIndex: 9999 };
                }}}
                menuPortalTarget={document.body}/>
            
        )
    }
}

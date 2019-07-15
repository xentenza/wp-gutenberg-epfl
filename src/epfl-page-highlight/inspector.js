
import React from 'react';
import Select from 'react-select';
import { getAllPagesOrPosts } from '../blocks';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    RadioControl,
} = wp.components

export default class InspectorControlsPageHighlight extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pages: null,
        }
    }

    componentDidMount() {
        getAllPagesOrPosts('pages').then( (allPages) => {
            this.setState({ pages: allPages });
        });
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handlePageChange = ( page ) => setAttributes( { page: JSON.stringify( page ) } );

        let content = "";

        let optionsLayoutList = [
            { value: 'right', label: __('Right', 'wp-gutenberg-epfl')},
            { value: 'bottom', label: __('Bottom', 'wp-gutenberg-epfl')},
            { value: 'left', label: __('Left', 'wp-gutenberg-epfl')},
        ];
        
        if (this.state.pages !== null) {
            
            let optionsPagesList = [];

            this.state.pages.forEach(page => {
                optionsPagesList.push({ label: page.title.rendered, value: page.id });
            });

            const divStyle = {
                height: '600px',
            };

            const selectStyle = {
                marginBottom: '20px'
            }
            
            content = (
                <InspectorControls>
                    <div style={divStyle}>
                        <PanelBody title={ __( 'Layout', 'wp-gutenberg-epfl' ) }>
                            <RadioControl
                                label={ __("Select a layout", 'wp-gutenberg-epfl') }
                                selected={ attributes.layout }
                                options={ optionsLayoutList }
                                onChange={ layout => setAttributes( { layout } ) }
                                help={ __('Decides where the text will be aligned, to allow the subject of the picture to be visible', 'wp-gutenberg-epfl')}
                            />
                        </PanelBody>
                        <PanelBody title={ __( 'Page', 'wp-gutenberg-epfl') }>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-highlight-page'
                                        name='epfl-page-highlight-page'
                                        value={ JSON.parse( attributes.page ) }
                                        onChange={ handlePageChange }
                                        options={ optionsPagesList }
                                        placeholder={ __('Select page', 'wp-gutenberg-epfl') }
                                    />
                                </div>
                        </PanelBody> 
                    </div>
                </InspectorControls>
            )
        }
        return content;
    }
}